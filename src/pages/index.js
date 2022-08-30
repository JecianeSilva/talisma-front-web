import { lazy } from "react";

// pages cliente
const Clients = lazy(() => import("./Clients"));
const TypeClients = lazy(() => import("./TypeClient"));
const NewClient = lazy(() => import("./Clients/NewClient"));
const NewTypeClient = lazy(() => import("./Clients/NewClient"));
const EditClient = lazy(() => import("./Clients/EditClient"));

export const listRoutes = [
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
    path: "/tipo-cliente",
    component: TypeClients,
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
    path: "/clientes/novo-tipo",
    component: NewTypeClient,
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
    component: EditClient,
  },
];
