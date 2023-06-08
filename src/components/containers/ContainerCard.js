import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { NavLink } from "react-router-dom";

export default function ContainerCard({ id }) {
  return (
    <Box sx={{ minWidth: 275, marginBottom: "2rem" }}>
      <Card variant="outlined">
        <React.Fragment>
          <CardContent>
            <Typography
              sx={{ fontSize: 20 }}
              color="text.secondary"
              gutterBottom
            >
              Conteneur Berny
            </Typography>
            <Typography variant="h5" component="div">
              Conteneur n°:{id}
            </Typography>
          </CardContent>
          <CardActions>
            <NavLink to={`http://localhost:3000/containers/${id}`}>
              <Button size="small">Plus d'infos</Button>
            </NavLink>
          </CardActions>
        </React.Fragment>
      </Card>
    </Box>
  );
}
