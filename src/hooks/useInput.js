import { useState } from "react";

export const useInputValue = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const onChange = (e) => {
      setValue(e.target.value);
    };
    const clean = () => setValue(initialValue);
    return { value, onChange, clean };
  };

  export const useInputValidator = (initialValue) => {
    const [value, setValue] = useState(initialValue);
    const [validator, setValidator] = useState(true);
    const onChange = (e) => {
      setValue(e.target.value);
      setValidator(!!e.target.value);
    };
    const clean = () => setValue(initialValue);
    return { value, onChange, clean, validator, setValidator };
  };

  export const useInputValidatorWithLimit = (initialValue, limit) => {
    const [value, setValue] = useState(initialValue);
    const [validator, setValidator] = useState(true);
    const onChange = (e) => {
      if(e.target.value.length <= limit) {
        setValue(e.target.value);
        setValidator(!!e.target.value);
      }
    };
    const clean = () => setValue(initialValue);
    return { value, onChange, clean, validator, setValidator };
  };