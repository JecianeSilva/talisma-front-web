import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { Typography, Button, Box, TextField, Grid, InputAdornment } from "@material-ui/core";

import { Creators } from "../../../store/ducks/color";
import { store } from "../../../store";

import Loading from "../../../components/Loading";
import Status from "../../../components/Table/Status";
import Table from "../../../components/Table";

import { Container } from "./style";

function FormCharacter({ formEl, formik, loading, handleChangeBack, handleChangeAvancar }) {

  const dispatch = useDispatch();

  const [activeButton, setActiveButton] = useState(true);
  const [disableActionIcon, setDisableActionIcon] = useState(false);

  const [selectedColor, setSelectedColor] = useState();
  const [selectedSize, setSelectedSize] = useState();

  const [colorText, setColorText] = useState();
  const [sizeText, setSizeText] = useState();

  const [colorDate, setColorDate] = useState(store.getState().color.color)
  const [sizeDate, setSizeDate] = useState(store.getState().size.size)

  const colorTableColumn = [
    {
      title: "Descrição",
      field: "id",
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
      field: "tam",
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

  const sizeTableColumn = [
    {
      title: "Descrição",
      field: "id",
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
      field: "tam",
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

  function loadDate () {
    setColorDate(store.getState().color.color);
    setSizeDate(store.getState().size.size);
  }

  useEffect(() => {
    loadDate()
  },[]);

  return (
    <Container>
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
                  placeholder="000000"
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
                  id="weight"
                  name='weight'
                  variant="outlined"
                  value={formik.values.weight}
                  onChange={formik.handleChange}
                  error={formik.touched.weight && formik.errors.weight}
                  helperText={formik.touched.weight && formik.errors.weight}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">kg</InputAdornment>
                  }}
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
            style={{ fontWeight: "bold", margin: "20px 0px" }}
          >
            Cores
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%", marginBottom:'16px' }}>
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
                    value={colorText}
                    onChange={(e) => setColorText(e.target.value)}
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
                    onClick={() => {dispatch(Creators.addColor(colorText)); loadDate()}}
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
                      selectedColor.map((item) =>  dispatch(Creators.removeColor(item.id)));
                      loadDate();
                    }}
                  >
                    Remover cores selecionadas
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box style={{width:'100%'}}>
            <Table
              columns={colorTableColumn}
              data={colorDate}
              selectable={true}
              hideViewAction
              hideEditAction
              onDelete={!disableActionIcon}
              onSelectionChange={(rows) => {
                if (rows.length > 1) {
                  setSelectedColor(rows)
                  setDisableActionIcon(true);
                  setActiveButton(false);
                } else {
                  setDisableActionIcon(false);
                  setActiveButton(true);
                }
              }}
              handleDelete ={(value)=> {dispatch(Creators.removeColor(value)); loadDate()}}
            />
            </Box>
          </Box>
          
          <Typography
            variant="h2"
            color="secondary"
            style={{ fontWeight: "bold", margin: "20px 0px" }}
          >
            Tamanhos
          </Typography>
          <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%" }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", width: "100%",marginBottom:'16px' }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3} sm={6}>
                  <Typography>Descrição</Typography>
                  <TextField
                    required
                    size="small"
                    id="sizeDescription"
                    name="sizeDescription"
                    placeholder="Descrição do tamanho"
                    variant="outlined"
                    autoComplete="text"
                    value={sizeText}
                    onChange={(e) => setSizeText(e.target.value)}
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
                    onClick={() => {dispatch(Creators.addSize(sizeText)); loadDate()}}
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
                      selectedSize.map((item) =>  dispatch(Creators.removeSize(item.id)));
                      loadDate();
                    }}
                  >
                    Remover tamanho selecionados
                  </Button>
                </Grid>
              </Grid>
            </Box>
            <Box style={{width:'100%'}}>
            <Table
              columns={sizeTableColumn}
              data={sizeDate}
              selectable={true}
              hideViewAction
              hideEditAction
              onDelete={!disableActionIcon}
              onSelectionChange={(rows) => {
                if (rows.length > 1) {
                  setSelectedSize(rows)
                  setDisableActionIcon(true);
                  setActiveButton(false);
                } else {
                  setDisableActionIcon(false);
                  setActiveButton(true);
                }
              }}
              handleDelete ={(value)=> {dispatch(Creators.removeSize(value)); loadDate()}}
            />
            </Box>
          </Box>

          <Box mt={2} sx={{ display: "flex", flexWrap: "wrap", gap: "24px", justifyContent:'flex-end' }}>
          <Button
                    variant="contained"
                    size="large"
                    style={{
                      backgroundColor: "#D68E70",
                      color: "#1f1f1f",
                      borderRadius: "24px",
                    }}
                    onClick={() => handleChangeBack()}
                  >
                    Retornar
                  </Button>
          <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    style={{
                      color: "#FFF",
                      borderRadius: "24px",
                    }}
                    onClick={() => (!formik.isValid) || formik?.values.details === ""   ? formik.handleSubmit() : handleChangeAvancar()}
                  >
                    Avançar
                  </Button>
          </Box>
        </form>
      )}
    </Container>
  );
}
export default FormCharacter;
