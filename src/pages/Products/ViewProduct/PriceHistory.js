import React, { useState, useEffect, forwardRef } from "react";
import { toast } from "react-toastify";
import "react-phone-input-2/lib/style.css";
import Loading from "../../../components/Loading";

import { VisibilityOutlined } from "@material-ui/icons";
import { localization } from "../../../utils/location-ptBr";
import { Box } from "@material-ui/core";
import Status from "../../../components/Table/Status";
import Table from "../../../components/Table";
function PriceHistory({ id }) {
  const [loading, setLoading] = useState(true);
  const [cardVirtual, setCardVirtual] = useState();

  const columnsTable = [
    {
      title: "Operação",
      field: "operation",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      title: "Data",
      field: "date",
      cellStyle: {
        whiteSpace: "nowrap",
        maxWidth: 150,
      },
    },
    {
      title: "Novo valor",
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
        maxWidth: 150,
      },
    },
  ];

  // get list
  async function loadData() {
    try {
      // const { data } = await Api.get(`/user/${id}`);
      const data = [
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },

        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
        {
          operation: "Lorem ipsum",
          date: "00/00/2022",
          price: "R$ 0,00",
        },
      ];
      setCardVirtual(data);
    } catch (err) {
      toast(
        "error",
        "Erro",
        err?.response.data?.message ||
          "Não foi possível carregar o histórico de pedidos"
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
          <Table
            columns={columnsTable}
            data={cardVirtual}
            hideActions
            style={{ boxShadow: "none" }}
          />
        </>
      )}
    </>
  );
}

export default PriceHistory;
