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

function Categories() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
        width: 100,
      },
    },
    {
      title: "Descrição",
      field: "description",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 300,
      },
    },
    {
      title: "Ordem",
      field: "order",
      cellStyle: {
        whiteSpace: "nowrap",
        width: 100,
      },
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        width: 100,
      },
      render: (rowData) => (rowData.status === 0 ? "Ativo" : "Inativo"),
    },
  ];

  // get list categories
  async function loadData() {
    try {
      // const { data } = await Api.get("/categories");
      const data = [
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
        {
          id: "00000000",
          description: "Lorem ipsum",
          order: 1,
          status: 0,
        },
      ];
      setCategories(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar as categorias"
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
              Categorias
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
                handleOnClick={() =>
                  history.push("/produto/categorias/nova-categoria")
                }
                title="Adicionar"
                padding="0.5rem"
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Table
            pathname="produto"
            pathname2="categorias"
            perPage={10}
            columns={columnsTable}
            data={categories}
            selectable
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Categories;
