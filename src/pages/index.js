import { lazy } from "react";

// pages cliente
const Clients = lazy(() => import("./Clients"));
const NewClients = lazy(() => import("./Clients/NewClients"));

export const listRoutes = [
  // pages Cliente
  {
    exact: false,
    private: true,
    path: "/clientes/clientes",
    component: Clients,
  },
  {
    exact: false,
    private: true,
    path: "/clientes/novo-cliente",
    component: NewClients,
  },
];
