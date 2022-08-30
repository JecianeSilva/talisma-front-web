import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import NumberFormat from "react-number-format";
import { Typography, Button } from "@material-ui/core";
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
      render: (rowData) => rowData.status,
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
              variant="h3"
              style={{
                color: "#656263",
                marginRight: "40px",
                marginBottom: "16px",
                fontSize: "35px",
                lineheight: "43px",
              }}
            >
              Tipos de clientes
            </Typography>
            <Input
              style={{
                width: "600px",
                backgroundColor: "#fff",
                border: "1px solid #cecece",
                borderRadius: "24px",
                padding: "11px 10px",
                gap: "10px",
                height: "48px",
                boxShadow: "0px 0px 16px rgba(0,0,0,0.03)",
              }}
              placeholder={"Pesquisar"}
              icon={Search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <div style={{ display: "flex", flex: 1 }}>
              <Button
                variant="contained"
                size="large"
                style={{
                  backgroundColor: "#70163A",
                  color: "#FFF",
                  marginBottom: "16px",
                  borderRadius: "24px",
                }}
                onClick={() => history.push("/clientes/novo-tipo")}
              >
                Adicionar
              </Button>
            </div>
          </ContentHeader>
          {/* <Table
            pathname="cliente"
            perPage={10}
            columns={columnsTable}
            data={userTypes}
            selectable
            hideDeleteAction
          /> */}
        </Container>
      )}
    </>
  );
}

export default TypeClients;
