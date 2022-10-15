import styled from "styled-components";

export const ContainerApp = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
`;

export const Content = styled.div`
  display: flex;
  width: 100%;

  & .MuiDrawer-paper {
    box-sizing: border-box;
    border: none;
    background-color: #fff;
  }
  & .MuiListItem-root {
    background-color: transparent;
  }
  & .MuiListItem-root:hover {
    background-color: transparent;
  }
  & .MuiListItem-root.Mui-selected {
    span {
      color: #70163a;
      font-weight: bold;
    }
    svg {
      fill: #70163a;
    }
  }
  // & .MuiListItem-root:hover {
  //   span {
  //     color: #70163a;
  //   }
  //   svg {
  //     fill: #70163a;
  //   }
  // }
`;
export const Container = styled.div`
  width: 100%;
  height: 100%;
  overflow-x: hidden;
  overflow-y: auto;
  background-color: #faf9f9;
`;
