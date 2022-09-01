import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { withRouter } from "react-router-dom";

import * as yup from "yup";
import { useFormik } from "formik";

import {
  Typography,
  AppBar,
  Toolbar,
  TextField,
  Button,
  InputAdornment,
  IconButton,
} from "@material-ui/core";

import { Creators } from "../../store/ducks/auth";
import TalismaLogo from "../../assets/images/logo.png";

import {
  Container,
  ContentToolbar,
  Divider,
  FormContainer,
  Logo,
  LogoContainer,
} from "./style";
import Loading from "../../components/Loading";
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";

function Login() {
  const dispatch = useDispatch();
  const formEl = useRef(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string("E-mail")
        .email("Digite um endereço de e-mail válido.")
        .required("Campo obrigatório"),
      password: yup.string("Senha").required("Campo obrigatório"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      dispatch(Creators.signInRequest(values.email, values.password));
      setLoading(false);
    },
  });

  return (
    <>
      <ContentToolbar>
        <AppBar position="fixed" style={{ background: "#70163A" }}>
          <Toolbar>
            <Typography variant="h6"></Typography>
          </Toolbar>
          <Divider />
        </AppBar>
      </ContentToolbar>
      <Container>
        <LogoContainer>
          <Logo src={TalismaLogo} />
        </LogoContainer>
        <FormContainer ref={formEl} noValidate autoComplete={"off"}>
          <div style={{ marginBottom: "24px" }}>
            <Typography
              variant="h4"
              style={{ color: "black", marginBottom: 5 }}
            >
              Login
            </Typography>
            <TextField
              id="login"
              variant="outlined"
              value={formik.values.email}
              placeholder="exemplo@exemplo.com"
              onChange={(e) => {
                formik.setFieldValue("email", e.target.value);
              }}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </div>
          <div>
            <Typography
              variant="h4"
              style={{ color: "black", marginBottom: 5 }}
            >
              Senha
            </Typography>
            <TextField
              id="password"
              variant="outlined"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="Senha"
              type={showPassword ? "text" : "password"}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={handleClickShowPassword}>
                      {showPassword ? (
                        <VisibilityOutlined color="primary" />
                      ) : (
                        <VisibilityOffOutlined color="primary" />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              marginTop: "16px",
            }}
          >
            <Button
              onClick={formik.handleSubmit}
              variant="contained"
              style={{
                backgroundColor: "#70163A",
                color: "#FFF",
                width: "90%",
                marginTop: "24px",
                borderRadius: "30px",
                padding: "1rem",
                disabled: loading,
              }}
            >
              {loading ? (
                <Loading size={3} color="white" />
              ) : (
                <span
                  style={{
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: "bold",
                  }}
                >
                  {"Entrar"}
                </span>
              )}
            </Button>
          </div>
        </FormContainer>
      </Container>
    </>
  );
}

export default withRouter(Login);
