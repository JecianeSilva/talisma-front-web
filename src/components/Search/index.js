import { IconButton, InputAdornment, TextField } from "@material-ui/core";
import { Search } from "@material-ui/icons";
import Autocomplete from '@material-ui/lab/Autocomplete';
import history from "../../config/history";
import { Container } from "./styles";

export default function InputSearch() {

const menuItem = [
  {
    group:'Pedidos',
    label: "Pedidos",
    path: "/pedidos",
    key: "pedidos",
  },
  {
    group: "Produtos",
    label: "Produtos",
    path: "/produtos",
    key: "produtos",
  },
  {
    group: "Produtos",
    label: "Promoções",
    path: "/produto/promocoes",
    key: "promocoes",
  },
  {
    group: "Produtos",
    label: "Novidades",
    path: "/produto/novidades",
    key: "novidades",
  },
  {
    group: "Produtos",
    label: "Categorias",
    path: "/produto/categorias",
    key: "categorias",
  },
  {
    group: "Produtos",
    label: "Tipos de produto",
    path: "/produto/tipos",
    key: "tipos-produto",
  },
  {
    group:'Estoque',
    label: "Estoque",
    path: "/estoque",
    key: "estoques",
  },
  {
    group:'Clientes',
    label: "Clientes",
    path: "/clientes",
    key: "clientes",
  },
  {
    group:'Clientes',
    label: "Tipos de cliente",
    path: "/tipos-cliente",
    key: "tipos-cliente",
  },
  {
    group:'Colaboradores',
    label: "Colaboradores",
    path: "/colaboradores",
    key: "colaboradores",
  },
  {
    group:'Atendimento',
    label: "Atendimento",
    path: "/atendimento",
    key: "atendimentos",
  },
]

const options = menuItem.map((option) => {
  const group = option.group.toUpperCase();
  return {
    group: group,
    ...option,
  };
});
  return (
    <Container>
    <Autocomplete
      id="search"
      freeSolo
      disableClearable
      options={options}
      groupBy={(option) => option.group}
      getOptionLabel={(option) => option.label}
      onChange={(e, value) => history.push(value.path)}
      renderInput={(params) => 
      <TextField
        {...params}
        variant="outlined"
        placeholder="pesquisar"
        margin="normal"
        InputProps={{
          ...params.InputProps,
          type: 'search',
          startAdornment: (
            <InputAdornment position="start">
              <IconButton>
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />}
    />
    </Container>
  );
}
