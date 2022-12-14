import { Box } from "@material-ui/core";
import React, { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import history from "../../config/history";
import { Container } from "./styles";

function Home() {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    history.push("/produtos");
    setLoading(false);
  }, []);

  return (
    <>
      <Container>{loading && <Loading fullScreen />}</Container>
    </>
  );
}

export default Home;
