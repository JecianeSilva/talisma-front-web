import React, { useState } from "react";
import { toast } from "react-toastify";
import { Typography, Button, IconButton, Box, Divider } from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";

// import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentBody, ContentHeader } from "./styles";

import Loading from "../../components/Loading";

import * as yup from "yup";
import { useFormik } from "formik";
import CardImage from "../../components/CardImage";

function Promotions() {
  const [loading, setLoading] = useState(false);

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
      handleSubmit(values);
    },
  });

  // get promotions
  async function loadData() {
    try {
      // const { data } = await Api.get("/promotions");
      const data = new Map([
        [1, null],
        [2, null],
        [3, null],
        [4, null],
        [5, null],
      ]);
      formik.setFieldValue("images", data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os dados"
      );
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmit(values) {
    try {
      console.log(values);
      // Api.patch(`/promotion/${id}`, data)
      //   .then((response) => {
      //     if (response.status === 200) {
      toast.success("Promoção atualizada com sucesso!");
      loadData();
      //     }
      //   })
      //   .catch((err) => {
      //     toast.error(err.response.data.message);
      //   });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error no sistema! Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

  // useEffect(() => {
  //   loadDataUserTypes();
  // }, [id]);

  return (
    <>
      {loading ? (
        <Loading fullScreen />
      ) : (
        <Container>
          <ContentHeader>
          <IconButton
            onClick={() => history.goBack()}
            style={{
              backgroundColor: "#70163A",
              color: "#D68E70",
              paddingRight: "3px",
              height: "40px",
              width: "40px",
            }}
          >
            <ArrowBackIos />
          </IconButton>

            <Typography
              variant="h1"
              style={{
                color: "#656263",
                marginLeft: "24px",
                flex: 1
              }}
            >
              Cadastrar anúncio
            </Typography>

            <div style={{ display: "flex" }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#F35457",
                  color: "#FFF",
                  borderRadius: "24px",
                }}
                onClick={() => loadData()}
              >
                Descartar
              </Button>
              <Button
                variant="contained"
                size="large"
                startIcon={<Add />}
                style={{
                  backgroundColor: "#21AB69",
                  color: "#FFF",
                  marginLeft: "20px",
                  borderRadius: "24px",
                }}
                type="submit"
                //disabled={!(value === 2 || formik.isValid)}
                onClick={() => formik.handleSubmit()}
              >
                Cadastrar
              </Button>
            </div>
          </ContentHeader>
          <ContentBody>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", marginBottom: "22px" }}
          >
            Anúncio
          </Typography>
          <Divider  width={'100%'}/>

          <Box sx={{ display: "flex", flexWrap: "wrap", gap:'24px' }}>
            {Array.from(formik.values.images).map((value) => {
              return (
                <Box>
                 <Typography
            variant="h4"
            color="secondary"
            style={{ fontWeight: "bold", margin: "16px 0 16px" }}
          >
            Mídia do anúncio
          </Typography>
                <CardImage
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
                </Box>
              );
            })}
          </Box>
          </ContentBody>
        </Container>
      )}
    </>
  );
}

export default Promotions;
