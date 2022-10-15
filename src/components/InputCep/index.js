import React, { useState } from "react";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";

import { Box } from "@material-ui/core";
import { SearchOutlined } from "@material-ui/icons";

import axios from "axios";

import Loading from "../Loading";

import { Button, InputContainer } from "./styles";

function InputCep({
  id = "",
  mask = "99999-999",
  disabled = false,
  formik,
  ...rest
}) {
  const [loading, setLoading] = useState(false);

  async function consultaCep(cep) {
    setLoading(true);
    if (Number(cep)) {
      try {
        await axios
          .get(`https://viacep.com.br/ws/${cep}/json/`)
          .then((response) => {
            if (response && response.status === 200 && response.data.erro) {
              toast.error(
                "CEP não encontrado, preencha os campos manualmente."
              );
              return;
            }

            if (response && response.status === 200) {
              formik.setFieldValue("address_state", response.data.uf);
              formik.setFieldValue("address_city", response.data.localidade);
              formik.setFieldValue("address_district", response.data.bairro);
              formik.setFieldValue("address_street", response.data.logradouro);
              formik.setFieldValue(
                "address_complement",
                response.data.complemento
              );
            }
          });
      } catch (error) {
        toast.error("CEP informado não localizado, digite novamente.");
      } finally {
        setLoading(false);
      }
    } else {
      toast.error("CEP não informado.");
      setLoading(false);
    }
  }

  return (
    <>
      <InputContainer
        error={
          formik &&
          formik?.touched.address_code &&
          Boolean(formik?.errors.address_code)
        }
      >
        <ReactInputMask
          id={id}
          name={id}
          mask={mask}
          className={"MuiInputBase-input"}
          style={{
            padding: "8.5px 10px",
            minHeight: "20px",
          }}
          disabled={disabled || loading}
          {...rest}
        />
        <Button
          disabled={disabled || loading}
          onClick={() => consultaCep(parseInt(formik.values.address_code))}
        >
          {loading ? <Loading size={2} /> : <SearchOutlined />}
        </Button>
      </InputContainer>

      {formik &&
      formik.touched.address_code &&
      Boolean(formik.errors.address_code) ? (
        <Box className="MuiFormHelperText-root Mui-error">
          {formik.errors.address_code}
        </Box>
      ) : null}
    </>
  );
}

export default InputCep;
