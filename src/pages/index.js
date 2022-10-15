import { lazy } from "react";

//PRODUTOS
//--------------------------------------------------------------------

const Products = lazy(() => import("./Products"));
const NewProduct = lazy(() => import("./Products/NewProduct"));
const EditProduct = lazy(() => import("./Products/EditProduct"));
const ViewProduct = lazy(() => import("./Products/ViewProduct"));

const Promotions = lazy(() => import("./Promotions"));

const News = lazy(() => import("./News"));

const Categories = lazy(() => import("./Categories"));
const NewCategorie = lazy(() => import("./Categories/NewCategorie"));
const ViewCategorie = lazy(() => import("./Categories/ViewCategorie"));
const EditCategorie = lazy(() => import("./Categories/EditCategorie"));

const TypesProduct = lazy(() => import("./TypesProduct"));
const NewTypeProduct = lazy(() => import("./TypesProduct/NewTypeProduct"));
const EditTypeProduct = lazy(() => import("./TypesProduct/EditTypeProduct"));
const ViewTypeProduct = lazy(() => import("./TypesProduct/ViewTypeProduct"));

//CLIENTES
//--------------------------------------------------------------------
const Clients = lazy(() => import("./Clients"));
const NewClient = lazy(() => import("./Clients/NewClient"));
const EditClient = lazy(() => import("./Clients/EditClient"));
const ViewClient = lazy(() => import("./Clients/ViewClient"));

const TypesClient = lazy(() => import("./TypesClient"));
const NewTypeClient = lazy(() => import("./TypesClient/NewTypeClient"));
const EditTypeClient = lazy(() => import("./TypesClient/EditTypeClient"));
const ViewTypeClient = lazy(() => import("./TypesClient/ViewTypeClient"));

export const listRoutes = [
  //page produtos
  //--------------------------------------------------------------------
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
  //--------------------------------------------------------------------
  {
    exact: false,
    private: true,
    path: "/produto/promocoes",
    component: Promotions,
  },
  //--------------------------------------------------------------------
  {
    exact: false,
    private: true,
    path: "/produto/novidades",
    component: News,
  },
  //--------------------------------------------------------------------
  {
    exact: false,
    private: true,
    path: "/produto/categorias",
    component: Categories,
  },
  {
    exact: false,
    private: true,
    path: "/produto/categorias/nova-categoria",
    component: NewCategorie,
  },
  {
    exact: false,
    private: true,
    path: "/produto/categorias/editar-categoria/:id",
    component: EditCategorie,
  },
  {
    exact: false,
    private: true,
    path: "/produto/categorias/view-categoria/:id",
    component: ViewCategorie,
  },
  //--------------------------------------------------------------------
  {
    exact: false,
    private: true,
    path: "/produto/tipos",
    component: TypesProduct,
  },
  {
    exact: false,
    private: true,
    path: "/produto/tipos/novo-tipo",
    component: NewTypeProduct,
  },
  {
    exact: false,
    private: true,
    path: "/produto/tipos/editar-tipo/:id",
    component: EditTypeProduct,
  },
  {
    exact: false,
    private: true,
    path: "/produto/tipos/view-tipo/:id",
    component: ViewTypeProduct,
  },
  //--------------------------------------------------------------------


  // pages clientes
  //--------------------------------------------------------------------
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
  //--------------------------------------------------------------------
  {
    exact: false,
    private: true,
    path: "/tipos-cliente",
    component: TypesClient,
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
  //--------------------------------------------------------------------
];
