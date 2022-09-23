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
import { Add, ArrowBackIos, Search } from "@material-ui/icons";
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

function EditClient() {
  const params = useParams();
  const formEl = useRef(null);

  const { id } = params;
  const [value, setValue] = React.useState(0);
  const [callHandleSubmit, setCallHandleSubmit] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event, newValue) => {
    setCallHandleSubmit(true);
    setValue(newValue);
  };

  const formik = useFormik({
    initialValues: {
      id: "",
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
    },
    validationSchema: Yup.object({
      id: Yup.string(),
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
      image1: Yup.string(),
      image2: Yup.string(),
      image3: Yup.string(),
      image4: Yup.string(),
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
        toast.success("Produto cadastrado com sucesso!");
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

  useEffect(() => {});
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
            Cadastrar produto
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
              startIcon={<Add />}
              style={{
                backgroundColor:
                  value === 2 || formik.isValid ? "#21AB69" : "#cecece",
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
          <TabPanel value={value} index={0} style={{ padding: "1.5rem 1rem" }}>
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

export default EditClient;
