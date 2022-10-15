import React, { useState, useEffect, useRef } from "react";
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
  FormHelperText,
} from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";

import Loading from "../../../components/Loading";
import Input from "../../../components/Input";
import InputCPF from "../../../components/InputCpf";
import InputPassword from "../../../components/InputPassword";
import InputPhone from "../../../components/InputPhone";
import InputCep from "../../../components/InputCep";

import Api from "../../../config/api";
import { getDate } from "../../../utils";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader, Form } from "../styles";

function Clients() {
  const formEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [userTypes, setUserTypes] = useState();

  const formik = useFormik({
    initialValues: {
      id: "",
      name: "",
      birthday: "",
      create_at: getDate(new Date()),
      document: "",
      status: 0,
      categories: 1,
      userType: "",

      email: "",
      password: "",
      phone: "",
      whatsapp: "",

      address_code: "",
      address_street: "",
      address_number: "",
      address_complement: "",
      address_district: "",
      address_city: "",
      address_state: "",
      address_reference: "",
    },
    validationSchema: Yup.object({
      id: Yup.string(),
      name: Yup.string().required("Campo Obrigatório"),
      birthday: Yup.string().required("Campo Obrigatório"),
      create_at: Yup.string(),
      document: Yup.string()
        .required("Campo Obrigatório")
        .min(11, "Dado inválido"),
      userType: Yup.string().required("Campo Obrigatório"),
      categories: Yup.number(),
      status: Yup.number(),

      email: Yup.string("E-mail")
        .email("Digite um endereço de e-mail válido.")
        .required("Campo Obrigatório"),
      password: Yup.string(),
      phone: Yup.string()
        .required("Campo Obrigatório")
        .min(12, "Dado inválido"),
      whatsapp: Yup.string()
        .required("Campo Obrigatório")
        .min(12, "Dado inválido"),

      address_code: Yup.string()
        .min(8, "Dado inválido")
        .required("Campo Obrigatório"),
      address_state: Yup.string().required("Campo Obrigatório"),
      address_city: Yup.string().required("Campo Obrigatório"),
      address_district: Yup.string().required("Campo Obrigatório"),
      address_reference: Yup.string(),
      address_street: Yup.string().required("Campo Obrigatório"),
      address_number: Yup.string().required("Campo Obrigatório"),
      address_complement: Yup.string(),
    }),
    onSubmit: async (values) => {
      handleSubmit(values);
    },
  });

  function handleSubmit(values) {
    setLoading(true);
    const data = {
      //user
      name: values.name,
      username: values.name,
      document: values.document,
      birthday: values.birthday,
      categories: values.categories,
      userType_id: values.userType,
      status: values.status,

      //password
      password: values.document, // update in backend

      //contact
      email: values.email,
      phone: values.phone,
      whatsapp: values.whatsapp,

      //address
      address_code: values.address_code,
      address_city: values.address_city,
      address_state: values.address_state,
      address_street: values.address_street,
      address_district: values.address_district,
      address_reference: values.address_reference,
      address_number: values.address_number,
      address_complement: values.address_complement,
    };
    try {
      Api.post("/user", data)
        .then((response) => {
          if (response.status === 201) {
            toast.success("Cliente cadastrado com sucesso!");
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

  async function loadData() {
    setLoading(true);
    try {
      const responseUserType = await Api.get(`/userType`);
      if (responseUserType) {
        setUserTypes(
          responseUserType.data.map((item) => ({
            id: item.id,
            description: item.description,
          }))
        );
      }
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar os tipos de clientes "
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

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
              Cadastrar cliente
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
            <Form ref={formEl} noValidate autoComplete={"off"}>
              <Typography
               variant="h2"
               color="secondary"
               style={{ fontWeight: "bold", margin: "16px 0px" }}
              >
                Dados Pessoais
              </Typography>

              <Box mb={3} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>ID*</Typography>
                    <Input
                      id="id"
                      label="ID"
                      disabled
                      value={formik.values.id}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Nome*</Typography>
                    <Input
                      required
                      id="name"
                      label="Nome"
                      value={formik.values.name}
                      onChange={formik.handleChange}
                      error={formik.touched.name && Boolean(formik.errors.name)}
                      helperText={formik.touched.name && formik.errors.name}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Data de nascimento*</Typography>
                    <Input
                      required
                      id="birthday"
                      type="date"
                      value={formik.values.birthday}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.birthday &&
                        Boolean(formik.errors.birthday)
                      }
                      helperText={
                        formik.touched.birthday && formik.errors.birthday
                      }
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Data de Cadastro</Typography>
                    <Input
                      required
                      id="create_at"
                      type="date"
                      disabled
                      value={formik.values.create_at}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Box>
                      <Typography>CPF*</Typography>
                      <InputCPF
                        required
                        id="document"
                        value={formik.values.document}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "document",
                            e.target.value.replace(/[^0-9]/g, "")
                          );
                        }}
                        error={
                          formik.touched.document &&
                          Boolean(formik.errors.document)
                        }
                        errorMessage={formik.errors.document}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Status*</Typography>
                    <Select
                      // select
                      // size="small"
                      variant="outlined"
                      required
                      fullWidth
                      id="status"
                      name="status"
                      value={formik.values.status}
                      autoFocus
                      onChange={formik.handleChange}
                      error={
                        formik.touched.status && Boolean(formik.errors.status)
                      }
                      helperText={formik.touched.status && formik.errors.status}
                    >
                      <MenuItem value={0} key={0}>
                        {"Ativo"}
                      </MenuItem>
                      <MenuItem value={1} key={1}>
                        {"Inativo"}
                      </MenuItem>
                    </Select>
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Categoria*</Typography>
                    <Select
                      variant="outlined"
                      required
                      fullWidth
                      id="categories"
                      name="categories"
                      value={formik.values.categories}
                      autoFocus
                      onChange={formik.handleChange}
                      error={
                        formik.touched.categories &&
                        Boolean(formik.errors.categories)
                      }
                    >
                      <MenuItem value={1} key={1}>
                        {"Categoria 1"}
                      </MenuItem>
                      <MenuItem value={2} key={2}>
                        {"Categoria 2"}
                      </MenuItem>
                    </Select>
                    {formik.touched.categories &&
                        Boolean(formik.errors.categories) && 
                          <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.categories && formik.errors.categories}</FormHelperText>
                    }
                  </Grid>
                  <Grid item xs={12} md={3} sm={6}>
                    <Typography>Tipo*</Typography>
                    <Select
                      // select
                      size="small"
                      variant="outlined"
                      required
                      fullWidth
                      id="userType"
                      name="userType"
                      value={formik.values.userType}
                      autoFocus
                      onChange={formik.handleChange}
                      error={
                        formik.touched.userType &&
                        Boolean(formik.errors.userType)
                      }
                    >
                      {userTypes &&
                        userTypes.map((item) => (
                          <MenuItem value={item.id} key={item.id}>
                            {item.description}
                          </MenuItem>
                        ))}
                    </Select>
                    {formik.touched.userType &&
                        Boolean(formik.errors.userType) && 
                          <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.userType && formik.errors.userType}</FormHelperText>
                    }
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                Contato
              </Typography>

              <Box mb={3} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Typography>E-mail*</Typography>
                    <Input
                      required
                      type="e-mail"
                      id="email"
                      label="exemplo@exemplo.com"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.email && Boolean(formik.errors.email)
                      }
                      helperText={formik.touched.email && formik.errors.email}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Senha*</Typography>
                    <InputPassword
                      id="password"
                      disabled
                      value={formik.values.password}
                      onChange={formik.handleChange}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Telefone*</Typography>
                    <InputPhone
                      id="phone"
                      error={formik.touched.phone && formik.errors.phone}
                      errorMessage={formik.errors.phone}
                      value={formik.values.phone}
                      onChange={(phoneNumber) => {
                        formik.setFieldValue("phone", phoneNumber);
                      }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Whatsapp*</Typography>
                    <InputPhone
                      id="whatsapp"
                      error={formik.touched.whatsapp && formik.errors.whatsapp}
                      errorMessage={formik.errors.whatsapp}
                      value={formik.values.whatsapp}
                      onChange={(phoneNumber) => {
                        formik.setFieldValue("whatsapp", phoneNumber);
                      }}
                    />
                  </Grid>
                </Grid>
              </Box>

              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", marginBottom: "16px" }}
              >
                Endereço
              </Typography>

              <Box mb={5} sx={{ display: "flex", flexWrap: "wrap" }}>
                <Grid container spacing={2}>
                  <Grid item xs={3}>
                    <Box>
                      <Typography>CEP*</Typography>
                      <InputCep
                        required
                        id="address_code"
                        formik={formik}
                        value={formik.values.address_code}
                        onChange={(e) => {
                          formik.setFieldValue(
                            "address_code",
                            e.target.value.replace(/[^0-9,.]+/g, "")
                          );
                        }}
                      />
                    </Box>
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Logradouro*</Typography>
                    <Input
                      required
                      id="address_street"
                      value={formik.values.address_street}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_street &&
                        Boolean(formik.errors.address_street)
                      }
                      helperText={
                        formik.touched.address_street &&
                        formik.errors.address_street
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Número*</Typography>
                    <Input
                      required
                      id="address_number"
                      value={formik.values.address_number}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_number &&
                        Boolean(formik.errors.address_number)
                      }
                      helperText={
                        formik.touched.address_number &&
                        formik.errors.address_number
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Complemento</Typography>
                    <Input
                      id="address_complement"
                      value={formik.values.address_complement}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_complement &&
                        Boolean(formik.errors.address_complement)
                      }
                      helperText={
                        formik.touched.address_complement &&
                        formik.errors.address_complement
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Bairro*</Typography>
                    <Input
                      required
                      id="address_district"
                      value={formik.values.address_district}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_district &&
                        Boolean(formik.errors.address_district)
                      }
                      helperText={
                        formik.touched.address_district &&
                        formik.errors.address_district
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Cidade*</Typography>
                    <Input
                      required
                      id="address_city"
                      value={formik.values.address_city}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_city &&
                        Boolean(formik.errors.address_city)
                      }
                      helperText={
                        formik.touched.address_city &&
                        formik.errors.address_city
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Estado*</Typography>
                    <Input
                      required
                      id="address_state"
                      value={formik.values.address_state}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_state &&
                        Boolean(formik.errors.address_state)
                      }
                      helperText={
                        formik.touched.address_state &&
                        formik.errors.address_state
                      }
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Typography>Referência</Typography>
                    <Input
                      id="address_reference"
                      value={formik.values.address_reference}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.address_reference &&
                        Boolean(formik.errors.address_reference)
                      }
                      helperText={
                        formik.touched.address_reference &&
                        formik.errors.address_reference
                      }
                    />
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

export default Clients;
