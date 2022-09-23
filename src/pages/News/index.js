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

function TypeClients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
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

  // get list userTypes
  async function loadDataUserTypes() {
    try {
      const { data } = await Api.get("/userType");
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
              Tipos de clientes
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
                handleOnClick={() => history.push("/tipos-cliente/novo-tipo")}
                title="Adicionar"
                padding="0.5rem"
                style={{ maxWidth: "9rem" }}
              />
            </Box>
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
