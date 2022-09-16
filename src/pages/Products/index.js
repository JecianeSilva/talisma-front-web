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

function Clients() {
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  // const [count, setCount] = useState();
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
      // const _infos = headers["content-range"].split("/");
      // const count = _infos[_infos.length - 1].split("-")[1];
      // setCount(count);

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
              Produtos
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
                onClick={() => history.push("/produtos/novo-produto")}
              >
                Adicionar
              </Button>
            </div>
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

export default Clients;
