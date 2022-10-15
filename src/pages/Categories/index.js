import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
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
import Status from "../../components/Table/Status";
import InputSearch from "../../components/Search";

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
        minWidth: 130,
      },
      render: (rowData) => <Status value={rowData.status}  activeStatus={()=> updateStatus(rowData.id, true)} disabledStatus={()=> updateStatus(rowData.id, false)} />,
    },
  ];

  function updateStatus(id, status) {
    const data = {
      status: status,
    };
    try {
       Api.patch(`/category/${id}`, data).then((response) => {
          if (response.status === 200) {
            toast.success("Status da categoria alterada com sucesso!");
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



  // get list categories
  async function loadData() {
    try {
      const { data } = await Api.get("/category");
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
                marginRight: "24px",
              }}
            >
              Categorias
            </Typography>

            <InputSearch />
            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                handleOnClick={() =>
                  history.push("/produto/categorias/nova-categoria")
                }
                title="Adicionar"
                padding="0.4rem"
                style={{ maxWidth: "9rem" }}
              />
            </Box>
          </ContentHeader>
          <Table
            pathname="categorias"
            pathname2="categoria"
            perPage={10}
            columns={columnsTable}
            data={categories}
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Categories;
