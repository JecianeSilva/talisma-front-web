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

function NewCategorie() {
  const [loading, setLoading] = useState(false);
  const formEl = useRef(null);

  const formik = useFormik({
    initialValues: {
      description: "",
      status: 0,
      ordem: 1,
      images: [0, null],
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
      order: values.order,
      image: values.image1,
    };
    console.log(data);
    try {
      // Api.post("/categorie", data)
      //   .then((response) => {
      //     if (response.status === 201) {
      toast.success("Categoria cadastrada com sucesso!");
      formEl.current.reset();
      history.goBack();
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(err.response.data.message);
      //   });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error no sistema! Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

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
              Cadastrar categoria
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
                startIcon={<Add />}
                size="large"
                style={{
                  backgroundColor: "#21AB69",
                  color: "#FFF",
                  marginLeft: "20px",
                  borderRadius: "24px",
                }}
                onClick={formik.handleSubmit}
              >
                Cadastrar
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
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
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
                      value={formik.values.ordem}
                      autoFocus
                      onChange={formik.handleChange}
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
                <CardImage
                  image={formik.values.images}
                  formik={formik}
                  handleImage={(e) => {
                    formik.setFieldValue("images", [
                      0,
                      URL.createObjectURL(e.target.files[0]),
                    ]);
                  }}
                />
              </Box>
            </form>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default NewCategorie;
