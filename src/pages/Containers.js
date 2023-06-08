import * as React from "react";
import Box from "@mui/material/Box";
import { useQuery, gql } from "@apollo/client";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import ContainerCard from "../components/containers/ContainerCard";

// Nombre total de conteneur dans la db, ou est le count ??
const TOTAL = 184;

const LIMIT = 5;

const GET_CONTAINERS_LIST = gql`
  query GetContainersList($offset: Int, $limit: Int) {
    Container(offset: $offset, limit: $limit) {
      id
      choosen_size
      status
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
  console.log(data);
  return (
    <Box sx={{ width: "80%", margin: "0 auto" }}>
      <Box sx={{ width: "50%", margin: "0 auto" }}>
        {data.Container.map((container) => (
          <ContainerCard {...container} />
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
