import { useFormik } from "formik";
import type { LoginValue, LoginResponse } from "../types/auth";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import React, { useState, Fragment } from "react";
import { AxiosError } from "axios";
import { Switch, Transition } from "@headlessui/react";
import { UserCircleIcon, LockClosedIcon } from "@heroicons/react/24/outline";

const validationSchema = yup.object({
  username: yup.string().required("Username is required"),
  password: yup.string().required("Password is required"),
});

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false);
  const formik = useFormik<LoginValue>({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const response = await axiosInstance.post<LoginResponse>(
          "/users/login",
          values
        );
        localStorage.setItem("token", response.data.access_token);
        navigate("/dashboard");
      } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        alert(error.response?.data?.detail || "Login failed");
      }
    },
  });

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black text-white overflow-hidden font-sans px-4 sm:px-0">
      {/* Modern Dark Background with Grid/Spotlight */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-purple-500 opacity-20 blur-[100px]"></div>

      <Transition
        as={Fragment}
        appear={true}
        show={true}
        enter="transform transition duration-700 ease-out"
        enterFrom="opacity-0 translate-y-8 scale-95"
        enterTo="opacity-100 translate-y-0 scale-100"
      >
        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 sm:p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          <div className="mb-10 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Welcome Back
            </h2>
            <p className="text-sm text-zinc-400">
              Enter your credentials to access the portal
            </p>
          </div>

          <form className="space-y-6" onSubmit={formik.handleSubmit}>
            <div className="group">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <UserCircleIcon className="h-5 w-5 text-zinc-500 transition-colors group-focus-within:text-white" />
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  required
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 py-3 pl-10 text-sm text-white placeholder-zinc-500 shadow-sm transition-all focus:border-white focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="Username"
                />
              </div>
              {formik.touched.username && formik.errors.username && (
                <p className="mt-1 text-xs text-red-400 font-medium ml-1">
                  {formik.errors.username}
                </p>
              )}
            </div>

            <div className="group">
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <LockClosedIcon className="h-5 w-5 text-zinc-500 transition-colors group-focus-within:text-white" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  className="block w-full rounded-xl border border-zinc-700/50 bg-zinc-800/50 py-3 pl-10 text-sm text-white placeholder-zinc-500 shadow-sm transition-all focus:border-white focus:bg-zinc-800 focus:outline-none focus:ring-1 focus:ring-white"
                  placeholder="••••••••"
                />
              </div>
              {formik.touched.password && formik.errors.password && (
                <p className="mt-1 text-xs text-red-400 font-medium ml-1">
                  {formik.errors.password}
                </p>
              )}
            </div>

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-0">
              <div
                className="flex items-center gap-2 cursor-pointer group"
                onClick={() => setEnabled(!enabled)}
              >
                <Switch
                  checked={enabled}
                  onChange={setEnabled}
                  className={`${
                    enabled ? "bg-white" : "bg-zinc-700"
                  } relative inline-flex h-5 w-9 items-center rounded-full border border-transparent transition-colors focus:outline-none`}
                >
                  <span
                    className={`${
                      enabled
                        ? "translate-x-4 bg-black"
                        : "translate-x-0.5 bg-white"
                    } inline-block h-4 w-4 transform rounded-full shadow-md transition-transform`}
                  />
                </Switch>
                <span className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors">
                  Remember me
                </span>
              </div>
              <a
                href="#"
                className="text-xs font-medium text-zinc-400 hover:text-white transition-colors text-right sm:text-left"
              >
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full transform rounded-xl bg-white py-3 px-4 text-sm font-bold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] hover:shadow-xl active:scale-[0.98]"
            >
              Sign In
            </button>
          </form>
        </div>
      </Transition>
    </div>
  );
};
export default Login;
