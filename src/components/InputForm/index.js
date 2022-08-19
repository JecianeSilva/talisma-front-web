import React, { useEffect, useRef } from "react";
import { useField } from "@unform/core";
import { FiSearch } from "react-icons/fi";

import { InputBlock, InputZipCode } from "./styles";

function InputForm({ name, label, handleButton, widthBlock, ...rest }) {
  const inputRef = useRef(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,

      getValue: (ref) => {
        return ref.current.value;
      },

      setValue: (ref, value) => {
        ref.current.value = value;
      },

      clearValue: (ref) => {
        ref.current.value = "";
      },
    });
  }, [fieldName, registerField]);

  return (
    <InputBlock widthBlock={widthBlock}>
      <label htmlFor={name}>{label}</label>
      {name === "zip_code" ? (
        <InputZipCode>
          <input
            name={name}
            id={name}
            ref={inputRef}
            defaultValue={defaultValue}
            {...rest}
          />
          <button type="button" onClick={handleButton}>
            <FiSearch />
          </button>
        </InputZipCode>
      ) : (
        <input
          name={name}
          id={name}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
        />
      )}
      {error && <span className="error">{error}</span>}
    </InputBlock>
  );
}

export { InputForm };
