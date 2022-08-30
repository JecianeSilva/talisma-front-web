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
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;
`;

export const Logo = styled.img`
  width: 13rem;
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
  min-width: 27rem;
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.16));
  background: #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.16);
  border-radius: 30px;
  padding: 4rem 3rem;

  .MuiInputBase-root {
    color: #8c8c8c;
    background: #ededed;
    border-color: transparent;
    border: none;
  }
  .MuiOutlinedInput-notchedOutline {
    border-color: rgba(0, 0, 0, 0);
  }

  .MuiOutlinedInput-inputMarginDense {
    padding-top: 8.5px !important;
    padding-bottom: 8.5px !important;
  }
`;

export const Title = styled.h6`
  flex-grow: 1;
  min-height: 2.8rem;
`;
export const Divider = styled.div`
  background-color: #fff;
  height: 0.8rem;
`;
// background: ${(props) => props.theme.palette.primary.main};
