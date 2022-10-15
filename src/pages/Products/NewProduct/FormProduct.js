import React from "react";

import { Box, Typography, TextField, MenuItem, Grid, Button, Select, FormHelperText } from "@material-ui/core";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";

import Loading from "../../../components/Loading";
import CardImage from "../../../components/CardImage";

import { Container } from "./style";

function FormProduct({ formEl, formik, loading, handleChangeAvancar, category, type, model, plated }) {

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Container>
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
                    placeholder="000000"
                    variant="outlined"
                    autoComplete="text"
                    value={formik.values.external_code}
                    onChange={formik.handleChange}
                    error={formik.touched.external_code && Boolean(formik.errors.external_code)}
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
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2} sm={6}>
                  <Typography>Categoria*</Typography>
                  <Select
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    id="category"
                    name="category"
                    autoFocus
                    value={formik.values.category}
                    onChange={formik.handleChange}
                    error={formik.touched.category && Boolean(formik.errors.category)}
                  >
                  {category && category.map((item)=>
                    <MenuItem value={item.id} key={item.id}>
                      {item.description}
                    </MenuItem>)
                  }
                  </Select>
                {formik.touched.category && Boolean(formik.errors.category) && 
                    <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.category && formik.errors.category}</FormHelperText>
                }
                </Grid>
                <Grid item xs={12} md={2} sm={6}>
                  <Typography>Tipo*</Typography>
                  <Select 
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    id="product_type"
                    name="product_type"
                    placeholder="Selecione o tipo do produto"
                    value={formik.values.product_type}
                    onChange={formik.handleChange}
                    error={formik.touched.product_type && Boolean(formik.errors.product_type)}
                  >
                    {type && type.map((item)=>
                    <MenuItem value={item.id} key={item.id}>
                      {item.description}
                    </MenuItem>)}
                  </Select>
                {formik.touched.product_type && Boolean(formik.errors.product_type) && 
                  <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.product_type && formik.errors.product_type}</FormHelperText>
                }
                </Grid>
                <Grid item xs={12} md={3} sm={6}>
                  <Typography>Banho*</Typography>
                  <Select
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    autoFocus
                    id="plated"
                    name="plated"
                    value={formik.values.plated}
                    onChange={formik.handleChange}
                    error={formik.touched.plated && Boolean(formik.errors.plated)}
                  >
                  {plated && plated.map((item)=>
                    <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>)}
                  </Select>
                  {formik.touched.plated && Boolean(formik.errors.plated) && 
                    <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.plated && formik.errors.plated}</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12} md={2} sm={6}>
                  <Typography>Modelo*</Typography>
                  <Select
                    size="small"
                    variant="outlined"
                    required
                    fullWidth
                    id="model"
                    name="model"
                    autoFocus
                    value={formik.values.model}
                    onChange={formik.handleChange}
                    error={formik.touched.model && Boolean(formik.errors.model)}
                  >
                    {model && model.map((item)=>
                    <MenuItem value={item.id} key={item.id}>
                    {item.name}
                  </MenuItem>)}
                  </Select>
                  {formik.touched.model && Boolean(formik.errors.model) && 
                    <FormHelperText className="MuiFormHelperText-root Mui-error">{formik.touched.model && formik.errors.model}</FormHelperText>
                  }
                </Grid>
                <Grid item xs={12} md={2} sm={6}>
                  <Typography>Valor*</Typography>
                  <CurrencyTextField
                    size="small"
                    variant="outlined"
                    required
                    placeholder="0,00"
                    id="value"
                    name="value"
                    value={formik.values.value}
                    currencySymbol="R$"
                    decimalCharacter=","
                    digitGroupSeparator="."
                    maximumValue={9999999}
                    minimumValue={0}
                    onChange={(e, value) => formik.setFieldValue("value", value)}
                    error={formik.touched.value && Boolean(formik.errors.value)}
                    helperText={formik.touched.value && formik.errors.value}
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
                    <MenuItem value={true} key={true}>
                      {"Ativo"}
                    </MenuItem>
                    <MenuItem value={false} key={false}>
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
                    fullWidth
                    id="new"
                    name="new"
                    value={formik.values.new}
                    autoFocus
                    onChange={formik.handleChange}
                  >
                    <MenuItem value={true} key={'true'}>
                      {"Sim"}
                    </MenuItem>
                    <MenuItem value={false} key={'false'}>
                      {"Não"}
                    </MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3} sm={6}>
                  <Typography>Data limite de novidade{formik.values.new && '*'}</Typography>
                  <TextField
                    type="date"
                    size="small"
                    variant="outlined"
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
              style={{ fontWeight: "bold", margin: "16px 0px" }}
            >
              Imagens do produto
            </Typography>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
              {Array.from(formik.values.images).map((value) => {
                return (
                  <CardImage
                    image={value}
                    key={value[0]}
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
              })}
            </Box>
            <Box mt={2} sx={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent:'flex-end' }}>
            <Button
              variant="contained"
              size="large"
              color="primary"
              style={{
                color: "#FFF",
                borderRadius: "24px",
              }}
              onClick={() => (!formik.isValid) || formik?.values.name === ""  ? formik.handleSubmit() : handleChangeAvancar()}
            >
              Avançar
            </Button>
            </Box>
          </form>
        </Container>
      )}
    </>
  );
}
export default FormProduct;
