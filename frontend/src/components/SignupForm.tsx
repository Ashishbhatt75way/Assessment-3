"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { useRegisterMutation } from "../services/api";

const validation = yup.object().shape({
  name: yup.string().required("name is required"),
  email: yup
    .string()
    .email("Invalid email format")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Passwords must match")
    .required("Confirm Password is required"),
});

type FormData = typeof validation.__outputType;
const SignUpPage: React.FC = () => {
  const [registerUser, { isLoading }] = useRegisterMutation();

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
      const result = await registerUser(data).unwrap();

      if (result.data) {
        navigate("/login");
        toast.success("User registered successfully!");
      }
    } catch (error: any) {
      const validationError = error?.data?.data?.errors?.[0].msg;
      toast.error(
        validationError ?? error?.data?.message ?? "Something went wrong!"
      );
    }
  };

  return (
    <div className="w-full h-screen bg-black flex pt-20 justify-center">
      <div className="w-2/3 rounded-2xl h-3/4 ">
        <div className="flex flex-col">
          <h1 className="text-5xl font-medium text-[#dbff6e] text-center mt-16">
            Sign Up
          </h1>
          <p className="text-lg font-light leading-1 tracking-wide text-slate-100/40 mt-4 text-center">
            Join our community today! Create an account to unlock exclusive
            features and personalized experiences.
          </p>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <div className="flex gap-5 mt-10 h-16">
              <div>
                <input
                  type="text"
                  placeholder="Enter Name"
                  aria-label="name"
                  {...register("name")}
                  className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-900/60 ${
                    errors.name ? "border-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.name?.message}
                </p>
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Enter your Email"
                  aria-label="Email"
                  {...register("email")}
                  className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-900/60 ${
                    errors.email ? "border-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.email?.message}
                </p>
              </div>
            </div>
            <div className="flex gap-5 mt-10 h-16">
              <div>
                <input
                  type="password"
                  placeholder="Enter your Password"
                  aria-label="Password"
                  {...register("password")}
                  className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-900/60 ${
                    errors.password ? "border-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.password?.message}
                </p>
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Confirm Password"
                  aria-label="Confirm Password"
                  {...register("confirmPassword")}
                  className={`rounded-full w-96 h-12 text-center focus:outline-none text-slate-300 placeholder:text-slate-100/40 placeholder:text-center bg-neutral-900/60 ${
                    errors.confirmPassword ? "border-red-500" : ""
                  }`}
                />
                <p className="text-red-500 text-sm text-left">
                  {errors.confirmPassword?.message}
                </p>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="bg-[#dbff6e] font-semibold text-black px-6 py-2 rounded-full w-80 h-14 mt-10"
            >
              Create an Account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
