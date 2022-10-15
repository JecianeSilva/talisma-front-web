import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

import clsx from "clsx";
// import { useSelector } from "react-redux";
import {
  Drawer,
  Divider,
  Collapse,
  Box,
} from "@material-ui/core";
import {
  ArrowForwardIos,
  ExpandMore,
  ExpandLess,
  ExitToAppTwoTone,
} from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import { SvgIcon } from "@material-ui/core";

import { ReactComponent as iconProduct } from "../../assets/icons/product.svg";
import { ReactComponent as iconOrder } from "../../assets/icons/order.svg";
import { ReactComponent as iconClient } from "../../assets/icons/client.svg";
import { ReactComponent as iconStock } from "../../assets/icons/stock.svg";
import { ReactComponent as iconCollaborators } from "../../assets/icons/users.svg";
import { ReactComponent as iconCallcenter } from "../../assets/icons/callcenter.svg";

import { ReactComponent as circle } from "../../assets/icons/circle.svg";

import {
  ButtonContainer,
  Icon,
  Label,
  ListContainer,
  Logo,
  LogoContainer,
  MenuItem,
  PerfilContainer,
  SubItem,
} from "./styles";

import TalismaLogo from "../../assets/images/logo2.png";
import TalismaLogoIcon from "../../assets/images/logoIcon.png";
import { Creators } from "../../store/ducks/auth";

const useStyles = makeStyles((theme) => ({
  menuClose: {
    width: "5rem",
    minWidth: "5rem",
    maxWidth: "5rem",
  },
  menuOpen: {
    minWidth: "16rem",
    width: "16rem",
  },
  listItem: {
    display: "flex",
    flex: "column",
  },
}));

function Menu({ open, setOpen }) {
  const [menuItens, setMenuItens] = useState([]);
  const pathnamePage = window.location.pathname;
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    setMenuItens([
      {
        label: "Pedidos",
        path: "/pedidos",
        key: "pedidos",
        icon: <SvgIcon component={iconOrder} viewBox="0 0 22 28" />,
        subItem: [],
        expanded: pathnamePage.includes("pedidos"),
      },
      {
        label: "Produtos",
        path: "/produtos",
        key: "produto",
        icon: <SvgIcon component={iconProduct} viewBox="0 0 24 28" />,
        subItem: [
          {
            label: "Produtos",
            path: "/produtos",
            key: "produtos",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
          {
            label: "Promoções",
            path: "/produto/promocoes",
            key: "promocoes",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
          {
            label: "Novidades",
            path: "/produto/novidades",
            key: "novidades",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
          {
            label: "Categorias",
            path: "/produto/categorias",
            key: "categorias",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
          {
            label: "Tipos de produto",
            path: "/produto/tipos",
            key: "tipos-produto",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
        ],
        expanded: pathnamePage.includes("produto"),
      },
      {
        label: "Estoque",
        path: "/estoque",
        key: "estoques",
        icon: <SvgIcon component={iconStock} viewBox="0 0 22 28" />,
        subItem: [],
      },
      {
        label: "Clientes",
        path: "/clientes",
        key: "cliente",
        icon: <SvgIcon component={iconClient} viewBox="0 0 24 28" />,
        subItem: [
          {
            label: "Clientes",
            path: "/clientes",
            key: "clientes",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
          {
            label: "Tipos de cliente",
            path: "/tipos-cliente",
            key: "tipos-cliente",
            icon: <SvgIcon component={circle} viewBox="0 0 30 30" />,
          },
        ],
        expanded: pathnamePage.includes("cliente"),
      },
      {
        label: "Colaboradores",
        path: "/colaboradores",
        key: "colaboradores",
        icon: <SvgIcon component={iconCollaborators} viewBox="0 0 22 28" />,
      },
      {
        label: "Atendimento",
        path: "/atendimento",
        key: "atendimentos",
        icon: <SvgIcon component={iconCallcenter} viewBox="0 0 24 28" />,
        subItem: [],
      },
    ]);

    return () => {
      setMenuItens([]);
    };
  }, [pathnamePage]);

  const handleMenuClick = (subItem) => {
    const items = menuItens.map((item) => {
      if (item.key === subItem.key) {
        item.expanded = !item.expanded;
      }
      return item;
    });
    setMenuItens(items);
    if (!open) {
      setOpen();
    }
  };

  return (
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.menuOpen]: open,
        [classes.menuClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.menuOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
      open={open}
    >
      <LogoContainer>
        <Logo src={open ? TalismaLogo : TalismaLogoIcon} open={open} />
      </LogoContainer>
      <ButtonContainer>
        <Icon onClick={setOpen} open={open}>
          {open ? (
            <SvgIcon viewBox="0 0 16 24">
              <path d="M11.67 3.87 9.9 2.1 0 12l9.9 9.9 1.77-1.77L3.54 12z" />
            </SvgIcon>
          ) : (
            <ArrowForwardIos />
          )}
        </Icon>
      </ButtonContainer>
      <Divider variant={"middle"} />
      <PerfilContainer></PerfilContainer>
      <ListContainer open={open}>
        {menuItens.map((item) => (
          <>
            {!item.subItem ? (
              <MenuItem
                component={Link}
                to={item.path}
                button
                open={open}
                key={item.path + item.key}
                selected={pathnamePage.includes(item.key)}
              >
                {item.icon}
                {open && <span>{item.label}</span>}
                <div>
                  {item.subItem && (
                    <>{item.expanded ? <ExpandLess /> : <ExpandMore />}</>
                  )}
                </div>
              </MenuItem>
            ) : (
              <>
                <MenuItem
                  component={!item.subItem && Link}
                  button
                  open={open}
                  key={item.path + item.key}
                  selected={pathnamePage.includes(item.key)}
                  onClick={() => handleMenuClick(item)}
                >
                  {item.icon}
                  {open && <span>{item.label}</span>}
                  <Box>
                    {item.subItem && (
                      <>{item.expanded ? <ExpandLess /> : <ExpandMore />}</>
                    )}
                  </Box>
                </MenuItem>
                <Collapse
                  id="collapse"
                  in={item.expanded && open}
                  timeout="auto"
                  unmountOnExit
                >
                  <ListContainer open={open}>
                    {item?.subItem &&
                      item.subItem.map((subItem) => (
                        <SubItem
                          component={Link}
                          to={subItem.path}
                          button
                          key={subItem.path}
                          selected={pathnamePage.includes(subItem.path)}
                          open={open}
                        >
                          {subItem.icon}
                          <Label>{subItem.label}</Label>
                        </SubItem>
                      ))}
                  </ListContainer>
                </Collapse>
              </>
            )}
          </>
        ))}

        <MenuItem
          button
          key={"sair"}
          open={open}
          onClick={() => dispatch(Creators.signOut())}
        >
          <ExitToAppTwoTone />
          {open && <span>{"Sair"}</span>}
        </MenuItem>
      </ListContainer>
    </Drawer>
  );
}

export { Menu };
