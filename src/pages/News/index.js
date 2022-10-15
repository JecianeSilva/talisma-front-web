import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  Box,
  Tabs,
  Tab,
  IconButton,
  TextField,
  InputAdornment,
  Divider,
  Button,
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
import Status from "../../components/Table/Status";
import InputSearch from "../../components/Search";
import { formattedDate, getDate } from "../../utils";

function News() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [loading, setLoading] = useState(true);
  const [activeButton, setActiveButton] = useState(true);
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
      title: "Valor",
      field: "value",
      cellStyle: {
        whiteSpace: "nowrap",
      }, 
      render: (rowData) => `R$ ${rowData.value},00`,
    },
    {
      title: "Data final",
      field: "date_validity_new",
      cellStyle: {
        whiteSpace: "nowrap",
      },
      render: (rowData) => formattedDate(rowData.date_validity_new)
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => <Status value={rowData.status} />,
    },
  ];

  // get list news
  async function loadData() {
    try {
      const { data } = await Api.get("/product");
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
                marginRight: "24px",
              }}
            >
              Novidades
            </Typography>

            <InputSearch />
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
              style={{
                padding: "0px",
                width: "100%",
              }}
            >
              <Box
                p={1}
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
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
                <Button
                  variant="contained"
                  size="large"
                  style={{
                    backgroundColor: !activeButton ? "#F35457" : "#cecece",
                    color: "#FFF",
                    marginLeft: "20px",
                    borderRadius: "24px",
                  }}
                  disabled={activeButton}
                  onClick={() => {
                    loadData();
                    setActiveButton(true);
                    toast.success("Produto removido com sucesso!");
                  }}
                >
                  Remover produtos selecionados
                </Button>
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
                activeButton={() => setActiveButton(false)}
                disabledButton={() => setActiveButton(true)}
                onDelete
                style={{
                  boxShadow: "none",
                }}
              />
            </TabPanel>

            <TabPanel
              value={value}
              index={1}
              style={{ padding: "0px", width: "100%" }}
            >
              <Box p={1}>
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

                <Box
                  style={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <TextField
                    name="search"
                    variant="outlined"  
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder={"Pesquisar"}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          <IconButton
                            onClick={(e) => setSearch(e.target.value)}
                          >
                            <Search />
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                    style={{ borderRadius: "100%" }}
                  />
                  <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{
                      // backgroundColor: !activeButton ? "#21AB69" : "#cecece",
                      color: "#FFF",
                      marginLeft: "20px",
                      borderRadius: "24px",
                    }}
                    disabled={activeButton}
                    onClick={() => {
                      loadData();
                      setActiveButton(true);
                      toast.success("Produto adicionado com sucesso!");
                    }}
                  >
                    Adicionar produtos marcados
                  </Button>
                </Box>
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
                activeButton={() => setActiveButton(false)}
                disabledButton={() => setActiveButton(true)}
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
