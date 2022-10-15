import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  Select,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Api from "../../../config/api";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";

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
      const { data } = await Api.get(`/Type/${id}`);
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
              height: "40px",
              width: "40px",
            }}
          >
            <ArrowBackIos />
          </IconButton>
            <Typography
              variant="h1"
              style={{
                color: "#656263",
                marginLeft: "24px",
                flex:1
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
                style={{ fontWeight: "bold", margin: "16px 0px" }}
              >
                Dados do tipo
              </Typography>

              <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>ID*</Typography>
                    <Input
                      id="id"
                      disabled
                      value={productType?.id}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>Descrição</Typography>
                    <Input
                      id="description"
                      disabled
                      value={productType?.description}
                    />
                  </Grid>

                  <Grid item xs={12} md={4} sm={6}>
                    <Typography>Status*</Typography>

                    <Select
                      variant="outlined"
                      required
                      fullWidth
                      id="status"
                      name="status"
                      value={productType?.status}
                      disabled
                    >
                      <MenuItem value={true} key={true}>
                        {"Ativo"}
                      </MenuItem>
                      <MenuItem value={false} key={false}>
                        {"Inativo"}
                      </MenuItem>
                    </Select>
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
