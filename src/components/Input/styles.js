import styled from "styled-components";

export const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 0.4rem;
  width: 100%;

  label {
    font-size: 1.2rem;
    font-family: "Calibri", sans-serif;
    font-weight: bold;
    color: var(--label-input);
  }

  input {
    width: 100%;
    border: none;
    border-bottom: 1px solid var(--line);
    outline: none;
    background: none;
    margin-bottom: 1.6rem;
    margin-top: 1rem;
    padding-bottom: 0.6rem;

    font-size: 1.2rem;
    font-family: "Calibri", sans-serif;
    color: var(--text-gray);
  }

  .error {
    display: block;
    color: #f00;
    font-family: "Calibri", sans-serif;
    font-weight: bold;
    margin-bottom: 1.6rem;
    margin-top: -1rem;
  }
`;
