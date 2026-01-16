import React from "react";
import { Field, Input } from "@headlessui/react";
import type { AuthInputProps } from "../types/auth";

const AuthInput: React.FC<AuthInputProps> = ({
  name,
  type = "text",
  placeholder,
  formik,
  icon: Icon,
}) => {
  return (
    <Field className="group">
      <div className="relative">
        <Icon className="pointer-events-none absolute top-3.5 left-3 h-5 w-5 text-zinc-500 transition-colors group-focus-within:text-white" />
        <Input
          name={name}
          type={type}
          placeholder={placeholder}
          value={formik.values[name] || ""}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          autoComplete={type === "password" ? "current-password" : "off"}
          className="block w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 py-3 pl-10 text-sm text-white placeholder-zinc-500 shadow-sm transition-all focus:border-white focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-white data-[hover]:bg-zinc-800/70 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      {formik.touched[name] && formik.errors[name] && (
        <p className="mt-1 text-xs text-red-400 font-medium ml-1">
          {formik.errors[name] as string}
        </p>
      )}
    </Field>
  );
};

export default AuthInput;
