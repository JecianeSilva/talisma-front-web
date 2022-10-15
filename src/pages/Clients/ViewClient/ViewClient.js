import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Typography, MenuItem, Grid, Select } from "@material-ui/core";

import Api from "../../../config/api";
import Loading from "../../../components/Loading";
import Input from "../../../components/Input";
import InputCPF from "../../../components/InputCpf";
import InputPassword from "../../../components/InputPassword";
import InputPhone from "../../../components/InputPhone";
import InputCep from "../../../components/InputCep";

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
        err?.response.data?.message || "Não foi possível carregar os dados"
      );
    } finally {
      setLoading(false);
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
                <Input id="id" disabled value={client?.id} />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Nome*</Typography>
                <Input disabled id="name" value={client?.name} />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de nascimento*</Typography>
                <Input
                  type="date"
                  disabled
                  id="birthday"
                  value={client?.birthday}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data de Cadastro</Typography>
                <Input
                  type="date"
                  disabled
                  id="create_at"
                  value={client?.createdAt.substring(0, 10)}
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>CPF*</Typography>
                <InputCPF disabled id="document" value={client?.document} />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Status*</Typography>
                <Select
                  size="small"
                  variant="outlined"
                  disabled
                  fullWidth
                  id="status"
                  name="status"
                  value={client?.status}
                  autoFocus
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
                  disabled
                  fullWidth
                  id="categories"
                  name="categories"
                  value={client?.categories}
                  autoFocus
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
                  disabled
                  type="e-mail"
                  id="email"
                  value={client?.email}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Senha*</Typography>
                <InputPassword
                  disabled
                  id="password"
                  value={client?.password}
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Telefone*</Typography>
                <InputPhone id="phone" disabled value={client?.phone} />
              </Grid>
              <Grid item xs={3}>
                <Typography>Whatsapp*</Typography>
                <InputPhone id="whatsapp" disabled value={client?.whatsapp} />
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
                  disabled
                  id="address_code"
                  value={
                    client?.addresses.length > 0 && client.addresses[0].zipcode
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Logradouro*</Typography>
                <Input
                  disabled
                  id="address_street"
                  value={
                    client?.addresses.length > 0 && client.addresses[0].street
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Número*</Typography>
                <Input
                  disabled
                  value={
                    client?.addresses.length > 0 && client.addresses[0].number
                  }
                  id="address_number"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Complemento</Typography>
                <Input
                  disabled
                  value={
                    client?.addresses.length > 0 &&
                    client.addresses[0].complement
                  }
                  id="address_complement"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Bairro*</Typography>
                <Input
                  disabled
                  value={
                    client?.addresses.length > 0 && client.addresses[0].district
                  }
                  id="address_district"
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Cidade*</Typography>
                <Input
                  disabled
                  id="address_city"
                  value={
                    client?.addresses.length > 0 && client.addresses[0].city
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Estado*</Typography>
                <Input
                  disabled
                  id="address_state"
                  value={
                    client?.addresses.length > 0 && client.addresses[0].state
                  }
                />
              </Grid>
              <Grid item xs={3}>
                <Typography>Referência</Typography>
                <Input
                  disabled
                  id="address_reference"
                  value={
                    client?.addresses.length > 0 &&
                    client.addresses[0].reference
                  }
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
