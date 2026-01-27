import "../styles/LabelledInput.css";

import { useState } from "react";

type InputType =
  | "text"
  | "password"
  | "checkbox"
  | "radio"
  | "date"
  | "number"
  | "range"
  | "email"
  | "url"
  | "search"
  | "tel";

export function LabelledInput({
  type = "text",
  className = "",
  value = "",
  name = "",
  labelText = "<<label text goes here>>",
  onChange: onChangeHandler,
  required = false,
  checked = false,
}: {
  type?: InputType;
  value?: string;
  className?: string;
  name?: string;
  labelText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  checked?: boolean;
}) {
  const [randomID] = useState(crypto.randomUUID());
  const [ownValue, setOwnValue] = useState(onChangeHandler ? undefined : value); //this state variable only used if parent doesn't keep track of state
  if (!onChangeHandler)
    onChangeHandler = (e) => {
      setOwnValue(e.target.value);
    };
  return (
    <div className={"labelled-input"}>
      <label htmlFor={randomID}>{labelText}</label>
      <input
        id={randomID}
        type={type}
        className={className}
        value={ownValue ?? value}
        name={name}
        onChange={onChangeHandler}
        required={required}
        checked={checked}
      />
    </div>
  );
}
