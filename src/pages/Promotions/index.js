import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  InputAdornment,
  IconButton,
  TextField,
  Box,
} from "@material-ui/core";
import { ArrowBackIos, Search } from "@material-ui/icons";

import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentBody, ContentHeader } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Button from "../../components/Button";
import CardImage2 from "../../components/CardImage2";

import * as yup from "yup";
import { useFormik } from "formik";

function Promotions() {
  const [loading, setLoading] = useState(true);
  const [promotions, setPromotions] = useState([]);

  const formik = useFormik({
    initialValues: {
      images: new Map([
        [1, null],
        [2, null],
        [3, null],
        [4, null],
        [5, null],
      ]),
    },
    validationSchema: yup.object({}),
    onSubmit: async (values) => {
      console.log(values);
    },
  });

  // get list userTypes
  async function loadDataUserTypes() {
    try {
      // const { data } = await Api.get("/promotions");
      const data = [
        "../../assets/images/product1.png",
        "../../assets/images/product2.png",
        "../../assets/images/product3.png",
      ];
      setPromotions(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os usuários"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDataUserTypes();
  }, []);

  return (
    <>
      {loading ? (
        <Loading fullScreen />
      ) : (
        <Container>
          <ContentHeader>
            <div
              style={{
                backgroundColor: "#30163A",

                marginRight: "16px",
                height: "48px",
                width: "48px",
              }}
            >
              <IconButton
                onClick={() => history.goBack()}
                fullWidth
                style={{
                  backgroundColor: "#70163A",
                  color: "#D68E70",
                  paddingRight: 3,
                }}
              >
                <ArrowBackIos />
              </IconButton>
            </div>

            <Typography
              variant="h1"
              style={{
                color: "#656263",
                marginRight: "40px",
              }}
            >
              Cadastrar anúncio
            </Typography>

            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                handleOnClick={() => history.push("/tipos-cliente/novo-tipo")}
                title="Adicionar"
                padding="0.5rem"
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", margin: "46px 0px 20px" }}
          >
            Imagens do produto
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", gap: "24px" }}>
            {Array.from(formik.values.images).map((value) => {
              return (
                <CardImage2
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
        </Container>
      )}
    </>
  );
}

export default Promotions;
