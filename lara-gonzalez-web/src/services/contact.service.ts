import type { ContactForm } from "@lara/models/contact.model";

const sendContactForm = ({
  formData,
  successCallback,
  errorCallback,
}: {
  formData: ContactForm;
  successCallback: (res: string) => void;
  errorCallback: (res: string) => void;
}) => {
  const url = import.meta.env.PUBLIC_EMAIL_SERVICE_URL;
  const emailClient = import.meta.env.PUBLIC_EMAIL_SERVICE_CLIENT;
  const emailTemplate = import.meta.env.PUBLIC_EMAIL_SERVICE_CONTACT_TEMPLATE;

  var form_data = new FormData();
  for (var key in formData) {
    form_data.append(key, formData[key].toString());
  }

  fetch(url, {
    method: "POST",
    body: form_data,
    headers: {
      // "Content-Type": "multipart/form-data",
      Bearer: emailClient,
      "x-dawuti-client": emailClient,
      "x-dawuti-template": emailTemplate,
    },
  })
    .then((res) => {
      return res.json();
    })
    .then((res) => {
      if (res.ok) {
        successCallback(res);
      } else {
        errorCallback(res);
      }
    })
    .catch((error) => {
      errorCallback(error);
    });
};

const validateField = (
  validations: string[],
  value: string,
  field: string,
  dependentOnField?: string
) => {
  if (dependentOnField && dependentOnField !== field) return { valid: true };

  for (let validation of validations) {
    const validationResult = getValidation[validation](value);
    if (!validationResult.valid) {
      return validationResult;
    }
  }
  return { valid: true };
};

const getValidation: {
  [name: string]: (value: string) => {
    valid: boolean;
    message: string | undefined;
  };
} = {
  required: (value: string) => {
    return value.trim() !== ""
      ? { valid: true, message: undefined }
      : { valid: false, message: "El campo es obligatorio" };
  },
  email: (value: string) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(value.toLowerCase())
      ? { valid: true, message: undefined }
      : { valid: false, message: "El email no es correcto" };
  },
  phone: (value: string) => {
    const re = /^[+]?[0-9]{0,3}?[6-9][0-9]{8}$/im;

    return re.test(value.toLowerCase())
      ? { valid: true, message: undefined }
      : { valid: false, message: "El teléfono es incorrecto" };
  },
  check: (value: string) => {
    return !!value
      ? { valid: true, message: undefined }
      : {
          valid: false,
          message: "Es necesario aceptar la política de privacidad",
        };
  },
};

export { sendContactForm, validateField };
