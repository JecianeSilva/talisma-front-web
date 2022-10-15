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
  Select,
} from "@material-ui/core";
import { ArrowBackIos } from "@material-ui/icons";
import Api from "../../../config/api";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import CardImage from "../../../components/CardImage";
import Input from "../../../components/Input";

function EditClient() {
  const [loading, setLoading] = useState(false);
  const formEl = useRef(null);

  const params = useParams();
  const { id } = params;

  async function loadData() {
    try {
      const { data } = await Api.get(`/category/${id}`);
      formik.setFieldValue("id", data?.id);
      formik.setFieldValue("description", data?.description);
      formik.setFieldValue("status", data?.status);
      formik.setFieldValue("order", data?.order);
      formik.setFieldValue("images", [1, data?.icon && data.icon ]);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar os dados da categoria"
      );
    } finally {
      setLoading();
    }
  }

  const formik = useFormik({
    initialValues: {
      id: "",
      description: "",
      status: 0,
      order: 1,
      images: [1, null],
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Campo Obrigatório"),
      status: Yup.string().required("Campo Obrigatório"),
      order: Yup.string().required("Campo Obrigatório"),
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
      icon: values.images[1],
    };
    console.log(values);
    try {
       Api.patch(`/category/${id}`, data).then((response) => {
          if (response.status === 200) {
            toast.success("Categoria alterada com sucesso!");
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
              Editar categoria
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
                style={{ fontWeight: "bold", margin: "16px 0px" }}
              >
                Dados da categoria
              </Typography>

              <Box container mb={5} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Código*</Typography>
                    <Input
                      id="id"
                      disabled
                      placeholder="id"
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Descrição*</Typography>
                    <Input
                      required
                      id="description"
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
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Status*</Typography>
                    <Select
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
                      id="order"
                      name="order"
                      value={formik.values.order}
                      autoFocus
                      onChange={formik.handleChange}
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
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom:'64px' }}>
                <CardImage
                  image={formik && formik.values.images}
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

export default EditClient;
