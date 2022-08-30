import styled from "styled-components";

export const InputBlock = styled.div`
  width: 18%;
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

  & .PhoneInputCountry {
    display: none;
  }
`;
