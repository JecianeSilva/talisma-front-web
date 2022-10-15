import React, { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Typography,
  Button,
  Box,
  Grid,
  TextField,
  MenuItem,
  IconButton,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Api from "../../../config/api";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";

function EditClient() {
  const [loading, setLoading] = useState(false);
  const formEl = useRef(null);

  const params = useParams();
  const { id } = params;

  // get list users
  async function loadDataTypeUser() {
    try {
      const { data } = await Api.get(`/userType/${id}`);
      formik.setFieldValue("id", data.id);
      formik.setFieldValue("description", data.description);
      formik.setFieldValue("status", data.status);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os dados"
      );
    } finally {
      setLoading();
    }
  }

  const formik = useFormik({
    initialValues: {
      description: "",
      status: 0,
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Campo Obrigatório"),
      status: Yup.string().required("Campo Obrigatório"),
    }),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  function handleSubmit(values) {
    const data = {
      description: values.description,
      status: values.status,
    };
    try {
      Api.patch(`/userType/${id}`, data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Tipo de cliente alterado com sucesso!");
            formEl.current.reset();
            history.goBack();
          }
        })
        .catch((err) => {
          toast.error(err.response.data.message);
        });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error no sistema! Tente novamente mais tarde.");
      }
    }
  }

  useEffect(() => {
    loadDataTypeUser();
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
              Editar tipo de cliente
            </Typography>

            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#F35457",
                  color: "#FFF",
                  borderRadius: "24px",
                }}
                onClick={() => history.goBack()}
              >
                Descartar
              </Button>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#21AB69",
                  color: "#FFF",
                  marginLeft: "20px",
                  borderRadius: "24px",
                }}
                onClick={formik.handleSubmit}
              >
                Salvar
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
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
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
                      value={formik.values.description}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.description &&
                        Boolean(formik.errors.description)
                      }
                      helperText={
                        formik.touched.description && formik.errors.description
                      }
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
                      value={formik.values.status}
                      autoFocus
                      onChange={formik.handleChange}
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

export default EditClient;
