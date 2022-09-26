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
  InputAdornment,
  IconButton,
  Box,
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
import { VisibilityOffOutlined, VisibilityOutlined } from "@material-ui/icons";
import Button from "../../components/Button";

function Login() {
  const formEl = useRef(null);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState();
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
      setTimeout(() => {
        setLoading(false);
      }, 1000);
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
          <Box mb={3}>
            <Typography variant="h4" color="textSecondary" sx={{ mb: 2 }}>
              Login
            </Typography>
            <TextField
              name="email"
              variant="outlined"
              placeholder="exemplo@exemplo.com"
              style={{ marginTop: "0.7rem" }}
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              fullWidth
            />
          </Box>
          <Box mb={5}>
            <Typography variant="h4" color="textSecondary">
              Senha
            </Typography>
            <TextField
              name="password"
              variant="outlined"
              placeholder="Senha"
              style={{ marginTop: "0.7rem" }}
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              type={showPassword ? "text" : "password"}
              onKeyDown={(e) =>
                e.key === "Enter" ? formik.handleSubmit() : {}
              }
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
          </Box>
          <Button
            title={"Entrar"}
            isLoading={loading}
            color={"primary"}
            width={90}
            handleOnClick={formik.handleSubmit}
          />
        </FormContainer>
      </Container>
    </>
  );
}

export default withRouter(Login);
