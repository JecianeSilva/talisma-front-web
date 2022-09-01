import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Api from "../../config/api";

import Loading from "../../components/Loading";

import history from "../../config/history";

import { Container, ContentHeader } from "./styles";
import Input from "../../components/Input";
import Table from "../../components/Table";

function Clients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState();
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
        return rowData.phone && rowData.phone.length < 11 ? (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="(##) ####-####"
          />
        ) : (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="(##) # ####-####"
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
        return rowData.whatsapp && rowData.whatsapp.length < 11 ? (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="(##) ####-####"
          />
        ) : (
          <NumberFormat
            value={rowData.phone}
            displayType={"text"}
            format="(##) # ####-####"
          />
        );
      },
    },
    {
      title: "Nascimento",
      field: "datebirthday",
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
      render: (rowData) => rowData.status,
    },
  ];

  // get list users
  async function loadDataUsers() {
    try {
      const { data } = await Api.get("/user");
      // const _infos = headers["content-range"].split("/");
      // const count = _infos[_infos.length - 1].split("-")[1];
      // setCount(count);
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
        <Loading size={3} color="#70163A" />
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
              id="search"
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
            <div
              style={{ display: "flex", flex: 1, justifyContent: "flex-end" }}
            >
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#70163A",
                  color: "#FFF",
                  borderRadius: "24px",
                }}
                onClick={() => history.push("/clientes/novo-cliente")}
              >
                Adicionar
              </Button>
            </div>
          </ContentHeader>
          <Table
            pathname="clientes"
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
