import styled from "styled-components";

export const InputBlock = styled.div`
  width: ${(props) => (props.widthBlock ? props.widthBlock : 18)}%;
  display: inline-block;

  label {
    font-size: 0.9rem;

    font-weight: bold;
    color: var(--label-input);
  }

  input {
    width: 100%;
    border: none;
    border: 2px solid var(--border);
    outline: none;
    background: none;
    padding: 0.6rem;
    margin-top: 0.6rem;

    font-size: 0.9rem;

    color: var(--text-gray);
  }

  // remove arrow in input type number
  input[type="number"] {
    -moz-appearance: textfield;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  .error {
    display: block;
    color: #f00;

    font-weight: bold;
  }
`;

export const InputZipCode = styled.div`
  display: flex;
  align-items: center;

  input {
    width: 80%;
  }

  button {
    width: 20%;
    height: 2.6rem;
    display: flex;
    align-items: center;
    justify-content: center;

    border: none;
    background-color: red;
    margin-top: 0.6rem;
    background-color: var(--background-button-input);

    svg {
      width: 1.2rem;
      height: 1.2rem;
    }
  }
`;
