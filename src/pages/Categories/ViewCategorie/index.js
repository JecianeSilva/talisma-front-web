import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  MenuItem,
  Grid,
  Select,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";

import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader, Form } from "../styles";
import Api from "../../../config/api";
import CardImage from "../../../components/CardImage";
import { useParams } from "react-router-dom";
import Input from "../../../components/Input";

function ViewCategorie() {
  const formEl = useRef(null);

  const [loading, setLoading] = useState(true);
  const [categorie, setCategorie] = useState();

  const params = useParams();
  const { id } = params;

  // get list users
  async function loadData() {
    try {
      const { data } = await Api.get(`/category/${id}`);
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
                  history.push(`/produto/categorias/editar-categoria/${id}`)
                }
              >
                Editar
              </Button>
            </div>
          </ContentHeader>
          <ContentBody>
            <Form
              ref={formEl}
              noValidate
              autoComplete={"off"}
              style={{ width: "100%", height:'100%' }}
            >
              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", margin: "16px 0px" }}
              >
                Dados da categoria
              </Typography>

              <Box container mb={5} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Código</Typography>
                    <Input
                      id="id"
                      disabled
                      value={categorie?.id}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Descrição</Typography>
                    <Input
                      id="description"
                      disabled
                      value={categorie?.description}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Status</Typography>
                    <Select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      disabled
                      id="status"
                      name="status"
                      value={categorie?.status}
                    >
                      <MenuItem value={true} key={true}>
                        {"Ativo"}
                      </MenuItem>
                      <MenuItem value={false} key={false}>
                        {"Inativo"}
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Ordem</Typography>
                    <Select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      disabled
                      id="order"
                      name="order"
                      value={categorie?.order}
                    >
                      {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((item) => (
                        <MenuItem value={item} key={item}>
                          {item}
                        </MenuItem>
                      ))}
                    </Select>
                  </Grid>
                </Grid>
              </Box>
              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", marginBottom: "20px" }}
              >
                Ícone da categoria
              </Typography>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px", paddingBottom:'64px' }}>
                <CardImage image={[1, categorie?.icon && categorie.icon ]} disabled />
              </Box>
            </Form>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default ViewCategorie;
