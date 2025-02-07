export const validatePhone = (value: string) => {
    const re = /^[6-9][0-9]{8}$/;
    if (!value) {
      return "El número de teléfono es obligatorio.";
    }
    if (!re.test(value)) {
      return "El teléfono debe tener 9 dígitos y comenzar con un número entre 6 y 9.";
    }
    return null;
  };
  
  export const validateEmail = (value: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!value) {
      return "El email es obligatorio.";
    }
    if (!re.test(value)) {
      return "El email no tiene un formato válido.";
    }
    return null;
  };
  
  export const validateText = (value: string) => {
    if (!value) {
      return "Este campo es obligatorio.";
    }
    return null;
  };
  
  export const validateTextarea = (value: string) => {
    if (!value) {
      return "Este campo no puede estar vacío.";
    }
    return null;
  };
  