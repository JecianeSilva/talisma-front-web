import InputMask from "react-input-mask";

import { InputBlock } from "./styles";

function InputCnpj({ label, value, setValue, error, ...rest }) {
  return (
    <InputBlock>
      <label htmlFor="cnpj">{label}</label>

      <InputMask
        id="cnpj"
        name="cnpj"
        type="text"
        mask="99.999.999/9999-99"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </InputBlock>
  );
}

export { InputCnpj };
