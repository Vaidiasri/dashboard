import { useFormik } from "formik";
import type { LoginValue, LoginResponse, RegisterValue } from "../types/auth";
import axiosInstance from "../api/axios";
import { useNavigate } from "react-router-dom";
import React, { useState, Fragment } from "react";
import { AxiosError } from "axios";
import {
  Switch,
  Transition,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Field,
  Label,
  Button,
} from "@headlessui/react";
import {
  UserCircleIcon,
  LockClosedIcon,
  EnvelopeIcon,
  CalendarIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import { loginSchema, registerSchema } from "../schemas/auth";
import AuthInput from "./AuthInput";

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [enabled, setEnabled] = useState(false); // Remember me for login
  const [selectedTab, setSelectedTab] = useState(0); // 0: Login, 1: Register

  // Login Formik
  const loginFormik = useFormik<LoginValue>({
    initialValues: { username: "", password: "" },
    validationSchema: loginSchema,
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

  // Register Formik
  const registerFormik = useFormik<RegisterValue>({
    initialValues: {
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
      age: null,
      gender: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        // Backend expects: username, email, password, age, gender
        const { confirmPassword, ...registerData } = values;

        await axiosInstance.post("/users/", registerData);

        alert("Registration successful! Please login.");
        setSelectedTab(0); // Switch to Login tab
      } catch (err) {
        const error = err as AxiosError<{ detail: string }>;
        alert(error.response?.data?.detail || "Registration failed");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="fixed inset-0 flex h-full w-full items-center justify-center bg-black text-white overflow-hidden font-sans px-4 sm:px-0">
      {/* Background Effects */}
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
        <div className="relative z-10 w-full max-w-sm rounded-2xl border border-zinc-800 bg-zinc-900/60 p-6 sm:p-8 shadow-2xl backdrop-blur-xl ring-1 ring-white/10">
          {/* Header */}
          <div className="mb-6 text-center">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white mb-2">
              Portable Auth
            </h2>
            <p className="text-sm text-zinc-400">
              Secure functionality showcase
            </p>
          </div>

          {/* HEADLESS UI: Tab Group */}
          <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
            <TabList className="flex space-x-1 rounded-xl bg-zinc-800/50 p-1 mb-6 border border-zinc-700/50">
              {["Login", "Register"].map((category) => (
                <Tab
                  key={category}
                  className={({ selected }) =>
                    `w-full rounded-lg py-2.5 text-sm font-medium leading-5 transition-all outline-none 
                     ${
                       selected
                         ? "bg-zinc-700 text-white shadow ring-1 ring-white/10"
                         : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                     }`
                  }
                >
                  {category}
                </Tab>
              ))}
            </TabList>
            <TabPanels>
              {/* LOGIN PANEL */}
              <TabPanel className="outline-none focus:outline-none">
                <form className="space-y-5" onSubmit={loginFormik.handleSubmit}>
                  <AuthInput
                    name="username"
                    placeholder="Username"
                    formik={loginFormik}
                    icon={UserCircleIcon}
                  />

                  <AuthInput
                    name="password"
                    type="password"
                    placeholder="Password"
                    formik={loginFormik}
                    icon={LockClosedIcon}
                  />

                  {/* HEADLESS UI: Switch (Remember Me) */}
                  <div className="flex items-center">
                    <Field className="flex items-center gap-2 cursor-pointer group">
                      <Switch
                        checked={enabled}
                        onChange={setEnabled}
                        className={`${
                          enabled ? "bg-white" : "bg-zinc-700"
                        } relative inline-flex h-5 w-9 items-center rounded-full border border-transparent transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900`}
                      >
                        <span
                          className={`${
                            enabled
                              ? "translate-x-4 bg-black"
                              : "translate-x-0.5 bg-white"
                          } inline-block h-4 w-4 transform rounded-full shadow-md transition-transform`}
                        />
                      </Switch>
                      <Label className="text-xs font-medium text-zinc-400 group-hover:text-white transition-colors cursor-pointer">
                        Remember me
                      </Label>
                    </Field>
                  </div>

                  {/* HEADLESS UI: Button */}
                  <Button
                    type="submit"
                    className="w-full rounded-xl bg-white py-3 px-4 text-sm font-bold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900"
                  >
                    Sign In
                  </Button>
                </form>
              </TabPanel>

              {/* REGISTER PANEL */}
              <TabPanel className="outline-none focus:outline-none">
                <form
                  className="space-y-4"
                  onSubmit={registerFormik.handleSubmit}
                >
                  <AuthInput
                    name="username"
                    placeholder="Choose Username"
                    formik={registerFormik}
                    icon={UserCircleIcon}
                  />

                  <AuthInput
                    name="email"
                    type="email"
                    placeholder="Email Address"
                    formik={registerFormik}
                    icon={EnvelopeIcon}
                  />

                  <div className="flex gap-4">
                    <div className="w-1/2">
                      <AuthInput
                        name="age"
                        type="number"
                        placeholder="Age"
                        formik={registerFormik}
                        icon={CalendarIcon}
                      />
                    </div>
                    <div className="w-1/2">
                      <AuthInput
                        name="gender"
                        placeholder="Gender (M/F)" // Simple text input for now to match strict string expectation or validation
                        formik={registerFormik}
                        icon={UserIcon}
                      />
                    </div>
                  </div>

                  <AuthInput
                    name="password"
                    type="password"
                    placeholder="Create Password"
                    formik={registerFormik}
                    icon={LockClosedIcon}
                  />

                  <AuthInput
                    name="confirmPassword"
                    type="password"
                    placeholder="Confirm Password"
                    formik={registerFormik}
                    icon={LockClosedIcon}
                  />

                  <Button
                    type="submit"
                    disabled={registerFormik.isSubmitting}
                    className="w-full rounded-xl bg-white py-3 px-4 text-sm font-bold text-black shadow-lg transition-all hover:bg-zinc-200 hover:scale-[1.02] active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-zinc-900 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {registerFormik.isSubmitting
                      ? "Creating..."
                      : "Create Account"}
                  </Button>
                </form>
              </TabPanel>
            </TabPanels>
          </TabGroup>
        </div>
      </Transition>
    </div>
  );
};
export default Login;
