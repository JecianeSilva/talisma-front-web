import React, { forwardRef } from "react";

import { Box, Typography, Button, TextField, Grid } from "@material-ui/core";
import { Clear } from "@material-ui/icons";
import Loading from "../../../components/Loading";

import MaterialTable from "material-table";
import { localization } from "../../../utils/location-ptBr";
import Status from "../../../components/Table/Status";

function FormCharacter({ id, data, value, loading }) {
  const colorTableColumn = [
    {
      title: "Descrição",
      field: "reference",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "description",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },

    {
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => <Status value={rowData.status} disabled />,
    },
  ];

  const tamTableColumn = [
    {
      title: "Descrição",
      field: "reference",
      cellStyle: {
        whiteSpace: "nowrap",
      },
    },
    {
      field: "description",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },
    {
      field: "price",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 150,
      },
    },

    {
      field: "status",
      cellStyle: {
        whiteSpace: "nowrap",
        minWidth: 140,
      },
      render: (rowData) => <Status value={rowData.status} disabled />,
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form noValidate autoComplete={"off"}>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Características do produto
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Referência*</Typography>
                <TextField
                  required
                  size="small"
                  id="reference"
                  name="reference"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.reference}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Peso*</Typography>
                <TextField
                  required
                  size="small"
                  id="peso"
                  name="peso"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.peso}
                  disabled
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} sm={6}>
                <Typography>Detalhes*</Typography>
                <TextField
                  required
                  size="small"
                  id="details"
                  name="details"
                  placeholder="Detalhes do produto"
                  variant="outlined"
                  autoComplete="text"
                  value={data?.details}
                  disabled
                  fullWidth
                />
              </Grid>
            </Grid>
          </Box>
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Cores
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={6}>
                  <Typography>Descrição</Typography>
                  <TextField
                    required
                    size="small"
                    id="colorDescription"
                    name="colorDescription"
                    placeholder="Descrição da cor"
                    variant="outlined"
                    autoComplete="text"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sm={6}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#cecece",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    disabled
                  >
                    Adicionar
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sm={6}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#cecece",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    disabled
                  >
                    Remover cores selecionadas
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <MaterialTable
              columns={colorTableColumn}
              data={data?.colors}
              style={{ width: "100%" }}
              options={{
                paging: false,
                search: false,
                selection: true,
                toolbar: false,
                headerStyle: { color: "#4F4F4F", fontWeight: "bold" },
                rowStyle: { color: "#8C8C8C" },
                actionsColumnIndex: -1,
              }}
              localization={localization}
              actions={[
                {
                  icon: forwardRef((props, ref) => (
                    <Clear {...props} ref={ref} color="disabled" />
                  )),
                  tooltip: "Limpar",
                  position: "row",
                },
              ]}
            />
          </Box>

          <Typography
           variant="h2"
           color="secondary"
           style={{ fontWeight: "bold", marginBottom: "20px" }}
          >
            Tamanho
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={6}>
                  <Typography>Descrição</Typography>
                  <TextField
                    required
                    size="small"
                    id="tamDescription"
                    name="tamDescription"
                    placeholder="Descrição da cor"
                    variant="outlined"
                    autoComplete="text"
                    disabled
                    fullWidth
                  />
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={3}
                  sm={6}
                  style={{ display: "flex", alignItems: "flex-end" }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#cecece",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    disabled
                  >
                    Adicionar
                  </Button>
                </Grid>
                <Grid
                  item
                  xs={12}
                  md={6}
                  sm={6}
                  style={{
                    display: "flex",
                    alignItems: "flex-end",
                    justifyContent: "flex-end",
                  }}
                >
                  <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#cecece",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    disabled
                  >
                    Remover tamanhos selecionados
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <MaterialTable
              columns={tamTableColumn}
              data={data?.tamanhos}
              style={{ width: "100%" }}
              options={{
                paging: false,
                search: false,
                selection: true,
                toolbar: false,
                headerStyle: { color: "#4F4F4F", fontWeight: "bold" },
                rowStyle: { color: "#8C8C8C" },
                actionsColumnIndex: -1,
              }}
              localization={localization}
              actions={[
                {
                  icon: forwardRef((props, ref) => (
                    <Clear {...props} ref={ref} color="disabled" />
                  )),
                  tooltip: "Limpar",
                  position: "row",
                },
              ]}
            />
          </Box>
        </form>
      )}
    </>
  );
}
export default FormCharacter;
