import React, { useRef, useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import {
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  IconButton,
  Divider,
} from "@material-ui/core";
import { Add, ArrowBackIos } from "@material-ui/icons";
import PropTypes from "prop-types";

import { useFormik } from "formik";
import * as Yup from "yup";

import Loading from "../../../components/Loading";

import Api from "../../../config/api";
import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";

import FormProduct from "./FormProduct";
import FormCharacter from "./FormCharacter";
import FormStock from "./FormStock";

function NewProduct() {
  const [loading, setLoading] = useState(true);

  // const {state} = useLocation();
  const formEl = useRef(null);
  
  // const [value, setValue] = React.useState(state?.params?.tab ? state.params.tab : 0);
  const [value, setValue] = React.useState( 0);
  const [category, setCategory] = useState();
  const [type, setType] = useState();
  const [model, setModel] = useState();
  const [plated, setPlated] = useState();

  const handleChange = (event, newValue) => {
    setValue(newValue);
    history.push(`/produtos/novo-produto`,{ params: { tab: newValue }})
  };

  const objectSchema1 = Yup.object({
    id: Yup.string(),
    external_code: Yup.string().required("Campo Obrigatório"),
    name: Yup.string().required("Campo Obrigatório"),
    category: Yup.string().required("Campo Obrigatório"),
    product_type: Yup.string().required("Campo Obrigatório"),
    plated: Yup.string().required("Campo Obrigatório"),
    status: Yup.boolean().required("Campo Obrigatório"),
    model: Yup.string().required("Campo Obrigatório"),
    value: Yup.string().required("Campo Obrigatório"),
    new: Yup.boolean().required("Campo Obrigatório"),
    date_validity_new: Yup.string().when('new', {
      is: true,
      then: Yup.string().required("Campo Obrigatório"),
    }),
  })
  
  const objectSchema2 = Yup.object({
    reference: Yup.string().required("Campo Obrigatório"),
    weight: Yup.string().required("Campo Obrigatório"),
    details: Yup.string().required("Campo Obrigatório"),
  })

  const objectSchema3 = Yup.object({
    id: Yup.string(),
    external_code: Yup.string().required("Campo Obrigatório"),
    name: Yup.string().required("Campo Obrigatório"),
    category: Yup.string().required("Campo Obrigatório"),
    product_type: Yup.string().required("Campo Obrigatório"),
    plated: Yup.string().required("Campo Obrigatório"),
    status: Yup.boolean().required("Campo Obrigatório"),
    model: Yup.string().required("Campo Obrigatório"),
    value: Yup.string().required("Campo Obrigatório"),
    new: Yup.boolean().required("Campo Obrigatório"),
    date_validity_new: Yup.string().when('new', {
      is: true,
      then: Yup.string().required("Campo Obrigatório"),
    }),

    reference: Yup.string().required("Campo Obrigatório"),
    weight: Yup.string().required("Campo Obrigatório"),
    details: Yup.string().required("Campo Obrigatório"),

    controlStock: Yup.string(),
    minStock: Yup.number().required("Campo Obrigatório"),
    stockInitial: Yup.number().required("Campo Obrigatório"),
  })

  const formik = useFormik({
    initialValues: {
      id: "",
      external_code: "",
      name: "",
      category: '',
      product_type: '',
      plated: "",
      status: true,
      model: '',
      value: "",
      new: true,
      date_validity_new: "",

      reference: "",
      weight: "",
      details: "",

      sizes_list: null,
      colors_list: null,

      min_quantity: 0,
      type_inventory: 'nenhum',

     
      images: new Map([
        [1, null],
        [2, null],
        [3, null],
        [4, null],
      ]),
    },
    validationSchema: value === 0 ? objectSchema1 : value === 1 ? objectSchema2 : value === 2 && objectSchema3,
    onSubmit: async (values) => {
      console.log(values);
      const data ={
        external_code: values.external_code,
        name: values.name,
        status: values.status,
        value: values.value,
        new: values.new,
        date_validity_new: values.new && values.date_validity_new,
        reference: values.reference,
        weight: values.weight,
        min_quantity: values.min_quantity,
        type_inventory: values.type_inventory === "nenhum" ? null : values.type_inventory,
        details: values.details,
        category: values.category,
        product_type: values.product_type,
        model: values.model,
        plated: values.plated,
        sizes_list: values.sizes_list && values.sizes_list,
        colors_list: values.colors_list && values.colors_list
      }
      setLoading(true);
      try {
        Api.post(`/product/`, data)
           .then((response) => {
             if (response.status === 201) {
              toast.success("Produto cadastrado com sucesso!");
              history.goBack();
             }
           })
           .catch((err) => {
             toast.error(err.response.data.message);
           });
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

  // get all data
  async function loadData() {
    try {
      const responseCategory = await Api.get("/category");
      const responseType = await Api.get("/type");
      const responsePlated = await Api.get("/plated");
      const responseModel = await Api.get("/model");
      
      if(responseCategory){
        setCategory(responseCategory.data)
      }
      if(responseType){
        setType(responseType.data)
      }

      if(responsePlated){
        setPlated(responsePlated.data)
      }

      if(responseModel){
        setModel(responseModel.data)
      }
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar dados do cliente"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
    { loading ? 
      <Loading /> : 
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
             flex:1
           }}
          >
            Cadastrar produto
          </Typography>
          <Box style={{ display: "flex" }}>
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
                backgroundColor: value === 2 ? "#21AB69": "#8C8C8C",
                color: "#FFF",
                marginLeft: "20px",
                borderRadius: "24px",
              }}
              type="submit"
              disabled={value !== 2}
              onClick={() => formik.handleSubmit()}
            >
              Cadastrar
            </Button>
          </Box>
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
              indicatorColor="transparent"
              textColor="secondary"
            >
              <Tab label="Produto" {...a11yProps(0)} />
              <Tab label="Característica" {...a11yProps(1)} />
              <Tab label="Estoque" {...a11yProps(2)} />
            
            </Tabs>
            <Divider />
          </Box>
          <TabPanel value={value} index={0} style={{ padding: "1rem 0rem" }}>
            <FormProduct
              formEl={formEl}
              value={value}
              formik={formik}
              loading={loading}

              category={category}
              type={type}
              model={model}
              plated={plated}

              handleChangeAvancar={(e)=> handleChange(e, 1)}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={1}
            style={{ padding: "1rem 0rem", width: "100%", margin: "0px" }}
          >
            <FormCharacter
              formEl={formEl}
              value={value}
              formik={formik}
              loading={loading}
              
              handleChangeAvancar={(e)=> handleChange(e,2)}
              handleChangeBack={(e)=> handleChange(e,0)}
            />
          </TabPanel>
          <TabPanel
            value={value}
            index={2}
            style={{ padding: "1rem 0rem", width: "100%", margin: "0px" }}
          >
            <FormStock
              formEl={formEl}
              value={value}
              formik={formik}
              loading={loading}

              handleChangeBack={(e)=> handleChange(e, 1)}   
            />
          </TabPanel>
        </ContentBody>
      </Container>
    }
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

export default NewProduct;
