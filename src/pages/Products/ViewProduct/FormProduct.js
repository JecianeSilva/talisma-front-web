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
import CardImage from "../../../components/CardImage";

function FormProduct({ id, data, value, loading }) {
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
                <Typography>Novidade?*</Typography>
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
                  id="dateLimit"
                  name="dateLimit"
                  autoFocus
                  value={data?.dateLimit}
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
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            <CardImage image={data.image} index={1} />
            <CardImage index={2} />
            <CardImage index={3} />
            <CardImage index={4} />
          </Box>
        </form>
      )}
    </>
  );
}
export default FormProduct;
