import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, Typography, MenuItem, Grid, Select } from "@material-ui/core";
import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { getDate } from "../../../utils";
import Api from "../../../config/api";
import InputCep from "../../../components/InputCep";
import InputPhone from "../../../components/InputPhone";
import InputPassword from "../../../components/InputPassword";
import InputCpf from "../../../components/InputCpf";
import Input from "../../../components/Input";

import { Form } from "../styles";

function FormEditClient({ id, formEl, callHandleSubmit, setCallHandleSubmit }) {
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      document: "",
      status: "",
      categories: 1,
      userType: "",

      email: "",
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
      name: Yup.string().required("Campo Obrigatório"),
      birthday: Yup.string().required("Campo Obrigatório"),
      document: Yup.string()
        .required("Campo Obrigatório")
        .min(11, "Dado inválido"),
      userType: Yup.string().required("Campo Obrigatório"),
      // categories: Yup.number().required("Campo Obrigatório"),
      status: Yup.number().required("Campo Obrigatório"),

      email: Yup.string("E-mail")
        .email("Digite um endereço de e-mail válido.")
        .required("Campo Obrigatório"),
      phone: Yup.string()
        .required("Campo Obrigatório")
        .min(12, "Dado inválido"),
      whatsapp: Yup.string()
        .required("Campo Obrigatório")
        .min(12, "Dado inválido"),

      address_code: Yup.number().required("Campo Obrigatório"),
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

  useEffect(() => {
    if (callHandleSubmit) {
      formik.handleSubmit();
      setCallHandleSubmit(false);
    }
  }, [callHandleSubmit, formik, setCallHandleSubmit]);

  // get list users
  async function loadDataUser() {
    try {
      const { data } = await Api.get(`/user/${id}`);

      const responseUserType = await Api.get(`/userType`);

      if (responseUserType) {
        setUserTypes(
          responseUserType.data.map((item) => ({
            id: item.id,
            description: item.description,
          }))
        );
      }

      formik.setFieldValue("id", data.id);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("document", data.document.replace(/[^0-9]/g, ""));
      formik.setFieldValue("birthday", getDate(data.birthday));
      formik.setFieldValue("create_at", getDate(data.createdAt));
      formik.setFieldValue("status", data.status);
      formik.setFieldValue("categories", data.categories);
      formik.setFieldValue("userType", data.userType_id?.id);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phone", data.phone);
      formik.setFieldValue("whatsapp", data.whatsapp);
      formik.setFieldValue("address_code", data.addresses[0].zipcode);
      formik.setFieldValue("address_city", data.addresses[0].city);
      formik.setFieldValue("address_state", data.addresses[0].state);
      formik.setFieldValue("address_street", data.addresses[0].street);
      formik.setFieldValue("address_district", data.addresses[0].district);
      formik.setFieldValue("address_reference", data.addresses[0].reference);
      formik.setFieldValue("address_number", data.addresses[0].number);
      formik.setFieldValue("address_complement", data.addresses[0].complement);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar dados do cliente"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDataUser();
  }, [id]);

  function handleSubmit(values) {
    const data = {
      name: values.name,
      username: values.name, //remover
      email: values.email,
      document: values.document,
      birthday: values.birthday,
      userType_id: values.userType,
      phone: values.phone,
      whatsapp: values.whatsapp,
      status: values.status,
      categories: values.categories,

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
      Api.patch(`/user/${id}`, data)
        .then((response) => {
          if (response.status === 200) {
            toast.success("Cliente alterado com sucesso!");
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
        <Loading />
      ) : (
        <Form ref={formEl} noValidate autoComplete={"off"}>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Dados Pessoais
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>ID*</Typography>
                <Input
                  id="id"
                  required
                  disabled
                  value={formik.values.id}
                  onChange={formik.handleChange}
                  error={formik.touched.id && Boolean(formik.errors.id)}
                  helperText={formik.touched.id && formik.errors.id}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Nome*</Typography>
                <Input
                  required
                  id="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de nascimento*</Typography>
                <Input
                  type="date"
                  required
                  id="birthday"
                  onChange={formik.handleChange}
                  value={formik.values.birthday}
                  error={
                    formik.touched.birthday && Boolean(formik.errors.birthday)
                  }
                  helperText={formik.touched.birthday && formik.errors.birthday}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de Cadastro</Typography>
                <Input
                  type="date"
                  required
                  id="create_at"
                  disabled
                  onChange={formik.handleChange}
                  value={formik.values.create_at}
                  error={
                    formik.touched.create_at && Boolean(formik.errors.create_at)
                  }
                  helperText={
                    formik.touched.create_at && formik.errors.create_at
                  }
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>CPF*</Typography>
                <InputCpf
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
                    formik.touched.document && Boolean(formik.errors.document)
                  }
                  errorMessage={
                    formik.touched.document && formik.errors.document
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
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="categories"
                  name="categories"
                  value={formik.values.categories}
                  autoFocus
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1} key={1}>
                    {"Categoria 1"}
                  </MenuItem>
                  <MenuItem value={2} key={2}>
                    {"Categoria 2"}
                  </MenuItem>
                </Select>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Tipo*</Typography>
                {!loading && (
                  <Select
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    id="userType"
                    name="userType"
                    value={formik.values.userType}
                    onChange={formik.handleChange}
                  >
                    {userTypes &&
                      userTypes.map((item) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.description}
                        </MenuItem>
                      ))}
                  </Select>
                )}
              </Grid>
            </Grid>
          </Box>
          <Typography
           variant="h2"
           color="secondary"
           style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Contato
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography>E-mail*</Typography>
                <Input
                  required
                  type="e-mail"
                  id="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Senha*</Typography>
                <InputPassword
                  required
                  disabled
                  id="password"
                  value={formik.values.password}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Telefone*</Typography>
                <InputPhone
                  id="phone"
                  value={formik.values.phone}
                  onChange={(value, country) => {
                    console.log(value, country);
                    formik.setFieldValue("phone", value);
                  }}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Whatsapp*</Typography>
                <InputPhone
                  id="whatsapp"
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
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Endereço
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
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
                  value={formik.values.address_number}
                  id="address_number"
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
                  fullWidth
                  value={formik.values.address_complement}
                  id="address_complement"
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
                  value={formik.values.address_district}
                  id="address_district"
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
                    formik.touched.address_city && formik.errors.address_city
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
                    formik.touched.address_state && formik.errors.address_state
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
      )}
    </>
  );
}

export default FormEditClient;
