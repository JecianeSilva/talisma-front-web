import React, { useState, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Box,
  Typography,
  TextField,
  MenuItem,
  Grid,
  CardContent,
  SvgIcon,
  IconButton,
} from "@material-ui/core";
import InputMask from "react-input-mask";
import CurrencyTextField from "@unicef/material-ui-currency-textfield";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import axios from "axios";
import { getDate } from "../../../utils";
import Api from "../../../config/api";

import { ReactComponent as imageUpload } from "../../../assets/icons/image-upload.svg";
import { ReactComponent as imageSwap } from "../../../assets/icons/image-swap.svg";
import { Close } from "@material-ui/icons";

function FormProduct({
  id,
  formEl,
  value,
  formik,
  loading,
  callHandleSubmit,
  setCallHandleSubmit,
}) {
  const [image, setImage] = useState();

  useEffect(() => {
    if (callHandleSubmit) {
      //formik.handleSubmit();
      //setCallHandleSubmit(false);
    }
  }, [callHandleSubmit]);

  const handleImage = (e) => {
    setImage(URL.createObjectURL(e.target.files[0]));
  };

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
                  id="codeExt"
                  name="codeExt"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.codeExt}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.codeExt && Boolean(formik.errors.codeExt)
                  }
                  helperText={formik.touched.codeExt && formik.errors.codeExt}
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
                <TextField
                  select
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
                  id="type"
                  name="type"
                  value={formik.values.type}
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
                  id="type"
                  name="type"
                  value={formik.values.type}
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
                  value={formik.values.type}
                  autoFocus
                  onChange={formik.handleChange}
                >
                  <MenuItem value={1} key={1}>
                    {"Masculino"}
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
                <Typography>Novidade?*</Typography>
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
                  type="date"
                  size="small"
                  variant="outlined"
                  required
                  fullWidth
                  id="dateLimit"
                  name="dateLimit"
                  autoFocus
                  onChange={formik.handleChange}
                  value={formik.values.dateLimit}
                  error={
                    formik.touched.dateLimit && Boolean(formik.errors.dateLimit)
                  }
                  helperText={
                    formik.touched.dateLimit && formik.errors.dateLimit
                  }
                />
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", margin: "46px 0px 20px" }}
          >
            Imagens do produto
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap" }}>
            <CardContent
              class="file-name"
              style={{
                border: image ? "none" : "2px dashed #bdbcbc",
              }}
            >
              {image && (
                <>
                  <img
                    style={{
                      width: "220px",
                      height: "220px",
                      borderRadius: "7px",
                    }}
                    src={image ? image : null}
                  />
                  <div
                    style={{
                      marginTop: "-44px",
                      width: "220px",
                      zIndex: 9999,
                      display: "flex",
                      justifyContent: "flex-end",
                      alignItems: "end",
                    }}
                  >
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      style={{
                        display: "none",
                      }}
                      onChange={handleImage}
                    />
                    <label
                      for="contained-button-file"
                      style={{
                        background: "rgba(255, 255, 255,0.96)",
                        borderRadius: "4px 0px",
                      }}
                    >
                      <SvgIcon
                        component={imageSwap}
                        style={{ margin: 4 }}
                        viewBox="0 0 35 28"
                      />
                    </label>
                  </div>
                </>
              )}
              <label
                className="container-button"
                for="contained-button-file"
                style={{ height: "100%" }}
              >
                <Box
                  container
                  sx={{
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    height: "100%",
                    display: image ? "none" : "flex",
                  }}
                >
                  <SvgIcon
                    component={imageUpload}
                    style={{ width: "1.3em", height: "1.3em" }}
                    viewBox="0 0 32 32"
                  />
                  ,
                  <Typography
                    variant="h2"
                    color="secondary"
                    style={{ textAlign: "center", padding: "0px 2rem" }}
                  >
                    Fazer upload de imagem...
                  </Typography>
                </Box>
              </label>
              <input
                accept="image/*"
                id="contained-button-file"
                multiple
                type="file"
                style={{
                  display: "none",
                }}
                onChange={handleImage}
              />
            </CardContent>
          </Box>
        </form>
      )}
    </>
  );
}
export default FormProduct;
