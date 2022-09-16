import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import {
  Typography,
  Button,
  InputAdornment,
  IconButton,
  TextField,
  Divider,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Api from "../../config/api";

import Loading from "../../components/Loading";

import history from "../../config/history";

import { Container, ContentHeader } from "./styles";
import Input from "../../components/Input";
import Table from "../../components/Table";

function TypeClients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState();
  const [userTypes, setUserTypes] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Descrição",
      field: "description",
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

  // get list users
  async function loadDataUserTypes() {
    try {
      const { data } = await Api.get("/userType");
      // const _infos = headers["content-range"].split("/");
      // const count = _infos[_infos.length - 1].split("-")[1];
      // setCount(count);
      setUserTypes(data);
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
              Tipos de clientes
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
                onClick={() => history.push("/tipos-cliente/novo-tipo")}
              >
                Adicionar
              </Button>
            </div>
          </ContentHeader>
          <Table
            pathname="tipos-cliente"
            pathname2="tipo"
            title="Tipos de cliente"
            perPage={10}
            columns={columnsTable}
            data={userTypes}
            selectable
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default TypeClients;
