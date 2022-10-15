import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Box, Typography } from "@material-ui/core";

import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentHeader, Title } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Status from "../../components/Table/Status";
import InputSearch from "../../components/Search";

function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 100,
      },
    },
    {
      title: "Referência",
      field: "reference",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 100,
      },
    },
    {
      title: "Nome",
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
   
    {
      title: "Valor atual",
      field: "value",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 120,
      },
      render: (rowData) => `R$ ${rowData.value},00`,
    },
    {
      title: "Qnt em estoque",
      field: "min_quantity",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 130,
      },
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 120,
      },
      render: (rowData) => <Status value={rowData.status} activeStatus={()=> updateStatus(rowData.id, true)} disabledStatus={()=> updateStatus(rowData.id, false)}/>,

    },
  ];

  // get list products
  async function loadDataProducts() {
    try {
      const { data } = await Api.get("/product");
      setProducts(data);
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
    loadDataProducts();
  }, []);

  
  
  function updateStatus(id, status) {
    const data = {
      status: status,
    };
    try {
       Api.patch(`/product/${id}`, data).then((response) => {
          if (response.status === 200) {
            toast.success("Status alterado com sucesso!");
            loadDataProducts()
          }
       })
       .catch((err) => {
         toast.error(err.response.data.message);
       });
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Error no sistema! Tente novamente mais tarde.");
      }
    } finally {
      setLoading(false);
    }
  }

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
              Produtos
            </Typography>

            <InputSearch />

            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                title="Adicionar"
                padding="0.4rem"
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
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Products;
