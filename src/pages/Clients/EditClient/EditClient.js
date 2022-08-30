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
import { ArrowBackIos, Search, SearchOutlined } from "@material-ui/icons";
import InputMask from "react-input-mask";

import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import axios from "axios";
import { getDate } from "../../../utils";
import Api from "../../../config/api";

function FormEditClient({ id, formEl }) {
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState();
  const [value, setValue] = useState("");
  const [value2, setValue2] = useState("");
  const formik = useFormik({
    initialValues: {
      name: "",
      birthday: "",
      document: "",
      status: "",
      categories: "",
      userType_id: "",

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
      categories: Yup.string().required("Campo Obrigatório"),
      status: Yup.string().required("Campo Obrigatório"),

      email: Yup.string("E-mail")
        .email("Digite um endereço de e-mail válido.")
        .required("Campo Obrigatório"),
      phone: Yup.string().required("Campo Obrigatório"),
      whatsapp: Yup.string().required("Campo Obrigatório"),

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
      console.log(values);
      handleSubmit(values);
    },
  });

  async function consultaCep(cep) {
    if (cep) {
      try {
        await axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => {
            if (response && response.status === 200 && response.data.erro) {
              toast.error(
                "CEP não encontrado, preencha os campos manualmente."
              );
              return;
            }

            if (response && response.status === 200) {
              formik.setFieldValue("address_state", response.data.uf);
              formik.setFieldValue("address_city", response.data.localidade);
              formik.setFieldValue("address_district", response.data.bairro);
              formik.setFieldValue("address_street", response.data.logradouro);
              formik.setFieldValue(
                "address_complement",
                response.data.complemento
              );
            }
          });
      } catch (error) {
        toast.error("CEP informado não localizado, digite novamente.");
      }
    } else {
      toast.error("CEP não informado.");
    }
  }

  // get list users
  async function loadDataUser() {
    try {
      const { data } = await Api.get(`/user/${id}`);
      const responseUserType = await Api.get(`/userType`);
      if (responseUserType) {
        setUserTypes(responseUserType.data);
      }
      formik.setFieldValue("id", data.id);
      formik.setFieldValue("name", data.name);
      formik.setFieldValue("document", data.document);
      formik.setFieldValue("birthday", getDate(data.birthday));
      formik.setFieldValue("create_at", getDate(data.createdAt));
      formik.setFieldValue("status", data.status);
      // formik.setFieldValue("categories", data.categories);
      formik.setFieldValue("type", data.userType_id);
      formik.setFieldValue("email", data.email);
      formik.setFieldValue("phone", data.phone);
      setValue(data.phone);
      formik.setFieldValue("whatsapp", data.whatsapp);
      setValue2(data.phone);

      formik.setFieldValue("address_code", data.address[0].zipcode);
      formik.setFieldValue("address_city", data.address[0].city);
      formik.setFieldValue("address_state", data.address[0].state);
      formik.setFieldValue("address_street", data.address[0].street);
      formik.setFieldValue("address_district", data.address[0].district);
      formik.setFieldValue("address_reference", data.address[0].reference);
      formik.setFieldValue("address_number", data.address[0].number);
      formik.setFieldValue("address_complement", data.address[0].complement);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os usuários"
      );
    } finally {
      setLoading();
    }
  }

  useEffect(() => {
    loadDataUser();
  }, [id]);

  function handleSubmit(values) {
    const password =
      values?.name.substring(0, 4) +
      values?.document.replace(/[^0-9]+/g, "").substring(7, 11);

    const data = {
      name: values.name,
      username: values.name, //remover
      password: password,
      email: values.email,
      document: values.document,
      birthday: values.birthday,
      userType: values.type,
      phone: values.phone,
      whatsapp: values.whatsapp,
      status: values.status,
      // categories: values.categories,

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
    }
  }
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form ref={formEl} noValidate autoComplete={"off"}>
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
                <Typography>Nome*</Typography>
                <TextField
                  required
                  size="small"
                  id="name"
                  name="name"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de nascimento*</Typography>
                <TextField
                  type="date"
                  size="small"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  id="birthday"
                  name="birthday"
                  autoFocus
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
                <TextField
                  type="date"
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="create_at"
                  name="create_at"
                  autoFocus
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
                <div>
                  <Typography>CPF*</Typography>
                  <div>
                    <InputMask
                      required
                      className={"MuiInputBase-input"}
                      style={{
                        width: "93%",
                        padding: "8.5px 10px",
                        border: "1px solid rgb(0,0,0,0.25)",
                        borderRadius: "4px",
                        minHeight: "20px",
                        borderColor:
                          formik.touched.document &&
                          Boolean(formik.errors.document) &&
                          "#F32424",
                      }}
                      id="document"
                      name="document"
                      mask={"999.999.999-99"}
                      value={formik.values.document}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "document",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                  </div>
                  {formik.touched.document && formik.errors.document ? (
                    <div className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
                      {formik.errors.document}
                    </div>
                  ) : null}
                </div>
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
                <Typography>Categoria*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="categories"
                  name="categories"
                  disabled
                  value={formik.values.categories}
                  autoFocus
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1} key={"categoria 1"}>
                    {"Categoria 1"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Tipo*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="type"
                  name="type"
                  value={formik.values.type}
                  autoFocus
                  onChange={formik.handleChange}
                >
                  {userTypes &&
                    userTypes.map((item) => (
                      <MenuItem value={2} key={item.id}>
                        {item.description}
                      </MenuItem>
                    ))}
                </TextField>
              </Grid>
            </Grid>
          </Box>

          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", margin: "20px 0px" }}
          >
            Contato
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <Typography>E-mail*</Typography>
                <TextField
                  required
                  type="e-mail"
                  size="small"
                  id="email"
                  name="email"
                  variant="outlined"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Senha*</Typography>
                <TextField
                  type="password"
                  size="small"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="********"
                  autoFocus
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={3}>
                <div>
                  <Typography>Telefone*</Typography>
                  <div>
                    <InputMask
                      required
                      className={"MuiInputBase-input"}
                      style={{
                        width: "93%",
                        padding: "8.5px 10px",
                        border: "1px solid rgb(0,0,0,0.25)",
                        borderRadius: "4px",
                        minHeight: "20px",
                        borderColor:
                          formik.touched.phone &&
                          Boolean(formik.errors.phone) &&
                          "#F32424",
                      }}
                      id="phone"
                      name="phone"
                      mask={
                        value.length < 15 && parseInt(value[2]) !== 9
                          ? "(99) 9999-9999"
                          : "(99) 99999-9999"
                      }
                      value={value}
                      onChange={(e) => {
                        setValue(e.target.value.replace(/[^0-9,.]+/g, ""));
                        formik.setFieldValue("phone", e.target.value);
                      }}
                    />
                  </div>
                  {formik.touched.phone && formik.errors.phone ? (
                    <div className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
                      {formik.errors.phone}
                    </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={3}>
                <div>
                  <Typography>Whatsapp*</Typography>
                  <div>
                    <InputMask
                      required
                      className={"MuiInputBase-input"}
                      style={{
                        width: "93%",
                        padding: "8.5px 10px",
                        border: "1px solid rgb(0,0,0,0.25)",
                        borderRadius: "4px",
                        minHeight: "20px",
                        borderColor:
                          formik.touched.whatsapp &&
                          Boolean(formik.errors.whatsapp) &&
                          "#F32424",
                      }}
                      id="whatsapp"
                      name="whatsapp"
                      mask={
                        value2.length < 15 && parseInt(value2[2]) !== 9
                          ? "(99) 9999-9999"
                          : "(99) 99999-9999"
                      }
                      value={value2}
                      onChange={(e) => {
                        setValue2(e.target.value.replace(/[^0-9,.]+/g, ""));
                        formik.setFieldValue(
                          "whatsapp",
                          e.target.value.replace(/[^0-9,.]+/g, "")
                        );
                      }}
                    />
                  </div>
                  {formik.touched.whatsapp && formik.errors.whatsapp ? (
                    <div className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
                      {formik.errors.whatsapp}
                    </div>
                  ) : null}
                </div>
              </Grid>
            </Grid>
          </Box>

          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", margin: "20px 0px" }}
          >
            Endereço
          </Typography>

          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <div>
                  <Typography>CEP*</Typography>
                  <div
                    style={{
                      border: "1px solid rgb(0,0,0,0.25)",
                      borderRadius: "4px",
                      borderColor:
                        formik.touched.address_code &&
                        Boolean(formik.errors.address_code) &&
                        "#F32424",
                      display: "flex",
                    }}
                  >
                    <InputMask
                      required
                      className={"MuiInputBase-input"}
                      style={{
                        padding: "8.5px 10px",
                        minHeight: "20px",
                      }}
                      id="address_code"
                      name="address_code"
                      mask={"99999-999"}
                      value={formik.values.address_code}
                      onChange={(e) => {
                        formik.setFieldValue(
                          "address_code",
                          e.target.value.replace(/[^0-9,.]+/g, "")
                        );
                      }}
                    />
                    <IconButton
                      style={{
                        height: "36px",
                      }}
                      onClick={() =>
                        consultaCep(parseInt(formik.values.address_code))
                      }
                    >
                      <SearchOutlined color="grey.300" />
                    </IconButton>
                  </div>
                  {formik.touched.address_code && formik.errors.address_code ? (
                    <div className="MuiFormHelperText-root MuiFormHelperText-contained Mui-error MuiFormHelperText-marginDense">
                      {formik.errors.address_code}
                    </div>
                  ) : null}
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography>Logradouro*</Typography>

                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="address_street"
                  name="address_street"
                  autoFocus
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
                <TextField
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  value={formik.values.address_number}
                  id="address_number"
                  name="address_number"
                  autoFocus
                  onWheelCapture={(e) => {
                    e.target.blur();
                  }}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address_number &&
                    Boolean(formik.errors.address_number)
                  }
                  helperText={
                    formik.touched.address_number &&
                    formik.errors.address_number
                  }
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <Typography>Complemento</Typography>
                <TextField
                  size="small"
                  fullWidth
                  variant="outlined"
                  value={formik.values.address_complement}
                  id="address_complement"
                  name="address_complement"
                  onWheelCapture={(e) => {
                    e.target.blur();
                  }}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.address_complement &&
                    Boolean(formik.errors.address_complement)
                  }
                  helperText={
                    formik.touched.address_complement &&
                    formik.errors.address_complement
                  }
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Bairro*</Typography>
                <TextField
                  required
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={formik.values.address_district}
                  id="address_district"
                  name="address_district"
                  autoComplete="text"
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

                <TextField
                  required
                  id="address_city"
                  name="address_city"
                  fullWidth
                  value={formik.values.address_city}
                  variant="outlined"
                  size="small"
                  autoComplete="text"
                  autoFocus
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

                <TextField
                  required
                  id="address_state"
                  name="address_state"
                  fullWidth
                  value={formik.values.address_state}
                  variant="outlined"
                  size="small"
                  autoComplete="text"
                  autoFocus
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
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  id="address_reference"
                  name="address_reference"
                  value={formik.values.address_reference}
                  autoFocus
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

          <Button
            variant="contained"
            size="large"
            style={{
              position: "fixed",
              top: "2.7rem",
              right: "2.5rem",
              backgroundColor: "#21AB69",
              color: "#FFF",
              marginLeft: "20px",
              borderRadius: "24px",
            }}
            type="submit"
            onClick={formik.handleSubmit}
          >
            Salvar
          </Button>
        </form>
      )}
    </>
  );
}

export default FormEditClient;
