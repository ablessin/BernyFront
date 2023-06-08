import { gql, useQuery } from "@apollo/client";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Alert, CircularProgress, Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardHeader from "@mui/material/CardHeader";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import * as React from "react";
import { useParams } from "react-router-dom";
import ActivityChart from "../components/charts/ActivityChart";
import { Box } from "@mui/system";

function countDates(timestamps) {
  const dateMap = new Map();

  // Conversion des timestamps en objets Date
  const dates = timestamps.map((timestamp) => new Date(timestamp));

  // Comptage du nombre de fois que chaque date apparaît
  for (const date of dates) {
    const dateString = date.toISOString().split("T")[0]; // Récupération de la date sans l'heure
    const count = dateMap.get(dateString) || 0; // Récupération du compteur actuel pour la date

    dateMap.set(dateString, count + 1); // Mise à jour du compteur
  }

  // Création du nouveau tableau à partir de l'objet Map
  const result = Array.from(dateMap, ([date, count]) => ({ date, count }));

  return result;
}

//GET ITEM
const GET_CONTAINER_BY_PK = gql`
  query MyQuery($id: String!) {
    Item_by_pk(id: $id) {
      arrival_date
      arrival_country
      id
      in_transit
      is_defunct
      Cleanings(order_by: { cleaning_date: asc }) {
        cleaner
        cleaning_date
        id
        Cleaner {
          enterprise
        }
      }
      Delivery_backs_aggregate {
        aggregate {
          count
        }
      }
      Delivery_backs(order_by: { date: asc }) {
        id
        actor
        shop
        shop_end
        lot
        is_unsold
        Shop {
          brand
          departement
          deploymentDate
          id
          isShop
          taux
          tarifDeploiement
          tauxWithoutUnsold
        }
      }
      Deliveries(order_by: { delivery_date: asc }) {
        delivery_date
        id
        shop
        Shop {
          brand
          departement
          deploymentDate
          isShop
          prixGrand
          prixPetit
          name
          taux
          tauxWithoutUnsold
          tarifDeploiement
        }
      }
      Deliveries_aggregate {
        aggregate {
          count
        }
      }
      Format {
        width
        weight
        name
        capacity
        depth
        length
      }
      size
      type
      receipts {
        id
        receiptDate
        receiver
        shop
        transportedIn
        Shop {
          brand
          departement
          deploymentDate
          isShop
          name
          prixGrand
          prixPetit
          taux
          tarifDeploiement
          tauxWithoutUnsold
        }
      }
    }
  }
`;

const ExpandMore = styled((props) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

export default function ContainerDetails() {
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_CONTAINER_BY_PK, {
    variables: {
      id,
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Erreur: {error.message}</Alert>;
  console.log(data);

  // Data for chart

  const deliveriesLabelsChart = data.Item_by_pk?.Deliveries.map(
    (delivery) => delivery?.delivery_date
  );

  const chartDataDeliveries = countDates(deliveriesLabelsChart);

  const cleaningsLabelsChart = data.Item_by_pk?.Cleanings.map(
    (cleaning) => cleaning?.cleaning_date
  );

  const chartDataCleanings = countDates(cleaningsLabelsChart);

  const DeliveriesBackLabelsChart = data.Item_by_pk?.Delivery_backs.map(
    (DeliveriesBack) => DeliveriesBack?.date
  );

  const chartDataDeliveriesBack = countDates(DeliveriesBackLabelsChart);

  return (
    <Card sx={{ width: "80%", margin: "0 auto", padding: "1rem" }}>
      <CardHeader title="Bac Berny" subheader={`Bac n°${id}`} />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          l’économie en plastique est folle (1 cycle d’un contenant (cad : 1
          lavage, 1 livraison, 1 retour) = 200 g de plastique à usage unique
          économisé)
        </Typography>
      </CardContent>
      <CardActions disableSpacing>
        <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>Détails du conteneur :</Typography>
        </CardContent>
        <Box sx={{ width: 600 }}>
          <ActivityChart
            chartDataDeliveries={chartDataDeliveries}
            chartDataCleanings={chartDataCleanings}
            chartDataDeliveriesBack={chartDataDeliveriesBack}
          />
        </Box>
      </Collapse>
    </Card>
  );
}
