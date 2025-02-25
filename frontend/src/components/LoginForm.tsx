"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useLoginMutation } from "../services/api";
import { toast } from "react-toastify";
import { motion } from "motion/react";

const validation = yup.object().shape({
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

type FormData = typeof validation.__outputType;
const LoginPage: React.FC = () => {
  const [loginUser] = useLoginMutation();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validation),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const result = await loginUser(data).unwrap();
      if (result.data) {
        navigate("/");
        toast.success("Login successful!");
      }
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Invalid credentials!"
      );
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="w-full h-screen flex bg-black pt-20 justify-center"
    >
      <div className="w-2/3 rounded-2xl h-3/4 ">
        <div className="flex flex-col">
          <h1 className="text-6xl font-bold text-neutral-100  text-center mt-16">
            Login
          </h1>
          <p className="text-lg font-light leading-1 tracking-wide text-slate-100/40 mt-4 text-center">
            Welcome back! Log in to access your account.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col mt-10 items-center"
          >
            <div className="flex flex-col gap-5 h-16">
              <div>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  aria-label="Email"
                  {...register("email")}
                  className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-800/60 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm text-center mt-1">
                  {errors.email?.message}
                </p>
              </div>

              <div className="flex gap-5  h-16">
                <div>
                  <input
                    type="password"
                    placeholder="Enter your Password"
                    aria-label="Password"
                    {...register("password")}
                    className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-800/60 ${
                      errors.password ? "border-red-500" : ""
                    }`}
                  />
                  <p className="text-red-500 text-sm text-center mt-1">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex mt-28 gap-8">
              <button
                type="submit"
                className="bg-[#dbff6e] w-96 font-semibold text-black px-6 py-2 rounded-full h-14 "
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default LoginPage;
