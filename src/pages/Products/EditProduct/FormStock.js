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

function FormStock({
  id,
  formEl,
  value,
  formik,
  loading,
  callHandleSubmit,
  setCallHandleSubmit,
  setIsValid,
}) {
  useEffect(() => {
    if (callHandleSubmit) {
      //formik.handleSubmit();
      //setCallHandleSubmit(false);
    }
  }, [callHandleSubmit]);

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
                  autoComplete="text"
                  value={formik.values.minStock}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minStock && Boolean(formik.errors.minStock)
                  }
                  helperText={formik.touched.minStock && formik.errors.minStock}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Controle de estoque*</Typography>
                <TextField
                  required
                  size="small"
                  id="controlStock"
                  name="controlStock"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.controlStock}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.controlStock &&
                    Boolean(formik.errors.controlStock)
                  }
                  helperText={
                    formik.touched.controlStock && formik.errors.controlStock
                  }
                  fullWidth
                />
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
                  value={formik.values.stockInitial}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.stockInitial &&
                    Boolean(formik.errors.stockInitial)
                  }
                  helperText={
                    formik.touched.stockInitial && formik.errors.stockInitial
                  }
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
