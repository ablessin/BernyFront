import * as React from "react";
import Box from "@mui/material/Box";
import { useQuery, gql } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ContainerCard from "../components/containers/ContainerCard";

// Nombre total de conteneur dans la db, ou est le count ??

const LIMIT = 5;

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;

  const TOTAL = data.Item_aggregate.aggregate.count;
  console.log(data);
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ width: "50%", margin: "0 auto" }}>
        {data.Item.map((container) => (
          <ContainerCard {...container} sx={{ marginBottom: "2rem" }} />
        ))}
        <Stack spacing={2}>
          <Pagination
            count={Math.ceil(TOTAL / LIMIT)}
            page={page}
            onChange={handleChange}
            color="secondary"
          />
        </Stack>
      </Box>
    </Box>
  );
}
