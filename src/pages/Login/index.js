import React, { useRef, useState } from "react";
import { useDispatch } from "react-redux";

import { Link, withRouter } from "react-router-dom";
import { toast } from "react-toastify";

import * as yup from "yup";
import { useFormik } from "formik";

import { Typography, AppBar, Toolbar, TextField } from "@material-ui/core";

import { Creators } from "../../store/ducks/auth";

import Input from "../../components/Input";
import Button from "../../components/Button";

import TalismaLogo from "../../assets/images/logo.png";

import {
  Container,
  ContentToolbar,
  Divider,
  FormContainer,
  Logo,
  LogoContainer,
} from "./style";

function Login() {
  const dispatch = useDispatch();
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      document: "",
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
      try {
        dispatch(Creators.signInRequest(values.email, values.password));
      } catch (err) {
        toast(
          "error",
          "Erro",
          err?.response?.data?.message || "Não foi possível realizar login"
        );
      } finally {
        setLoading(false);
      }
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
        <FormContainer ref={formRef} onSubmit={() => formik.handleSubmit()}>
          <div style={{ marginBottom: "24px" }}>
            <h5>Login</h5>
            <TextField
              id="login"
              variant="filled"
              size="small"
              margin="dense"
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
            <h5>Senha</h5>

            <TextField
              id="password"
              variant="filled"
              size="small"
              margin="dense"
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              placeholder="Senha"
              type="password"
              fullWidth
            />
          </div>
          {/* <Input
            name="email"
            type="email"
            label="Login/E-mail"
            registerValue={{ ...register("email") }}
            disabled={loading}
          /> */}
          {/* <Input
            name="name"
            id="name"
            type="email"
            placeholder="Email"
            innerRef={register({ required: true })}
            {...register("email")}
            className={classnames({ "is-invalid": errors["email"] })}
          /> */}

          {/* <Input
            name="password"
            type="password"
            registerValue={{ ...register("password") }}
            label="Senha"
            disabled={loading}
          /> */}
          <Button
            title="Entrar"
            type="submit"
            isLoading={loading}
            style={{ background: "#70163A" }}
          >
            Entrar
          </Button>
        </FormContainer>
        {/* <Link to="/recover-password">
          Esqueceu a <b>senha</b>?
        </Link> */}
      </Container>
    </>
  );
}

export default withRouter(Login);
