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
  TextField,
  InputAdornment,
  Divider,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import PropTypes from "prop-types";
import Api from "../../config/api";
import history from "../../config/history";

import { useFormik } from "formik";
import * as Yup from "yup";

import { Container, ContentBody, ContentHeader } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import { useParams } from "react-router-dom";

function News() {
  const params = useParams();
  const formEl = useRef(null);

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [news, setNews] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Nome",
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Categoria",
      field: "categorie",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Tipo",
      field: "type",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Valor",
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Data final",
      field: "dateFinal",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => (rowData.status === 0 ? "Ativo" : "Inativo"),
    },
  ];

  // get list news
  async function loadData() {
    try {
      // const { data } = await Api.get("/news");
      const data = [
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
        {
          id: "00000000",
          name: "Lorem ipsum",
          categorie: "Brincos",
          type: "Argola",
          price: "R$ 0,00",
          dateFinal: "00/00/0000",
          status: 0,
        },
      ];
      setNews(data);
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
  }, []);

  return (
    <>
      {loading ? (
        <Loading fullScreen />
      ) : (
        <Container>
          <ContentHeader>
            <Typography
              variant="h1"
              style={{
                color: "#656263",
                marginRight: "40px",
              }}
            >
              Novidades
            </Typography>

            <TextField
              name="search"
              variant="outlined"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={"Pesquisar"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <IconButton onClick={(e) => setSearch(e.target.value)}>
                      <Search />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
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
                <Tab label="Produtos adicionados" {...a11yProps(0)} />
                <Tab label="Adicionar produtos" {...a11yProps(1)} />
              </Tabs>
              <Divider />
            </Box>

            <TabPanel
              value={value}
              index={0}
              style={{ padding: "0px", width: "100%" }}
            >
              <Box p={2}>
                <TextField
                  name="search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={"Pesquisar"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={(e) => setSearch(e.target.value)}>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  style={{ borderRadius: "100%" }}
                />
              </Box>
              <Table
                perPage={10}
                pathname="produtos"
                columns={columnsTable}
                data={news}
                selectable
                handleDelete={() => {
                  toast.success("Produto removido com sucesso!");
                }}
                onDelete
                style={{
                  width: "100%",
                  height: "100%",
                  boxShadow: "none",
                }}
              />
            </TabPanel>

            <TabPanel
              value={value}
              index={1}
              style={{ padding: "0px", width: "100%" }}
            >
              <Box p={2}>
                <div
                  style={{
                    width: "13rem",
                    fontSize: "16px",
                    padding: "10px 0px",
                    color: "#D68E70",
                    fontWeight: "bold",
                  }}
                >
                  Procurar produtos
                </div>
                <TextField
                  name="search"
                  variant="outlined"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={"Pesquisar"}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <IconButton onClick={(e) => setSearch(e.target.value)}>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  style={{ borderRadius: "100%" }}
                />
              </Box>
              <Table
                perPage={10}
                pathname="produtos"
                title={"Listar Produtos"}
                columns={columnsTable}
                data={news}
                selectable
                handlePlus={() => {
                  toast.success("Produto adicionado com sucesso!");
                }}
                hideDeleteAction
                onPlus
                plusAction
                style={{
                  width: "100%",
                  height: "100%",
                  boxShadow: "none",
                }}
              />
            </TabPanel>
          </ContentBody>
        </Container>
      )}
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
export default News;
