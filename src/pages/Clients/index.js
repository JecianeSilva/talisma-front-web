import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { Typography, Box } from "@material-ui/core";

import Api from "../../config/api";
import history from "../../config/history";

import { Container, ContentHeader } from "./styles";

import Loading from "../../components/Loading";
import Table from "../../components/Table";
import Button from "../../components/Button";
import Status from "../../components/Table/Status";
import { formattedDate } from "../../utils";
import InputSearch from "../../components/Search";

function Clients() {
  const [loading, setLoading] = useState(true);
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
      render: (rowData) => (rowData.type ? "Categoria 1" : "Categoria 1"),
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
      render: (rowData) => {
        return formattedDate(rowData.birthday);
      },
    },
    {
      title: "Status",
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => <Status value={rowData.status} activeStatus={() => updateStatus(rowData.id, 0)} disabledStatus={()=>updateStatus(rowData.id, 1)} />,
    },
  ];

  // update Status
  function updateStatus(id, status) {
    const data = {
      status: status,
    };
    try {
       Api.patch(`/user/${id}`, data).then((response) => {
          if (response.status === 200) {
            toast.success("Status do cliente alterado com sucesso!");
            loadDataUsers()
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

  // get list users
  async function loadDataUsers() {
    try {
      const { data } = await Api.get("/user");
      setUsers(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar dados do cliente"
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
                marginRight: "24px",
              }}
            >
              Clientes
            </Typography>

            <InputSearch />
            <Box display={"flex"} flex={1} justifyContent={"flex-end"}>
              <Button
                title="Adicionar"
                padding="0.4rem"
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
            hideDeleteAction
          />
        </Container>
      )}
    </>
  );
}

export default Clients;
