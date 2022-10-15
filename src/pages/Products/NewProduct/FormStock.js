import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, Grid, Select, MenuItem, Button } from "@material-ui/core";
import Loading from "../../../components/Loading";
import { store } from "../../../store";
import { Container } from "./style";
import { Creators } from "../../../store/ducks/color";
import { useDispatch } from "react-redux";

function FormStock({ formEl, formik, loading, handleChangeBack }) {
  const dispatch = useDispatch();

  const [colorDate, setColorDate] = useState(store.getState().color.color)
  const [sizeDate, setSizeDate] = useState(store.getState().size.size)
  
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
            Estoque inicial
          </Typography>
          <Box container sx={{ display: "flex", flexWrap: "wrap" }}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={3} sm={6}>
                <Typography> Estoque mínimo *</Typography>
                <TextField
                  required
                  size="small"
                  id="minStock"
                  name="minStock"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.minStock}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.minStock && Boolean(formik.errors.minStock)
                  }
                  helperText={formik.touched.minStock && formik.errors.minStock}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={3} sm={6}>
                <Typography>Controle de estoque*</Typography>
                <Select
                  required
                  size="small"
                  id="controlStock"
                  name="controlStock"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.controlStock}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.controlStock &&
                    Boolean(formik.errors.controlStock)
                  }
                  helperText={
                    formik.touched.controlStock && formik.errors.controlStock
                  }
                  fullWidth
                >
                  <MenuItem value={'nenhum'} key="nunhum">Nenhum</MenuItem>
                  {colorDate.length > 0 && 
                  <MenuItem value={'COLOR'} key="COLOR">Cor</MenuItem>
                  }
                  {sizeDate.lenght > 0 && 
                    <MenuItem value={'SIZE'} key="SIZE">Tamanho</MenuItem>
                    }
                </Select>
              </Grid>
            { formik?.values?.controlStock === 'nenhum' && 
              <Grid item xs={12} md={6} sm={6}>
                <Typography>Estoque inicial*</Typography>
                <TextField
                  required
                  size="small"
                  type="number"
                  id="stockInitial"
                  name="stockInitial"
                  placeholder="Detalhes do produto"
                  variant="outlined"
                  autoComplete="text"
                  value={formik.values.stockInitial}
                  onChange={formik.handleChange}
                  error={
                    formik.touched.stockInitial &&
                    Boolean(formik.errors.stockInitial)
                  }
                  helperText={
                    formik.touched.stockInitial && formik.errors.stockInitial
                  }
                  fullWidth
                />
              </Grid>
            }
            </Grid>
          </Box>
          {formik?.values?.controlStock === 'COLOR' && 
            <Box>
              <Typography
                variant="h2"
                color="secondary"
                style={{ fontWeight: "bold", margin: "20px 0px" }}
              >
                Cores
              </Typography>
              <Box style={{width:'50%'}}>
                {colorDate && colorDate.map((item) => 
                  <Grid container spacing={2} style={{alignItems:  'center'}}>
                    <Grid item xs={12} md={6} sm={6}>
                      <Typography variant="h3">{item.description}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6}>
                    <Typography>Quantidade</Typography>
                    <TextField
                      required
                      size="small"
                      id="colorDescription"
                      name="colorDescription"
                      placeholder="Descrição da cor"
                      variant="outlined"
                      autoComplete="text"
                      defaultValue={item.tam}
                      handleChange={(e)=> {dispatch(Creators.updateColor(item.id, e.target.value)); loadDate()}}
                      fullWidth
                    />
                    </Grid>
                  </Grid>
                )}
                </Box>
            </Box>
          }
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
          </Box>
        </form>
      )}
    </Container>
  );
}
export default FormStock;
