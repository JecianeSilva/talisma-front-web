import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Grid,
} from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";

import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import Api from "../../../config/api";
import CardImage from "../../../components/CardImage";
import { useParams } from "react-router-dom";

function ViewCategorie() {
  const formEl = useRef(null);

  const [loading, setLoading] = useState(true);
  const [categorie, setCategorie] = useState();

  const params = useParams();
  const { id } = params;

  // get list users
  async function loadData() {
    try {
      // const { data } = await Api.get(`/categorie/${id}`);
      const data = {
        id: "000000",
        description: "descrição da categoria",
        status: "0",
        ordem: "1",
        images: [
          1,
          // "blob:http://localhost:3000/47d59e3c-1ac8-43d8-9815-0885de770fca",
          null,
        ],
      };

      setCategorie(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar categorias"
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
              Categoria
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
                onClick={() =>
                  history.push(`/produto/categoria/editar-categoria/${id}`)
                }
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
                Dados da categoria
              </Typography>

              <Box container mb={5} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Código*</Typography>
                    <TextField
                      size="small"
                      id="id"
                      name="ID*"
                      disabled
                      placeholder="id"
                      variant="outlined"
                      autoComplete="text"
                      value={categorie?.id}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Descrição*</Typography>
                    <TextField
                      required
                      size="small"
                      id="description"
                      name="description"
                      variant="outlined"
                      autoComplete="text"
                      placeholder="Descrição da categoria"
                      value={categorie?.description}
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Status*</Typography>
                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      id="status"
                      name="status"
                      value={categorie && categorie.status}
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
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Ordem</Typography>
                    <TextField
                      select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      id="ordem"
                      name="ordem"
                      value={categorie && categorie.ordem}
                      autoFocus
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </TextField>
                  </Grid>
                </Grid>
              </Box>
              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold" }}
              >
                Ícone da categoria
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
                <CardImage image={categorie && categorie.images} disabled />
              </Box>
            </form>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default ViewCategorie;
