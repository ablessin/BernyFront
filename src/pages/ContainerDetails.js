import * as React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

//GET ITEM
const GET_CONTAINER_BY_PK = gql`
  query MyQuery {
    Item_by_pk(id: "0P0MjPwO") {
      arrival_date
      arrival_country
      id
      in_transit
      is_defunct
      Cleanings {
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
      Delivery_backs {
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
      Deliveries {
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  console.log(data);

  return (
    <Card sx={{ width: "50%", margin: "0 auto" }}>
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
      </Collapse>
    </Card>
  );
}
