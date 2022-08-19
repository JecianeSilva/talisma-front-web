import React from "react";

import { DrawerApp } from "../DrawerApp";
import SignedRoutes from "../../routes/signed.routes";

import { Container, ContainerApp, Content } from "./styles";

function Layout() {
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(!open);
  };

  return (
    <ContainerApp>
      <Content>
        <DrawerApp open={open} setOpen={handleDrawerOpen} />
        <Container>
          <SignedRoutes />
        </Container>
      </Content>
    </ContainerApp>
  );
}

export default Layout;
