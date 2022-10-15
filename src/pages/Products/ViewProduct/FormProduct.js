import React from "react";

import { Box, Typography, TextField, MenuItem, Grid } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import Loading from "../../../components/Loading";
import CardImage from "../../../components/CardImage";

function FormProduct({ id, data, loading }) {
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
            Dados do produto
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Código externo*</Typography>
                <TextField
                  required
                  size="small"
                  id="id"
                  name="id"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.id}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Nome*</Typography>
                <TextField
                  required
                  size="small"
                  id="name"
                  name="name"
                  placeholder="Nome do produto"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.name}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
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
                  value={data?.categories}
                  autoFocus
                >
                  <MenuItem value={1} key={1}>
                    {"Brinco"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Tipo*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  id="type"
                  name="type"
                  value={data?.type}
                  autoFocus
                >
                  <MenuItem value={1} key={1}>
                    {"Argola"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Banho*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  id="banho"
                  placeholder="Selecione o banho do produto"
                  name="banho"
                  value={data?.banho}
                  autoFocus
                >
                  <MenuItem value={1} key={1}>
                    {"Folheado a ouro"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Modelo*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  disabled
                  id="model"
                  name="model"
                  value={data?.model}
                  autoFocus
                >
                  <MenuItem value={1} key={1}>
                    {"Masculino"}
                  </MenuItem>
                  <MenuItem value={2} key={2}>
                    {"Feminino"}
                  </MenuItem>
                  <MenuItem value={3} key={3}>
                    {"Infantil"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Valor</Typography>
                <CurrencyTextField
                  size="small"
                  variant="outlined"
                  required
                  id="price"
                  name="price"
                  disabled
                  value={data?.price}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  maximumValue={9999999}
                  minimumValue={0}
                />
              </Grid>

              <Grid item xs={12} md={2} sm={6}>
                <Typography>Status*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="status"
                  disabled
                  name="status"
                  value={data?.status}
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
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Novidade*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="isNew"
                  name="isNew"
                  disabled
                  value={data?.isNew}
                  autoFocus
                >
                  <MenuItem value={true} key={true}>
                    {"Sim"}
                  </MenuItem>
                  <MenuItem value={false} key={false}>
                    {"Não"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Data limite de novidade*</Typography>
                <TextField
                  type="date"
                  size="small"
                  variant="outlined"
                  required
                  disabled
                  fullWidth
                  id="date_validity_new"
                  name="date_validity_new"
                  autoFocus
                  value={data?.date_validity_new}
                />
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Imagens do produto
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {Array.from(data.images).map((value) => {
              return <CardImage image={value} disabled />;
              // return <h1>{value}</h1>;
            })}
          </Box>
        </form>
      )}
    </>
  );
}
export default FormProduct;
