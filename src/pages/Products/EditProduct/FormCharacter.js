import React, { useState, forwardRef } from "react";
import { toast } from "react-toastify";

import { Box, Typography, Button, TextField, Grid } from "@material-ui/core";
import { Clear } from "@material-ui/icons";

import Loading from "../../../components/Loading";

import MaterialTable from "material-table";
import { localization } from "../../../utils/location-ptBr";
import Status from "../../../components/Table/Status";

function FormCharacter({ id, formEl, formik, loading }) {
  const [color, setColor] = useState();
  const [tamanho, setTamanho] = useState();

  const [activeButton, setActiveButton] = useState(true);
  const [activeButtonTam, setActiveButtonTam] = useState(true);
  const [disableActionIcon, setDisableActionIcon] = useState(false);
  const [disableActionIconTam, setDisableActionIconTam] = useState(false);

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
      render: (rowData) => <Status value={rowData.status} />,
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
      render: (rowData) => <Status value={rowData.status} />,
    },
  ];

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <form ref={formEl} noValidate autoComplete={"off"}>
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
                  value={formik.values.reference}
                  onChange={formik.handleChange}
                  error={formik.touched.reference && Boolean(formik.errors.reference)}
                  helperText={formik.touched.reference && formik.errors.reference}
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
                  value={formik.values.peso}
                  onChange={formik.handleChange}
                  error={formik.touched.peso && Boolean(formik.errors.peso)}
                  helperText={formik.touched.peso && formik.errors.peso}
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
                  value={formik.values.details}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.details && Boolean(formik.errors.details)
                  }
                  helperText={formik.touched.details && formik.errors.details}
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
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
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
                      backgroundColor: "#21AB69",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    // disabled={value !== 0}
                    onClick={() => {
                      if (color) {
                        formik.setFieldValue("color", [
                          ...formik.values.color,
                          {
                            reference: "000000",
                            description: color,
                            price: "100",
                            status: 0,
                          },
                        ]);
                        setColor("");
                      } else {
                        toast.error("Campo inválido");
                      }
                    }}
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
                      backgroundColor: !activeButton ? "#F35457" : "#cecece",
                      color: "#FFF",
                      marginLeft: "20px",
                      borderRadius: "24px",
                    }}
                    disabled={activeButton}
                    onClick={() => {
                      setActiveButton(true);
                      formik.setFieldValue("color", []);

                      toast.success("Cores removidas com sucesso!");
                    }}
                  >
                    Remover cores selecionadas
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <MaterialTable
              columns={colorTableColumn}
              data={formik.values.color}
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
              onSelectionChange={(rows) => {
                if (rows.length > 1) {
                  setDisableActionIcon(true);
                  setActiveButton(false);
                } else {
                  setDisableActionIcon(false);
                  setActiveButton(true);
                }
              }}
              actions={[
                {
                  icon: forwardRef((props, ref) => (
                    <Clear {...props} ref={ref} className={"clear"} />
                  )),
                  tooltip: "Limpar",
                  position: "row",
                  onClick: (event, rowData) => {
                    const temp = formik.values.color.filter((item) => {
                      return item.reference !== rowData.reference;
                    });

                    formik.setFieldValue("color", temp);
                  },
                  disabled: disableActionIcon,
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
                    placeholder="Descrição do tamanho"
                    variant="outlined"
                    autoComplete="text"
                    value={tamanho}
                    onChange={(e) => setTamanho(e.target.value)}
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
                      backgroundColor: "#21AB69",
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    // disabled={value !== 0}
                    onClick={() => {
                      if (tamanho) {
                        formik.setFieldValue("tamanho", [
                          ...formik.value.tamanho,
                          {
                            reference: "000000",
                            description: tamanho,
                            price: "100",
                            status: 0,
                          },
                        ]);
                        setTamanho("");
                      } else {
                        toast.error("Campo inválido");
                      }
                    }}
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
                      backgroundColor: !activeButtonTam ? "#F35457" : "#cecece",
                      color: "#FFF",
                      marginLeft: "20px",
                      borderRadius: "24px",
                    }}
                    disabled={activeButtonTam}
                    onClick={() => {
                      setActiveButtonTam(true);
                      formik.setFieldValue("tamanho", []);

                      toast.success("Tamanho removido com sucesso!");
                    }}
                  >
                    Remover tamanhos selecionados
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <MaterialTable
              columns={tamTableColumn}
              data={formik.values.tamanho}
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
              onSelectionChange={(rows) => {
                if (rows.length > 1) {
                  setDisableActionIconTam(true);
                  setActiveButtonTam(false);
                } else {
                  setDisableActionIconTam(false);
                  setActiveButtonTam(true);
                }
              }}
              actions={[
                {
                  icon: forwardRef((props, ref) => (
                    <Clear {...props} ref={ref} className={"clear"} />
                  )),
                  tooltip: "Limpar",
                  position: "row",
                  onClick: (event, rowData) => {
                    const temp = formik.values.tamanho.filter((item) => {
                      return item.reference !== rowData.reference;
                    });

                    formik.setFieldValue("tamanho", temp);
                  },
                  disabled: disableActionIconTam,
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
