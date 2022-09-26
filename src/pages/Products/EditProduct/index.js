import React, { useRef, useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowBackIos, Search } from "@material-ui/icons";
import PropTypes from "prop-types";
import Api from "../../../config/api";
import { useFormik } from "formik";
import * as Yup from "yup";

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import FormCharacter from "./FormCharacter";
import FormStock from "./FormStock";
import HorizontalLabelPositionBelowStepper from "../../../components/ProductStepper";
import ProcuctStepper from "../../../components/ProductStepper";
import image1 from "../../../assets/images/product1.png";
function EditProduct() {
  const params = useParams();
  const formEl = useRef(null);

  const { id } = params;
  const [value, setValue] = React.useState(0);
  const [callHandleSubmit, setCallHandleSubmit] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setCallHandleSubmit(true);
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      codeExt: "",
      name: "",
      categories: 1,
      type: 1,
      banho: 1,
      model: 1,
      price: "",
      isNew: true,
      dateLimit: "",
      status: 0,
      ref: "",
      peso: "",
      details: "",
      minStock: 0,
      controlStock: "",
      stockInitial: 0,
      images: new Map([
        [1, image1],
        [2, null],
        [3, null],
        [4, null],
      ]),
    },
    validationSchema: Yup.object({
      codeExt: Yup.string().required("Campo Obrigatório"),
      name: Yup.string().required("Campo Obrigatório"),
      categories: Yup.string().required("Campo Obrigatório"),
      type: Yup.string().required("Campo Obrigatório"),
      banho: Yup.string().required("Campo Obrigatório"),
      status: Yup.number().required("Campo Obrigatório"),
      model: Yup.string().required("Campo Obrigatório"),
      price: Yup.string().required("Campo Obrigatório"),
      isNew: Yup.boolean().required("Campo Obrigatório"),
      dateLimit: Yup.string().required("Campo Obrigatório"),
      ref: Yup.string().required("Campo Obrigatório"),
      peso: Yup.string().required("Campo Obrigatório"),
      details: Yup.string().required("Campo Obrigatório"),
      colorDescription: Yup.string(),
      tamDescription: Yup.string(),
      controlStock: Yup.string().required("Campo Obrigatório"),
      minStock: Yup.number().required("Campo Obrigatório"),
      stockInitial: Yup.number().required("Campo Obrigatório"),
    }),
    onSubmit: async (values) => {
      setLoading(true);

      try {
        console.log(values);
        // Api.patch(`/product/${id}`, data)
        //   .then((response) => {
        //     if (response.status === 200) {
        toast.success("Produto alterado com sucesso!");
        history.goBack();
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
    },
  });

  async function loadData() {
    try {
      // const { data } = await Api.get(`/product/${id}`);
      // const responseUserType = await Api.get(`/userType`);
      // if (responseUserType) {
      //   setUserTypes(
      //     responseUserType.data.map((item) => ({
      //       id: item.id,
      //       description: item.description,
      //     }))
      //   );
      // }
      formik.setFieldValue("codeExt", "00000000");
      formik.setFieldValue("ref", "00000000");
      formik.setFieldValue("peso", "0,5 kg");
      formik.setFieldValue("details", "detalhes do produto");
      formik.setFieldValue("name", "nome do produto");
      formik.setFieldValue("categores", 1);
      formik.setFieldValue("minStock", "1.000");
      formik.setFieldValue("stockInitial", "1.000");
      formik.setFieldValue("controlStock", 1);
      formik.setFieldValue("type", 1);
      formik.setFieldValue("banho", 1);
      formik.setFieldValue("price", 0.0);
      formik.setFieldValue("isNew", true);
      formik.setFieldValue("color", [
        {
          ref: "000000",
          description: "Ouro",
          price: "100",
          status: 0,
        },
        {
          ref: "000001",
          description: "Ouro",
          price: "100",
          status: 0,
        },
        {
          ref: "000002",
          description: "Ouro",
          price: "100",
          status: 0,
        },
      ]);
      formik.setFieldValue("tamanho", [
        {
          ref: "000016",
          description: 16,
          price: "100",
          status: 0,
        },
        {
          ref: "000018",
          description: 18,
          price: "100",
          status: 0,
        },
        {
          ref: "000020",
          description: 20,
          price: "100",
          status: 0,
        },
      ]);
      formik.setFieldValue("dateLimit", "2022-09-20");
      formik.setFieldValue("quantity", 100);
      formik.setFieldValue("status", 0);
      // formik.setFieldValue("images", ");
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
  useEffect(() => {
    loadData();
  }, [id]);
  return (
    <>
      <Container>
        <ContentHeader>
          <IconButton
            onClick={() => history.goBack()}
            style={{
              backgroundColor: "#70163A",
              color: "#D68E70",
              paddingRight: "3px",
              height: "48px",
              width: "48px",
            }}
          >
            <ArrowBackIos />
          </IconButton>
          <Typography
            variant="h3"
            style={{
              color: "#656263",
              marginRight: "40px",
              flex: 1,
              marginLeft: "20px",
              fontSize: "35px",
              lineheight: "43px",
            }}
          >
            Editar produto
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
              onClick={() => history.goBack()}
            >
              Descartar
            </Button>
            <Button
              ref={formEl}
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#21AB69",
                color: "#FFF",
                marginLeft: "20px",
                borderRadius: "24px",
              }}
              type="submit"
              onClick={() => formik.handleSubmit()}
            >
              Salvar
            </Button>
          </div>
        </ContentHeader>
        {loading ? (
          <Loading />
        ) : (
          <ContentBody>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                width: "100%",
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                indicatorColor="transparent"
                textColor="secondary"
              >
                <Tab label="Produto" {...a11yProps(0)} />
                <Tab label="Característica" {...a11yProps(1)} />
                <Tab label="Estoque" {...a11yProps(2)} />
                <ProcuctStepper
                  steps={["Produto", "Característica", "Estoque"]}
                  activeStep={value}
                />
              </Tabs>
              <Divider />
            </Box>
            <TabPanel
              value={value}
              index={0}
              style={{ padding: "1.5rem 1rem" }}
            >
              <FormProduct
                id={id}
                formEl={formEl}
                value={value}
                formik={formik}
                loading={loading}
                callHandleSubmit={callHandleSubmit}
                setCallHandleSubmit={setCallHandleSubmit}
              />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              style={{ padding: "1rem 0px", width: "100%", margin: "0px" }}
            >
              <FormCharacter
                id={id}
                formEl={formEl}
                value={value}
                formik={formik}
                loading={loading}
                callHandleSubmit={callHandleSubmit}
                setCallHandleSubmit={setCallHandleSubmit}
              />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              style={{ padding: "1rem 0px", width: "100%", margin: "0px" }}
            >
              <FormStock
                id={id}
                formEl={formEl}
                value={value}
                formik={formik}
                loading={loading}
                callHandleSubmit={callHandleSubmit}
                setCallHandleSubmit={setCallHandleSubmit}
              />
            </TabPanel>
          </ContentBody>
        )}
      </Container>
    </>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box container>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

export default EditProduct;
