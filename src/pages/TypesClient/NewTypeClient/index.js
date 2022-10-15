import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  Button,
  IconButton,
  MenuItem,
  Grid,
  Select,
} from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";

import Api from "../../../config/api";
import history from "../../../config/history";

import Loading from "../../../components/Loading";
import Input from "../../../components/Input";

import { Container, ContentBody, ContentHeader, Form } from "../styles";

function TypeClients() {
  const [loading, setLoading] = useState(false);
  const formEl = useRef(null);

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
      Api.post("/userType", data)
        .then((response) => {
          if (response.status === 201) {
            toast.success("Tipo de cliente cadastrado com sucesso!");
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
              Cadastrar tipo de cliente
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
                startIcon={<Add />}
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
            <Form ref={formEl} noValidate autoComplete={"off"} style={{width:'100%'}}>
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
                    <Input
                      id="id"
                      placeholder="Id"
                      disabled
                      value={formik.values.id}
                      onChange={formik.handleChange}
                      error={formik.touched.id && Boolean(formik.errors.id)}
                      helperText={formik.touched.id && formik.errors.id}
                    />
                  </Grid>
                  <Grid item xs={12} md={4} sm={6}>
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
                  <Grid item xs={12} md={4} sm={6}>
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
                      <MenuItem value={0} key={0}>
                        {"Ativo"}
                      </MenuItem>
                      <MenuItem value={1} key={1}>
                        {"Inativo"}
                      </MenuItem>
                    </Select>
                  </Grid>
                </Grid>
              </Box>
            </Form>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default TypeClients;
