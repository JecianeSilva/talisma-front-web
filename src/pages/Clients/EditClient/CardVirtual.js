import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";

import NumberFormat from "react-number-format";
import MaterialTable from "material-table";
import Status from "../../../components/Table/Status";

function CardVirtual({ id }) {
  const [loading, setLoading] = useState(true);
  const [cardVirtual, setCardVirtual] = useState();

  const columnsTable = [
    {
      title: "Nome",
      field: "name",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Tipo",
      field: "type",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      title: "Número",
      field: "number",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
      render: (rowData) => {
        return (
          rowData.number && (
            <NumberFormat
              value={rowData.number}
              displayType={"text"}
              format="**** **** **** *###"
            />
          )
        );
      },
    },
    {
      title: "Bandeira",
      field: "bandeira",
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
      render: (rowData) => <Status value={rowData.status} disabled />,
    },
  ];

  // get list
  async function loadData() {
    try {
      // const { data } = await Api.get(`/user/${id}`);
      const data = [
        {
          name: "Lorem ipsum",
          type: "Crédito",
          numer: "000",
          bandeira: "Mastercard",
          status: 0,
        },
        {
          name: "Lorem ipsum",
          type: "Crédito",
          numer: "000",
          bandeira: "Mastercard",
          status: 0,
        },
        {
          name: "Lorem ipsum",
          type: "Crédito",
          numer: "000",
          bandeira: "Mastercard",
          status: 0,
        },
      ];
      setCardVirtual(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message || "Não foi possível carregar os dados"
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
          <MaterialTable
            title="Cartões cadastrados"
            columns={columnsTable}
            data={cardVirtual}
            hideActions
            style={{ width: "100%" }}
            options={{
              paging: false,
              search: false,
              headerStyle: { color: "#4F4F4F", fontWeight: "bold" },
              rowStyle: { color: "#8C8C8C" },
            }}
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

export default CardVirtual;
