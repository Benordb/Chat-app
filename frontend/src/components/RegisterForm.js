"use client";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import * as yup from "yup";

export const RegisterForm = () => {
  const router = useRouter();
  const registerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      re_password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(3, "Name must be at least 3 characters")
        .required("Name is required"),
      email: yup
        .string()
        .email("Invalid email format")
        .required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      re_password: yup
        .string()
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .required("Re-Password is required"),
    }),
    onSubmit: (values) => {
      //   login(values.email, values.password);
      console.log(values);
      toast(`{
        name: ${values.name}
        email: ${values.email}
        password: ${values.password}
        }`);
    },
  });
  const showError = (field) =>
    registerForm.submitCount > 0 &&
    registerForm.errors[field] &&
    registerForm.touched[field];
  return (
    <div className="w-96 rounded-xl bg-transparent border">
      <form className="flex flex-col p-8" onSubmit={registerForm.handleSubmit}>
        <h1 className="text-3xl text-center">Register</h1>
        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="username"
          name="name"
          type="name"
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          value={registerForm.values.name}
        />
        {showError("name") && (
          <p className="px-4 text-sm text-red-600">
            {registerForm.errors.name}
          </p>
        )}
        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="Email"
          name="email"
          type="email"
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          value={registerForm.values.email}
        />
        {showError("email") && (
          <p className="px-4 text-sm text-red-600">
            {registerForm.errors.email}
          </p>
        )}

        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="Password"
          name="password"
          type="password"
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          value={registerForm.values.password}
        />
        {showError("password") && (
          <p className="px-4 text-sm text-red-600">
            {registerForm.errors.password}
          </p>
        )}
        <input
          className="rounded-3xl mt-4 px-4 py-2 text-black"
          placeholder="Re_Password"
          name="re_password"
          type="re_password"
          onChange={registerForm.handleChange}
          onBlur={registerForm.handleBlur}
          value={registerForm.values.re_password}
        />
        {showError("re_password") && (
          <p className="px-4 text-sm text-red-600">
            {registerForm.errors.re_password}
          </p>
        )}
        <button
          className="text-black bg-white rounded-3xl mt-8 px-4 py-2"
          type="submit"
        >
          Signup
        </button>
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <button
            type="button"
            onClick={() => router.replace("/login")}
            className="text-slate-400"
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};
