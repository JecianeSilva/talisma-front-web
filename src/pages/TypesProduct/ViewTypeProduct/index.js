import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  Tabs,
  Grid,
  TextField,
  MenuItem,
  Tab,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Api from "../../../config/api";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";

function ViewTypeProduct() {
  const [loading, setLoading] = useState(true);
  const [productType, setProductType] = useState();
  const formEl = useRef(null);

  const params = useParams();
  const { id } = params;

  // get list users
  async function loadData() {
    setLoading(true);
    try {
      // const { data } = await Api.get(`/product-type/${id}`);
      const data = {
        id: "00000000",
        description: "Lorem ipsum dolor",
        status: 0,
      };
      setProductType(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar os tipos de produto"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading size={3} color="#70163A" />
      ) : (
        <Container>
          <ContentHeader>
            <IconButton
              onClick={() => history.goBack()}
              style={{
                backgroundColor: "#70163A",
                color: "#D68E70",
                paddingRight: "3px",
                height: "48px",
                width: "48px",
              }}
            >
              <ArrowBackIos />
            </IconButton>
            <Typography
              variant="h3"
              style={{
                color: "#656263",
                marginRight: "40px",
                flex: 1,
                marginLeft: "20px",
                fontSize: "35px",
                lineheight: "43px",
              }}
            >
              Tipo de produto
            </Typography>

            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#C14979",
                  color: "#FFF",
                  marginLeft: "20px",
                  borderRadius: "24px",
                }}
                onClick={() => history.push(`/produto/tipos/editar-tipo/${id}`)}
              >
                Editar
              </Button>
            </div>
          </ContentHeader>
          <ContentBody>
            <form
              ref={formEl}
              noValidate
              autoComplete={"off"}
              style={{ width: "100%" }}
            >
              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Dados do tipo
              </Typography>

              <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>ID*</Typography>
                    <TextField
                      size="small"
                      id="id"
                      name="ID*"
                      disabled
                      placeholder="id"
                      variant="outlined"
                      autoComplete="text"
                      value={productType?.id}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>Descrição*</Typography>
                    <TextField
                      required
                      size="small"
                      id="description"
                      name="description"
                      variant="outlined"
                      autoComplete="text"
                      placeholder="Descrição da categoria"
                      value={productType?.description}
                      fullWidth
                    />
                  </Grid>

                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>Status*</Typography>

                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      id="status"
                      name="status"
                      value={productType?.status}
                      autoFocus
                    >
                      <MenuItem value={0} key={0}>
                        {"Ativo"}
                      </MenuItem>
                      <MenuItem value={1} key={1}>
                        {"Inativo"}
                      </MenuItem>
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
            </form>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default ViewTypeProduct;
