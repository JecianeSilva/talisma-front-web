import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: absolute;
  left: 0;
  top: 0;
`;

export const LogoContainer = styled.div`
  width: 6rem;
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;
`;

export const Logo = styled.img`
  width: 14rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const ContentToolbar = styled.div`
  top: 0;
  position: fixed;
  width: 100%;
`;

export const FormContainer = styled.form`
  min-width: 23rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  padding: 3rem;
`;

export const Title = styled.h6`
  flex-grow: 1;
  min-height: 2.8rem;
`;
export const Divider = styled.div`
  background-color: #fff;
  height: 7px;
`;
// background: ${(props) => props.theme.palette.primary.main};
