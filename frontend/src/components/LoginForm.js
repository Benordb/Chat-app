"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";
import { useAuth } from "./utils/authProvider";

export const LoginForm = () => {
  const router = useRouter();
  const { login } = useAuth();
  const loginForm = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string(),
      password: yup
        .string()
    }),
    onSubmit: (values) => {
      login(values.email, values.password);
    },
  });
  const showError = (field) =>
    loginForm.submitCount > 0 &&
    loginForm.errors[field] &&
    loginForm.touched[field];
  return (
    <div className="w-96 rounded-xl bg-transparent border">
      <form className="flex flex-col p-8" onSubmit={loginForm.handleSubmit}>
        <h1 className="text-3xl text-center">Login</h1>
        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="Email"
          name="email"
          type="email"
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.email}
        />
        {showError("email") && (
          <p className="px-4 text-sm text-red-600">{loginForm.errors.email}</p>
        )}
        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="Password"
          name="password"
          type="password"
          onChange={loginForm.handleChange}
          onBlur={loginForm.handleBlur}
          value={loginForm.values.password}
        />
        {showError("password") && (
          <p className="px-4 text-sm text-red-600">
            {loginForm.errors.password}
          </p>
        )}
        <div className="flex justify-between my-2">
          <p>.</p>
          <button type="button" className="text-slate-200">
            Forget password?
          </button>
        </div>
        <button
          className="text-black bg-white rounded-3xl px-4 py-2"
          type="submit"
        >
          Login
        </button>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            type="button"
            onClick={() => router.replace("/register")}
            className="text-slate-400"
          >
            Signup
          </button>
        </p>
      </form>
    </div>
  );
};
