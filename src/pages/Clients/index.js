import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  Box,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentHeader } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Button from "../../components/Button";

function Clients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState([]);

  const columnsTable = [
    {
      title: "Nome",
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Classificação",
      field: "type",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Email",
      field: "email",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Telefone",
      field: "phone",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
      render: (rowData) => {
        return rowData.phone &&
          rowData.phone.replace(/[^0-9]+/g, "").length < 13 ? (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="+##(##) ####-####"
          />
        ) : (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="+##(##) #####-####"
          />
        );
      },
    },
    {
      title: "WhatsApp",
      field: "whatsapp",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
      render: (rowData) => {
        return rowData.whatsapp && rowData.whatsapp.length < 16 ? (
          <NumberFormat
            value={rowData.whatsapp}
            displayType={"text"}
            format="+##(##) ####-####"
          />
        ) : (
          <NumberFormat
            value={rowData.whatsapp}
            displayType={"text"}
            format="+##(##) #####-####"
          />
        );
      },
    },
    {
      title: "Nascimento",
      field: "birthday",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
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

  // get list users
  async function loadDataUsers() {
    try {
      const { data } = await Api.get("/user");
      setUsers(data);
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
    loadDataUsers();
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
              Clientes
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
            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                title="Adicionar"
                padding="0.5rem"
                handleOnClick={() => history.push("/clientes/novo-cliente")}
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Table
            pathname="clientes"
            pathname2="clientes"
            title="Clientes"
            perPage={10}
            columns={columnsTable}
            data={users}
            selectable
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Clients;
