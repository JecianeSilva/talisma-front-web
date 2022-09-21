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

function Products() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [products, setProducts] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Referência",
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
      field: "type",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Valor atual",
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },

    {
      title: "Estoque por",
      field: "stock",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Qnt em estoque",
      field: "quantity",
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

  // get list products
  async function loadDataProducts() {
    try {
      // const { data } = await Api.get("/product");
      const data = [
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
        {
          id: "000000000",
          ref: "000000000",
          name: "Lorem ipsum",
          type: "Brincos",
          price: "R$ 0,00",
          stck: "Cor",
          quantity: "100",
          status: 0,
        },
      ];
      setProducts(data);
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
    loadDataProducts();
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
              Produtos
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
                handleOnClick={() => history.push("/produtos/novo-produto")}
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Table
            pathname="produtos"
            pathname2="produtos"
            perPage={10}
            columns={columnsTable}
            data={products}
            selectable
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Products;
