import React from "react";
import Container from "@material-ui/core/Container";
import Box from "@material-ui/core/Box";

import Home from "./pages/home";

export default function App() {
  return (
    <Container maxWidth="lg">
      <Box my={5}>
        <Home />
      </Box>
    </Container>
  );
}
