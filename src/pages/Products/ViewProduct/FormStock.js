import React, { useState, useEffect, useRef, forwardRef } from "react";
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
import {
  ArrowBackIos,
  Clear,
  Search,
  SearchOutlined,
} from "@material-ui/icons";
import InputMask from "react-input-mask";
import ReactPhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import axios from "axios";
import { getDate } from "../../../utils";
import Api from "../../../config/api";
import MaterialTable from "material-table";
import { localization } from "../../../utils/location-ptBr";

function FormStock({ data, value, loading }) {
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
            Estoque inicial
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sm={6}>
                <Typography> Estoque mínimo *</Typography>
                <TextField
                  required
                  size="small"
                  id="minStock"
                  name="minStock"
                  variant="outlined"
                  disabled
                  autoComplete="text"
                  value={data?.minStock}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Controle de estoque*</Typography>
                <TextField
                  required
                  select
                  size="small"
                  id="controlStock"
                  name="controlStock"
                  variant="outlined"
                  autoComplete="text"
                  disabled
                  value={data?.controlStock}
                  fullWidth
                >
                  <MenuItem value={1} key={1}>
                    {"Nenhum"}
                  </MenuItem>
                </TextField>
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <Typography>Estoque inicial*</Typography>
                <TextField
                  required
                  size="small"
                  type="number"
                  id="stockInitial"
                  name="stockInitial"
                  placeholder="Detalhes do produto"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.stockInitial}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
        </form>
      )}
    </>
  );
}
export default FormStock;
