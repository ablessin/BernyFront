import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";

const pages = [{ label: "Conteneurs", link: "/containers" }];

function Navbar() {
  return (
    <AppBar position="static" sx={{ marginBottom: "2rem" }}>
      <Container
        sx={{
          width: "80%",
          margin: "0 auto",
          maxWidth: "100% !important",
          padding: "0 !important",
        }}
      >
        <Toolbar disableGutters>
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".15rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            Berny
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
            }}
          >
            {pages.map((page) => (
              <NavLink
                to={page.link}
                key={page.label}
                sx={{
                  my: 2,
                  color: "white",
                  display: "block",
                  textDecoration: "none !important",
                }}
              >
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
