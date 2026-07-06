import type { ImageModel } from "./generic.model";

export default interface Contact {
  title: string;
  //image: ImageModel | undefined;
}

type validations = "required" | "name" | "email" | "phone" | "check";

interface Validation {
  valid: boolean;
  message: string | undefined;
  validations: validations[];
  dependentOn?: string;
}

interface FieldValidation {
  [field: string]: Validation;
}

export interface ContactFormValidation {
  valid: boolean;
  fields: FieldValidation;
}
export interface ContactForm {
  [key: string]: string | boolean;
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
  privacyCheck: boolean;
  website: string; // honeypot anti-spam (debe quedar vacío)
}
