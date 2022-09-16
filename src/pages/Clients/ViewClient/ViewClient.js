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
  Select,
  FormControl,
} from "@material-ui/core";
import { ArrowBackIos, Search, SearchOutlined } from "@material-ui/icons";
import InputMask from "react-input-mask";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import axios from "axios";
import { getDate } from "../../../utils";
import Api from "../../../config/api";

function FormViewClient({ id }) {
  const [loading, setLoading] = useState(true);
  const [userTypes, setUserTypes] = useState();
  const [client, setClient] = useState();

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
      setClient(data);
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

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form noValidate autoComplete={"off"}>
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
                  value={client.id}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Nome*</Typography>
                <TextField
                  disabled
                  size="small"
                  id="name"
                  name="name"
                  variant="outlined"
                  autoComplete="text"
                  value={client.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de nascimento*</Typography>
                <TextField
                  type="date"
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="birthday"
                  name="birthday"
                  autoFocus
                  value={client.birthday}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de Cadastro</Typography>
                <TextField
                  type="date"
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="create_at"
                  name="create_at"
                  autoFocus
                  value={client.createdAt.substring(0, 10)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>CPF*</Typography>
                <InputMask
                  disabled
                  className={"MuiInputBase-input"}
                  style={{
                    width: "93%",
                    padding: "8.5px 10px",
                    border: "1px solid rgb(0,0,0,0.25)",
                    borderRadius: "4px",
                    minHeight: "20px",
                  }}
                  id="document"
                  name="document"
                  mask={"999.999.999-99"}
                  value={client.document}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Status*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="status"
                  name="status"
                  value={client.status}
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
                <Typography>Categoria*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="categories"
                  name="categories"
                  value={client.categories}
                  autoFocus
                >
                  <MenuItem value={1} key={1}>
                    {"Categoria 1"}
                  </MenuItem>
                  <MenuItem value={2} key={2}>
                    {"Categoria 2"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Tipo*</Typography>
                {!loading && (
                  <TextField
                    select
                    size="small"
                    variant="outlined"
                    disabled
                    fullWidth
                    id="userType"
                    name="userType"
                    value={client.userType_id?.id}
                  >
                    {userTypes &&
                      userTypes.map((item) => (
                        <MenuItem value={item.id} key={item.id}>
                          {item.description}
                        </MenuItem>
                      ))}
                  </TextField>
                )}
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
                  disabled
                  type="e-mail"
                  size="small"
                  id="email"
                  name="email"
                  variant="outlined"
                  value={client.email}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Senha*</Typography>
                <TextField
                  type="password"
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="password"
                  name="password"
                  placeholder="********"
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Telefone*</Typography>
                <ReactPhoneInput
                  id="phone"
                  name="phone"
                  localization={"pt"}
                  country={"br"}
                  disabled
                  value={client.phone}
                  style={{
                    width: "100%",
                    border: "1px solid rgb(0,0,0,0.25)",
                    borderRadius: "4px",
                  }}
                  component={TextField}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Whatsapp*</Typography>
                <ReactPhoneInput
                  id="whatsapp"
                  name="whatsapp"
                  disabled
                  localization={"pt"}
                  country={"br"}
                  style={{
                    width: "100%",
                    border: "1px solid rgb(0,0,0,0.25)",
                    borderRadius: "4px",
                  }}
                  value={client.whatsapp}
                  component={TextField}
                />
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
                <Typography>CEP*</Typography>
                <div
                  style={{
                    border: "1px solid rgb(0,0,0,0.25)",
                    borderRadius: "4px",
                    display: "flex",
                  }}
                >
                  <InputMask
                    disabled
                    className={"MuiInputBase-input"}
                    style={{
                      padding: "8.5px 10px",
                      minHeight: "20px",
                    }}
                    id="address_code"
                    name="address_code"
                    mask={"99999-999"}
                    value={client.address[0].zipcode}
                  />
                  <IconButton
                    disabled
                    style={{
                      height: "36px",
                    }}
                  >
                    <SearchOutlined color="grey.300" />
                  </IconButton>
                </div>
              </Grid>
              <Grid item xs={3}>
                <Typography>Logradouro*</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="address_street"
                  name="address_street"
                  autoFocus
                  value={client.address[0].street}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Número*</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  value={client.address[0].number}
                  id="address_number"
                  name="address_number"
                  autoFocus
                ></TextField>
              </Grid>
              <Grid item xs={3}>
                <Typography>Complemento</Typography>
                <TextField
                  size="small"
                  fullWidth
                  disabled
                  variant="outlined"
                  value={client.address[0].complement}
                  id="address_complement"
                  name="address_complement"
                  onWheelCapture={(e) => {
                    e.target.blur();
                  }}
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Bairro*</Typography>
                <TextField
                  disabled
                  variant="outlined"
                  size="small"
                  fullWidth
                  value={client.address[0].district}
                  id="address_district"
                  name="address_district"
                  autoComplete="text"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Cidade*</Typography>

                <TextField
                  disabled
                  id="address_city"
                  name="address_city"
                  fullWidth
                  value={client.address[0].city}
                  variant="outlined"
                  size="small"
                  autoComplete="text"
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Estado*</Typography>

                <TextField
                  disabled
                  id="address_state"
                  name="address_state"
                  fullWidth
                  value={client.address[0].state}
                  variant="outlined"
                  size="small"
                  autoComplete="text"
                  autoFocus
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Referência</Typography>
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  disabled
                  id="address_reference"
                  name="address_reference"
                  value={client.address[0].reference}
                  autoFocus
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </>
  );
}

export default FormViewClient;
