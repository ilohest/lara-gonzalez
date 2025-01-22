import React from "react";
import { classList } from "src/utils/react.utils";

import "./Input.scss";

interface Props {
  id?: string;
  name: string;
  label: string;
  type:
    | "text"
    | "email"
    | "phone"
    | "textarea"
    | "radio"
    | "list"
    | "checkbox"
    | "file";
  style: "primary" | "secondary";
  onChange: (el: HTMLInputElement | HTMLTextAreaElement, key: string) => void;
  value?: string;
  checked?: boolean;
  placeholder?: string;
  options?: { value: string; label: string; checked: boolean }[];
  disabled?: boolean;
  tabIndex?: any;
  classes?: string;
  hiddenLabel?: Boolean;
}

const Input = ({
  id,
  name,
  label,
  value,
  checked,
  tabIndex,
  type,
  style,
  placeholder,
  onChange,
  options,
  disabled = false,
  classes = "",
  hiddenLabel = false,
}: Props) => {
  const classesList = classList({
    input: true,
    [`input--${type}`]: true,
    [`input--${style}`]: true,
    [classes]: true,
  });

  return (
    <>
      {(type === "text" || type === "email" || type === "phone" ) && (
        <div className={classesList}>
          <label
            className={`input__label${hiddenLabel ? " sr-only" : ""}`}
            htmlFor={name}
          >
            {label}
          </label>
          <div className="input__wrapper">
            <input
              type={type}
              name={name}
              placeholder={placeholder}
              onChange={(ev) => onChange(ev.currentTarget, name)}
              value={value}
            />
          </div>
        </div>
      )}
      {type === "radio" && options && (
        <fieldset className={classesList}>
          <legend className="input__label">{label}</legend>
          <div className="input__wrapper">
            {options.map((option, index) => {
              return (
                <div key={index} className="radio-input">
                  <label htmlFor={option.value}>
                    {option.label}
                    <input
                      type="radio"
                      id={option.value}
                      name={name}
                      value={option.value}
                      checked={option.checked}
                      onChange={(ev) => onChange(ev.currentTarget, name)}
                    />
                    <i></i>
                  </label>
                </div>
              );
            })}
          </div>
        </fieldset>
      )}
      {type === "list" && options && (
        <div className={classesList}>
          <label className="input__label" htmlFor={name}>
            {label}
          </label>
          <input
            name={name}
            list={id}
            placeholder={placeholder}
            value={value}
            onChange={(ev) => onChange(ev.currentTarget, name)}
          />
          <datalist id={id}>
            {options.map((option, index) => {
              return (
                <option key={index} value={option.value}>
                  {option.label}
                </option>
              );
            })}
          </datalist>
        </div>
      )}
      {type === "file" && (
        <div className={classesList}>
          <label className="input__label" htmlFor={name}>
            {label}
          </label>
          <p>{placeholder}</p>
          {value && <p>{`File selezionato: ${value}`}</p>}
          <input
            name={name}
            type="file"
            accept="image/*, .pdf, .doc,.docx,.xml,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            size={12582912}
            onChange={(ev) => onChange(ev.currentTarget, name)}
          />
        </div>
      )}
      {type === "textarea" && (
        <div className={classesList}>
          <label className="input__label" htmlFor={name}>
            {label}
          </label>
          <div className="input__wrapper">
            <textarea
              name={name}
              placeholder={placeholder}
              onChange={(ev) => onChange(ev.currentTarget, name)}
              value={value}
            />
          </div>
        </div>
      )}
      {type === "checkbox" && (
        <div className={classesList}>
          <div className="input__wrapper">
            <label htmlFor={name}>
              <input
                type="checkbox"
                tabIndex={tabIndex}
                id={name}
                checked={checked}
                onChange={(ev) => onChange(ev.currentTarget, name)}
                disabled={disabled}
              />
              <i></i>
              <p dangerouslySetInnerHTML={{ __html: label }}></p>
            </label>
          </div>
        </div>
      )}
    </>
  );
};

export default Input;
