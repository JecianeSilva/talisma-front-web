import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  Typography,
  Box,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";

import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentHeader } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Status from "../../components/Table/Status";
import InputSearch from "../../components/Search";

function TypesProduct() {
  const [loading, setLoading] = useState(true);
  const [typesProduct, setTypesProduct] = useState([]);

  const columnsTable = [
    {
      title: "ID",
      field: "id",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 100,
        width: 100,
      },
    },
    {
      title: "Descrição",
      field: "description",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 250,
      },
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => <Status value={rowData.status} activeStatus={()=> updateStatus(rowData.id, true)} disabledStatus={()=> updateStatus(rowData.id, false)}/>,
    },
  ];

  
  function updateStatus(id, status) {
    const data = {
      status: status,
    };
    try {
       Api.patch(`/type/${id}`, data).then((response) => {
          if (response.status === 200) {
            toast.success("Status alterado com sucesso!");
            loadData()
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

  async function loadData() {
    try {
      const { data } = await Api.get("/type");
      setTypesProduct(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar os tipos de produto"
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
              Tipos de produto
            </Typography>

            <InputSearch />
            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                handleOnClick={() => history.push("/produto/tipos/novo-tipo")}
                title="Adicionar"
                padding="0.4rem"
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Table
            pathname="tipos"
            pathname2="tipo"
            title="Tipos de produto"
            perPage={10}
            columns={columnsTable}
            data={typesProduct}
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default TypesProduct;
