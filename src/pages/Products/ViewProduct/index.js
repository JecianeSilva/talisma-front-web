import React, { useState, useEffect } from "react";
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

import Loading from "../../../components/Loading";

import history from "../../../config/history";

import { Container, ContentBody, ContentHeader } from "../styles";
import { useParams } from "react-router-dom";
import FormProduct from "./FormProduct";
import FormCharacter from "./FormCharacter";
import FormStock from "./FormStock";
import ProcuctStepper from "../../../components/ProductStepper";

function EditClient() {
  const params = useParams();

  const { id } = params;
  const [value, setValue] = useState(0);
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(true);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // get list product
  async function loadDataUser() {
    try {
      const data = {
        id: "000000000",
        ref: "00000000",
        peso: "0,5 kg",
        details: "Detalhes do produto",
        name: "Nome do produto",
        categories: 1,
        minStock: "1.000",
        stockInitial: "1.000",
        controlStock: 1,
        type: 1,
        banho: 1,
        model: 1,
        price: 0.0,
        isNew: true,
        colors: [
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
        ],
        tamanhos: [
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
        ],
        dateLimit: "2022-09-20",
        // stck: "Cor",
        quantity: "100",
        status: 0,
        image:
          "blob:http://localhost:3000/32235cd3-075c-4ca1-825c-00c0b8940c5c",
      };
      // const { data } = await Api.get(`/product/${id}`);
      setProduct(data);
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
    loadDataUser();
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
            Produto
          </Typography>

          <div style={{ display: "flex" }}>
            <Button
              variant="contained"
              size="large"
              style={{
                backgroundColor: "#C14979",
                color: "#FFF",
                marginLeft: "20px",
                borderRadius: "24px",
              }}
              onClick={() => history.push(`/produtos/editar-produtos/${id}`)}
            >
              Editar
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
                {/* <ProcuctStepper
                  steps={["Produto", "Característica", "Estoque"]}
                  activeStep={value}
                /> */}
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
                value={value}
                data={product}
                loading={loading}
              />
            </TabPanel>
            <TabPanel
              value={value}
              index={1}
              style={{ padding: "1rem 0px", width: "100%", margin: "0px" }}
            >
              <FormCharacter
                id={id}
                value={value}
                data={product}
                loading={loading}
              />
            </TabPanel>
            <TabPanel
              value={value}
              index={2}
              style={{ padding: "1rem 0px", width: "100%", margin: "0px" }}
            >
              <FormStock
                id={id}
                value={value}
                data={product}
                loading={loading}
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

export default EditClient;
