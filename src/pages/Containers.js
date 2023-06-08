import * as React from "react";
import Box from "@mui/material/Box";
import { useQuery, gql } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ContainerCard from "../components/containers/ContainerCard";
import { Alert, CircularProgress, Grid } from "@mui/material";

// Nombre total de conteneur dans la db, ou est le count ??

const LIMIT = 8;

//GET ITEM ET NON PAS CONTAINER ??
const GET_CONTAINERS_LIST = gql`
  query GetContainersList($offset: Int, $limit: Int) {
    Item(offset: $offset, limit: $limit) {
      id
      arrival_country
      arrival_date
      in_transit
      is_defunct
      size
      type
      Cleanings {
        cleaner
        cleaning_date
        Cleaner {
          enterprise
          id
        }
      }
      Deliveries {
        shop
        delivery_date
        transportedIn
        id
      }
      Delivery_backs {
        actor
        date
        is_unsold
      }
    }
    Item_aggregate {
      aggregate {
        count
      }
    }
  }
`;

export default function Containers() {
  const [page, setPage] = React.useState(1);
  const handleChange = (event, value) => {
    setPage(value);
  };
  const { loading, error, data } = useQuery(GET_CONTAINERS_LIST, {
    variables: {
      offset: page - 1,
      limit: LIMIT,
    },
  });

  if (loading) return <CircularProgress />;
  if (error) return <Alert severity="error">Erreur: {error.message}</Alert>;

  const TOTAL = data.Item_aggregate.aggregate.count;
  console.log(data);
  return (
    <Box sx={{ width: "80%", margin: "0 auto", marginTop: "3rem" }}>
      <Grid container spacing={1}>
        {data.Item.map((container) => (
          <Grid item xs={12} sm={6} key={container.id}>
            <ContainerCard {...container} />
          </Grid>
        ))}
      </Grid>
      <Box
        sx={{ display: "flex", justifyContent: "center", marginTop: "2rem" }}
      >
        <Pagination
          count={Math.ceil(TOTAL / LIMIT)}
          page={page}
          onChange={handleChange}
          color="secondary"
          variant="outlined"
          shape="rounded"
        />
      </Box>
    </Box>
  );
}
