import React from "react";
import { useState, type FormEvent } from "react";

import "./Form.scss";
import Input from "src/atoms/Input";
import type { ContactForm, ContactFormValidation } from "@lara/models/contact.model";
import { sendContactForm, validateField } from "@lara/services/contact.service";

const Form = ({}: {}) => {
  const initialForm = {
    name: "",
    email: "",
    phone: "",
    company: "",
    message: "",
    privacyCheck: false,
    botcheck: "", // honeypot anti-spam
  } as ContactForm;

  const initialFormValidation = {
    valid: false,
    fields: {
      name: { valid: false, message: undefined, validations: ["required"] },
      email: {
        valid: false,
        message: undefined,
        validations: ["email", "required"],
      },
      phone: {
        valid: false,
        message: undefined,
        validations: ["phone", "required"],
      },
      company: { valid: false, message: undefined, validations: ["required"] },
      message: { valid: false, message: undefined, validations: ["required"] },
      privacyCheck: {
        valid: false,
        message: undefined,
        validations: ["check"],
      },
    },
  } as ContactFormValidation;
  const [formValidation, setFormValidation] = useState<ContactFormValidation>(
    initialFormValidation
  );
  const initialFormSendState: {
    sending: boolean;
    success: boolean | undefined;
    error: boolean | undefined;
  } = {
    sending: false,
    success: undefined,
    error: undefined,
  };
  const [formSendState, setFormSendState] = useState(initialFormSendState);
  const [form, setForm] = useState<ContactForm>(initialForm);

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault();
    if (formValidation.valid) {
      const success = (res: string) => {
        setFormSendState({
          ...formSendState,
          sending: false,
          error: false,
          success: true,
        });
        setForm(initialForm);
        setFormValidation(initialFormValidation);
      };

      const error = (res: string) => {
        setFormSendState({
          ...formSendState,
          sending: false,
          error: true,
          success: false,
        });
      };

      setFormSendState({ ...formSendState, sending: true });

      sendContactForm({
        formData: form,
        successCallback: success,
        errorCallback: error,
      });
    }
  };

  const handleInputChange = (
    el: HTMLInputElement | HTMLTextAreaElement,
    key: string
  ) => {
    let value = undefined;
    if (key === "privacyCheck" && "checked" in el) {
      el = el as HTMLInputElement;
      value = el.checked;
    } else if (key === "document" && "files" in el) {
      value = el.files ? el.files[0].name : "";
    } else {
      value = el.value ?? "";
    }
    const formState = {
      ...form,
      [key]: value,
    };
    setForm(formState);
    setFormValidation(getFormValidation(formState, formValidation));
  };

  const getFormValidation = (
    state: ContactForm,
    formValidation: ContactFormValidation
  ): ContactFormValidation => {
    const fields = formValidation.fields
      ? Object.keys(formValidation.fields)
      : [];
    let validation = {} as ContactFormValidation;
    let allFieldsValid = true;
    for (let field of fields) {
      const valRes = validateField(
        formValidation.fields[field].validations,
        state[field].toString(),
        field,
        undefined
      );
      if (!valRes.valid) {
        allFieldsValid = false;
      }
      validation = {
        valid: allFieldsValid,
        fields: {
          ...formValidation.fields,
          [field]: {
            ...formValidation.fields[field],
            ...valRes,
          },
        },
      };
    }

    return validation;
  };

  return (
    <div className="contact-form">
      <form
        method="post"
        onSubmit={handleSubmit}
        className={formSendState.sending ? "form--sending" : ""}>
        {/* Honeypot anti-spam: invisible para usuarios reales, los bots lo rellenan */}
        <div aria-hidden="true" style={{ display: "none" }}>
          <input
            type="text"
            name="botcheck"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            value={form.botcheck}
            onChange={(e) =>
              setForm({ ...form, botcheck: e.target.value })
            }
          />
        </div>
        <Input
          name="name"
          label="Nombre"
          placeholder="Nombre y apellido*"
          value={form.name}
          type="text"
          style="primary"
          hiddenLabel={true}
          onChange={handleInputChange}
        />
        <Input
          name="email"
          label="Email"
          placeholder="Email*"
          value={form.email}
          type="email"
          style="primary"
          hiddenLabel={true}
          onChange={handleInputChange}
        />
        <Input
          name="phone"
          label="Teléfono"
          placeholder="Teléfono*"
          value={form.phone}
          type="tel"
          style="primary"
          hiddenLabel={true}
          onChange={handleInputChange}
        />
        <Input
          name="company"
          label="Empresa"
          placeholder="Empresa*"
          value={form.company}
          type="text"
          style="primary"
          hiddenLabel={true}
          onChange={handleInputChange}
        />

        <Input
          name="message"
          label="Mensaje"
          placeholder="Mensaje*"
          value={form.message}
          type="textarea"
          style="primary"
          hiddenLabel={true}
          onChange={handleInputChange}
        />
        <Input
          name="privacyCheck"
          label={`He leído y acepto la <a href="/politica-privacidad" target="blank">política de privacidad</a>*.`}
          checked={form.privacyCheck}
          tabIndex="0"
          type="checkbox"
          style="primary"
          onChange={handleInputChange}
        />

        {/* <p className="contact-form__advice">
          Los campos obligatorios están marcados con *.
        </p> */}

        <div className="contact-form__actions">
          <button
            className="button button--regular button--solid"
            type="submit"
            onClick={() => {}}
            disabled={!formValidation.valid || !form.privacyCheck}>
            Enviar
          </button>
          <span
            className={`contact-form__actions-loader${
              formSendState.sending
                ? " contact-form__actions-loader--active"
                : ""
            }`}></span>
        </div>
        {formSendState.success && (
          <div className="contact-form__feedback contact-form__feedback--success">
            <strong>¡Gracias!</strong> Tu mensaje ha sido enviado correctamente.
          </div>
        )}
        {formSendState.error && (
          <div className="contact-form__feedback contact-form__feedback--error">
            Se ha producido un <strong>error</strong> al enviar la consulta.
          </div>
        )}
      </form>
    </div>
  );
};

export default Form;
