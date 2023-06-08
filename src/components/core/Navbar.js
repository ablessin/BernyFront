import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Toolbar from "@mui/material/Toolbar";
import * as React from "react";
import { NavLink } from "react-router-dom";
import BernyLogo from "../../assets/logo.png";

const pages = [
  { label: "Dashboard", link: "/" },
  { label: "Conteneurs", link: "/containers" },
];

function Navbar() {
  return (
    <AppBar position="static" sx={{ marginBottom: "2rem" }} color="transparent">
      <Container
        sx={{
          width: "80%",
          margin: "0 auto",
          maxWidth: "100% !important",
          padding: "0 !important",
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          <Box>
            <img src={BernyLogo} alt="Berny Logo" style={{ height: "56px" }} />
          </Box>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              "& > *": {
                marginLeft: "1rem",
                color: "#026068",
                fontWeight: "bold",
                textDecoration: "none !important",
              },
            }}
          >
            {pages.map((page, index) => (
              <NavLink to={page.link} key={page.label}>
                {page.label}
              </NavLink>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
