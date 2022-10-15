import { Box, MenuItem } from "@material-ui/core";
import styled from "styled-components";

export const Container = styled(Box)(({ theme, value, disabled }) => ({
  display: "flex",
  width: '100%',
  alignItems: "center",
  color: disabled
    ? theme.palette.grey[200]
    : value === true || value=== 0
    ? theme.palette.success.main
    : theme.palette.error.main,
}));

export const Item = styled(MenuItem)(({theme, value})=>({
color: value === true || value=== 0
? theme.palette.success.main
    : theme.palette.error.main,
}));
