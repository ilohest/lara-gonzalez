import React, { useState } from "react";
import { classList } from "src/utils/react.utils";
import { 
  validatePhone, 
  validateEmail, 
  validateText, 
  validateTextarea 
} from "../utils/validations.utils";
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
  const [error, setError] = useState<string | null>(null);
  const classesList = classList({
    input: true,
    [`input--${type}`]: true,
    [`input--${style}`]: true,
    [classes]: true,
  });

  const handleBlur = () => {
    let validationError = null;
    if (type === "phone") {
      validationError = validatePhone(value || "");
    } else if (type === "email") {
      validationError = validateEmail(value || "");
    } else if (type === "text") {
      validationError = validateText(value || "");
    } else if (type === "textarea") {
      validationError = validateTextarea(value || "");
    }
    setError(validationError);
  };

  return (
    <>
      {(type === "text" || type === "email" || type === "phone") && (
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
              onBlur={handleBlur} 
              value={value}
              inputMode={"text"} 
            />
          </div>
          {error && <div className="input__error">{error}</div>}  
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
              onBlur={handleBlur}
              value={value}
            />
          </div>
          {error && <div className="input__error">{error}</div>} 
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
      
      {type === "checkbox" && (
        <div className={classesList}>
          <div className="input__wrapper">
            <label htmlFor={name}>
              <input
                type="checkbox"
                checked={checked ?? false}
                tabIndex={tabIndex}
                id={name}
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
