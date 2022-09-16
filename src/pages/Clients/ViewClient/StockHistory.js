import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";

import NumberFormat from "react-number-format";
import MaterialTable from "material-table";
import history from "../../../config/history";
import Visibility from "@material-ui/icons/Visibility";
import { VisibilityOutlined } from "@material-ui/icons";
import { localization } from "../../../utils/location-ptBr";
import { Box } from "@material-ui/core";

function StockHistory({ id }) {
  const [loading, setLoading] = useState(true);
  const [cardVirtual, setCardVirtual] = useState();

  const columnsTable = [
    {
      title: "Número",
      field: "number",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Data",
      field: "date",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Hora",
      field: "hour",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Forma de pagamento",
      field: "paymentForm",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Valor total",
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Tipo de frete",
      field: "type",
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

  // get list
  async function loadData() {
    try {
      // const { data } = await Api.get(`/user/${id}`);
      const data = [
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
        {
          number: "00000000",
          date: "00/00/2022",
          hour: "10:52",
          paymentForm: "Cartão de crédito",
          price: "R$ 1.000,00",
          type: "Grátis",
          status: "Entregue",
        },
      ];
      setCardVirtual(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os usuários"
      );
    } finally {
      setLoading();
    }
  }

  useEffect(() => {
    loadData();
  }, [id]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <Box></Box>
          <MaterialTable
            title="Histórico de pedidos"
            columns={columnsTable}
            data={cardVirtual}
            style={{ width: "100%" }}
            options={{
              paging: false,
              search: false,
              headerStyle: { color: "#4F4F4F", fontWeight: "bold" },
              rowStyle: { color: "#8C8C8C" },
              actionsColumnIndex: -1,
            }}
            localization={localization}
            actions={[
              {
                icon: forwardRef((props, ref) => (
                  <VisibilityOutlined {...props} ref={ref} color="action" />
                )),
                tooltip: "View",
                position: "row",
                onClick: (event, rowData) => {
                  event.preventDefault();
                },
              },
            ]}
            components={{
              Toolbar: (props) => (
                <>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      padding: "6px 1rem",
                    }}
                  >
                    <div
                      style={{
                        width: "13rem",
                        fontSize: "1rem",
                        color: "#D68E70",
                        fontWeight: "bold",
                      }}
                    >
                      {props.title}
                    </div>
                  </div>
                </>
              ),
            }}
          />
        </>
      )}
    </>
  );
}

export default StockHistory;
