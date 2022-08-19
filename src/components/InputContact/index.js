import InputMask from "react-input-mask";

import { InputBlock } from "./styles";

function InputContact({ label, value, setValue, error, ...rest }) {
  return (
    <InputBlock>
      <label htmlFor="contact">{label}</label>

      <InputMask
        id="contact"
        name="contact"
        type="tel"
        mask="(99) 99999-9999"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </InputBlock>
  );
}

export { InputContact };
