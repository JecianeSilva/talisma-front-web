import styled from "styled-components";
import { IconButton, List, ListItem } from "@material-ui/core";

export const ListContainer = styled(List)(({ theme, open }) => ({
  width: open ? "16rem" : "5rem",
  padding: 0,

  "#collapse" :{ 
    "a.Mui-selected": {
      span: {
        color: theme.palette.primary.dark,
        fontWeight: "bold",
      },
      svg: {
        fill: theme.palette.primary.dark,
      },
      transition: "color 0.05s",
    },
  }
  
}));

export const MenuItem = styled(ListItem)(({ theme, open }) => ({
  flexDirection: open ? "row" : "column",
  span: {
    flex: 1,
    marginLeft: "10px",
    fontWeight: "normal",
    fontSize: "17px",
    lineHeight: "22px",
    color: theme.palette.grey[100],
  },
  svg: {
    fill: theme.palette.grey[100],
  },

  "a.Mui-selected, :hover": {
    span: {
      color: theme.palette.primary.main,
      fontWeight: "bold",
    },
    svg: {
      fill: theme.palette.primary.main,
    },
    transition: "color 0.05s",
  },

 
}));

export const SubItem = styled(ListItem)(({ theme, open }) => ({
  flexDirection: open ? "row" : "column",
  width: open ? "14rem" : "5rem",
  marginLeft: '24px',
  display: "flex",
  alignItems: "center",

  svg: {
    fill: theme.palette.grey[100],
  },

  ".MuiListItem-root.Mui-selected, :hover": {
    span: {
      color: theme.palette.primary.dark,
      fontWeight: "bold",
    },
    svg: {
      fill: theme.palette.primary.dark,
    },
    transition: "color 0.05s",
  },
}));

export const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  margin: 16px 0px 10px;
`;

export const Logo = styled("img")(({ theme, open }) => ({
  width: open ? "45%" : "48px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
}));

export const ButtonContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  justifyContent: "center",
}));

export const Icon = styled(IconButton)(({ theme }) => ({
  border: `1px solid ${theme.palette.grey[300]}`,
  margin: "10px 0px",
  padding: "9px"
}));

export const PerfilContainer = styled("div")(({ theme }) => ({
  margin: "10px 0px",
}));

export const Label = styled("span")(({ theme, open }) => ({
  flex: 1,
  fontWeight: "normal",
  margin: "0px",

  fontSize: "17px",
  lineHeight: "22px",
  color: theme.palette.grey[100],

  marginTop: "-14px",
}));
