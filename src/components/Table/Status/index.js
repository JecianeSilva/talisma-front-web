import * as React from 'react';

import { KeyboardArrowDown } from "@material-ui/icons";

import { Container, Item } from "./styles";
import { Box, Menu, MenuItem, Modal, Typography } from "@material-ui/core";

export default function Status({ value, disabled = false, activeStatus, disabledStatus}) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box>
    <Container value={value} disabled={disabled} 
      onClick={handleClick}
    >
      <Typography variant="h5">
        <span>{value === true || value=== 0 ? "Ativo" : "Inativo"}</span>
      </Typography>
      <KeyboardArrowDown />
    </Container>
    {activeStatus && disabledStatus && 
      <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          style={{marginTop:'36px', width:'100%'}}
        ><Item value={true} onClick={()=>{ activeStatus(); handleClose();}}>Ativo</Item>
        <Item value={false}onClick={() =>{disabledStatus(); handleClose();}}>Inativo</Item>
      </Menu>
      }
    </Box>
  );
}
