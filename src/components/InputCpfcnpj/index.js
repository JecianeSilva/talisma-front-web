import React from "react";
import CpfCnpj from "@react-br-forms/cpf-cnpj-mask";

import { InputBlock } from "./styles";

function InputCpfCnpj({ label, value, onChange, error, ...rest }) {
  return (
    <InputBlock>
      <label htmlFor="cpf_cnpj">{label}</label>

      <CpfCnpj
        id="cpf_cnpj"
        name="cpf_cnpj"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        {...rest}
      />

      {error && <span className="error">{error}</span>}
    </InputBlock>
  );
}

export { InputCpfCnpj };
