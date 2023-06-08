import * as React from "react";
import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery, gql } from "@apollo/client";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import logo from "../assets/logo.png";

const GET_CONTAINER_BY_PK = gql`
  query GetContainerByPK($id: String!) {
    Container_by_pk(id: $id) {
      id
      status
      choosen_size
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
          <Typography paragraph>
            Status du conteneur :
            {data.Container_by_pk.status
              ? data.Container_by_pk.status
              : "Le status n'est pas mentionnée"}
          </Typography>
          <Typography paragraph>
            Taille du conteneur :
            {data.Container_by_pk.choosen_size
              ? data.Container_by_pk.choosen_size
              : "La taille n'est pas mentionnée"}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
}
