import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "../../components/ui/input/Input";
import { auth } from "../../configs/firebase-configs";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const { control, handleSubmit } = useForm({
    mode: onchange,
  });
  const navigate = useNavigate();

  const handleSignIn = (value) => {
    signInWithEmailAndPassword(auth, value.email, value.password).then(() =>
      navigate("/")
    );
  };

  return (
    <div>
      <div className="container">
        <div className="flex-center mt-28 flex-col">
          <h1 className="text-4xl capitalize font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-yellow-400 via-red-600/50">
            GoldenBees
          </h1>

          <form
            className="w-full max-w-xl mx-auto"
            onSubmit={handleSubmit(handleSignIn)}
          >
            <div className="w-full mt-12 flex flex-col gap-6">
              {/* <Input
                name="username"
                display="User name"
                placeholder="Enter your user name"
                control={control}
              /> */}
              <Input
                name="email"
                control={control}
                display="Email"
                placeholder="Nhập email"
              />
              <Input
                name="password"
                type="password"
                control={control}
                display="Password"
                placeholder="Nhập password"
              />
            </div>
            <div className="flex-center w-full mt-8">
              <input
                type="submit"
                value="Đăng nhập"
                className="py-4 px-8 bg-blue-500 text-white text-lg font-medium rounded cursor-pointer hover:bg-blue-400 duration-300"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
