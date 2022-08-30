import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import history from "../../config/history";
import { Container } from "./styles";

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    history.push("/clientes");
    setLoading(false);
  }, []);

  return (
    <>
      <Container>
        <Box>{loading && <Loading />}</Box>
      </Container>
    </>
  );
}

export default Home;
