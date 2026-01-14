import * as yup from "yup";
import { GENDER_OPTIONS } from "../constants";

// Login Validation Schema
export const loginSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

// Register Validation Schema
export const registerSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(3, "Must be at least 3 chars"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  age: yup
    .number()
    .typeError("Age must be a number")
    .required("Age is required")
    .integer("Age must be an integer")
    .min(18, "Must be at least 18")
    .max(100, "Invalid age"),
  gender: yup
    .string()
    .required("Gender is required")
    .oneOf(GENDER_OPTIONS, "Invalid gender"),
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Must be at least 8 chars")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])/,
      "Password must contain at least one uppercase, one lowercase, and one number"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm Password is required"),
});
