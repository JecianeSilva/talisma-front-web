import React from "react";

import { Box, Typography, TextField, MenuItem, Grid, Select } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import Loading from "../../../components/Loading";

import CardImage from "../../../components/CardImage";

function FormProduct({ id, formEl, formik, loading }) {
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
            Dados do produto
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Código externo*</Typography>
                <TextField
                  required
                  size="small"
                  id="external_code"
                  name="external_code"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values?.external_code}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.external_code && Boolean(formik.errors.external_code)
                  }
                  helperText={formik.touched.external_code && formik.errors.external_code}
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
                  value={formik.values?.name}
                  onChange={formik.handleChange}
                  error={formik.touched.name && Boolean(formik.errors.name)}
                  helperText={formik.touched.name && formik.errors.name}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Categoria*</Typography>
                <Select
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="category"
                  name="category"
                  value={formik.values?.category}
                  autoFocus
                  onChange={formik.handleChange}
                  error={formik.touched.category && Boolean(formik.errors.category)}
                >
                  <MenuItem value={1} key={1}>
                    {"Brinco"}
                  </MenuItem>
                </Select>
                
              </Grid>
              <Grid item xs={12} md={2} sm={6}>
                <Typography>Tipo*</Typography>
                <TextField
                  select
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="product_type"
                  name="product_type"
                  value={formik.values?.product_type}
                  autoFocus
                  onChange={formik.handleChange}
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
                  fullWidth
                  placeholder="Selecione o banho do produto"
                  id="banho"
                  name="banho"
                  value={formik.values?.banho}
                  autoFocus
                  onChange={formik.handleChange}
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
                  id="model"
                  name="model"
                  value={formik.values.model}
                  autoFocus
                  onChange={formik.handleChange}
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
                  value={formik.values.price}
                  currencySymbol="R$"
                  decimalCharacter=","
                  digitGroupSeparator="."
                  maximumValue={9999999}
                  minimumValue={0}
                  onChange={(e, price) => formik.setFieldValue("price", price)}
                  error={formik.touched.price && Boolean(formik.errors.price)}
                  helperText={formik.touched.price && formik.errors.price}
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
                  value={formik.values.isNew}
                  autoFocus
                  onChange={formik.handleChange}
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
                  product_type="date"
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="date_validity_new"
                  name="date_validity_new"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.date_validity_new}
                  error={
                    formik.touched.date_validity_new && Boolean(formik.errors.date_validity_new)
                  }
                  helperText={
                    formik.touched.date_validity_new && formik.errors.date_validity_new
                  }
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
            {Array.from(formik.values.images).map((value) => {
              return (
                <CardImage
                  image={value}
                  formik={formik}
                  handleImage={(e) => {
                    const images = formik.values.images;
                    formik.values.images.set(
                      value[0],
                      URL.createObjectURL(e.target.files[0])
                    );
                    formik.setFieldValue("images", images);
                  }}
                />
              );
              // return <h1>{value}</h1>;
            })}
          </Box>
        </form>
      )}
    </>
  );
}
export default FormProduct;
