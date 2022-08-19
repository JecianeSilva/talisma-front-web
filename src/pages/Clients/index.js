import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "react-toastify";
import {
  Box,
  Typography,
  Button,
  IconButton,
  Divider,
} from "@material-ui/core";
import { ArrowBackIos, Search } from "@material-ui/icons";
import AddBox from "@material-ui/icons/AddBox";
import ArrowDownward from "@material-ui/icons/ArrowDownward";
import Check from "@material-ui/icons/Check";
import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";
import Clear from "@material-ui/icons/Clear";
import DeleteOutline from "@material-ui/icons/DeleteOutline";
import Edit from "@material-ui/icons/Edit";
import FilterList from "@material-ui/icons/FilterList";
import FirstPage from "@material-ui/icons/FirstPage";
import LastPage from "@material-ui/icons/LastPage";
import Remove from "@material-ui/icons/Remove";
import SaveAlt from "@material-ui/icons/SaveAlt";
import ViewColumn from "@material-ui/icons/ViewColumn";
import Visibility from "@material-ui/icons/Visibility";
import MaterialTable from "material-table";

// import api from "../../config/api";

import Loading from "../../components/Loading";

// import history from "../../config/history";

import { Container, ContentBody, ContentHeader } from "./styles";
import history from "../../config/history";
import Input from "../../components/Input";

function Clients() {
  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const tableIcons = {
    Add: forwardRef((props, ref) => <AddBox {...props} ref={ref} />),
    Check: forwardRef((props, ref) => <Check {...props} ref={ref} />),
    Clear: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Delete: forwardRef((props, ref) => (
      <DeleteOutline {...props} ref={ref} sx={{ color: "#F32424" }} />
    )),
    DetailPanel: forwardRef((props, ref) => (
      <ChevronRight {...props} ref={ref} />
    )),
    Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />),
    Export: forwardRef((props, ref) => <SaveAlt {...props} ref={ref} />),
    Filter: forwardRef((props, ref) => <FilterList {...props} ref={ref} />),
    FirstPage: forwardRef((props, ref) => <FirstPage {...props} ref={ref} />),
    LastPage: forwardRef((props, ref) => <LastPage {...props} ref={ref} />),
    NextPage: forwardRef((props, ref) => <ChevronRight {...props} ref={ref} />),
    PreviousPage: forwardRef((props, ref) => (
      <ChevronLeft {...props} ref={ref} />
    )),
    ResetSearch: forwardRef((props, ref) => <Clear {...props} ref={ref} />),
    Search: forwardRef((props, ref) => <Search {...props} ref={ref} />),
    SortArrow: forwardRef((props, ref) => (
      <ArrowDownward {...props} ref={ref} />
    )),
    ThirdStateCheck: forwardRef((props, ref) => (
      <Remove {...props} ref={ref} />
    )),
    ViewColumn: forwardRef((props, ref) => <ViewColumn {...props} ref={ref} />),
    View: forwardRef((props, ref) => <Visibility {...props} ref={ref} />),
  };

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
    },
    {
      title: "WhatsApp",
      field: "whatsapp",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Nascimento",
      field: "datebirthday",
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
      render: (rowData) => rowData.status,
    },
  ];

  const actionsTable = [
    {
      color: "#393939",
      tooltip: "Visualizar",
      onClick: (event, rowData) => {
        history.push(
          `/clientes/view-cliente/${rowData.idUser}/${rowData.category}`
        );
      },
    },
    {
      color: "#393939",
      tooltip: "Editar",
      onClick: (event, rowData) => {
        history.push(
          `/clientes/view-cliente/${rowData.idUser}/${rowData.category}`
        );
      },
    },
  ];

  // get list users
  async function getDataUsers() {
    try {
      console.log("teste");
      // const response = await api.get("/users");

      // if (response.status === 201) {
      //   const formattedData = response.data.map((item) => ({
      //     id: item.id,
      //     name: item.user.name,
      //     email: item.user.email,
      //   }));

      //   setUsers(formattedData);
      // }
    } catch (err) {
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataUsers();
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
              Clientes
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
                onClick={() => history.push("/clientes/novo-cliente")}
              >
                Adicionar
              </Button>
            </div>
          </ContentHeader>
          <MaterialTable
            title="Cliente"
            icons={tableIcons}
            columns={columnsTable}
            data={users}
            actions={actionsTable}
            style={{ width: "100%" }}
            options={{
              selection: true,
              showTitle: true,
              search: false,
              paging: false,
              tableLayout: "auto",
            }}
            localization={{
              pagination: {
                labelDisplayedRows: "",
              },
              toolbar: {
                nRowsSelected: "",
              },
              header: {
                actions: "Ações",
              },
              body: {
                emptyDataSourceMessage: "Nenhum dado encontrado",
              },
            }}
            components={{
              Toolbar: (props) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "10px",
                    }}
                  >
                    <div style={{ width: "13rem", color: "#D68E70" }}>
                      {props.title}
                    </div>

                    <Button
                      style={{ height: "fit-content", borderRadius: "24px" }}
                      variant="outlined"
                    >
                      Filtros
                    </Button>
                  </div>
                  <Divider />
                </>
              ),
            }}
          />
        </Container>
      )}
    </>
  );
}

export default Clients;
