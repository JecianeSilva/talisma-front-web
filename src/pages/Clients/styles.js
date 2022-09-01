import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 40px;
`;

export const ContentHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;

  margin-top: 9rem;
  margin-bottom: 2.2rem;

  .MuiInputBase-root {
    color: #8c8c8c;
    min-width: 400px;
    border-radius: 24px;
    border: none;
    background-color: #fff;
  }
  .MuiOutlinedInput-input {
    padding: 15.5px 14px 15.5px 0px;
  }
  .MuiOutlinedInput-input::placeholder {
    color: #000;
  }
  .MuiInputAdornment-positionStart {
    margin: 0;
  }
  .MuiOutlinedInput-adornedStart {
    padding: 0;
  }
`;
export const ContentBody = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  height: 100%;
  min-height: 800x;
  width: 100%;
  background-color: #fff;
  margin: 44px 0px;

  padding: 20px;
  gap: 20px;
`;
