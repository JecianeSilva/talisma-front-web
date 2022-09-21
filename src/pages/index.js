import { lazy } from "react";

const Products = lazy(() => import("./Products"));
const NewProduct = lazy(() => import("./Products/NewProduct"));
const EditProduct = lazy(() => import("./Products/EditProduct"));
const ViewProduct = lazy(() => import("./Products/ViewProduct"));
// pages clientes
const Clients = lazy(() => import("./Clients"));
const NewClient = lazy(() => import("./Clients/NewClient"));
const EditClient = lazy(() => import("./Clients/EditClient"));
const ViewClient = lazy(() => import("./Clients/ViewClient"));

//pages tipo de cliente
const TypeClients = lazy(() => import("./TypeClient"));
const NewTypeClient = lazy(() => import("./TypeClient/NewTypeClient"));
const EditTypeClient = lazy(() => import("./TypeClient/EditTypeClient"));
const ViewTypeClient = lazy(() => import("./TypeClient/ViewTypeClient"));

export const listRoutes = [
  {
    exact: false,
    private: true,
    path: "/produtos",
    component: Products,
  },
  {
    exact: false,
    private: true,
    path: "/produtos/novo-produto",
    component: NewProduct,
  },
  {
    exact: false,
    private: true,
    path: "/produtos/editar-produtos/:id",
    component: EditProduct,
  },
  {
    exact: false,
    private: true,
    path: "/produtos/view-produtos/:id",
    component: ViewProduct,
  },

  // pages Cliente
  {
    exact: false,
    private: true,
    path: "/clientes",
    component: Clients,
  },
  {
    exact: false,
    private: true,
    path: "/clientes/novo-cliente",
    component: NewClient,
  },
  {
    exact: false,
    private: true,
    path: "/clientes/editar-clientes/:id",
    component: EditClient,
  },
  {
    exact: false,
    private: true,
    path: "/clientes/view-clientes/:id",
    component: ViewClient,
  },
  {
    exact: false,
    private: true,
    path: "/tipos-cliente",
    component: TypeClients,
  },
  {
    exact: false,
    private: true,
    path: "/tipos-cliente/novo-tipo",
    component: NewTypeClient,
  },
  {
    exact: false,
    private: true,
    path: "/tipos-cliente/editar-tipo/:id",
    component: EditTypeClient,
  },
  {
    exact: false,
    private: true,
    path: "/tipos-cliente/view-tipo/:id",
    component: ViewTypeClient,
  },
];
