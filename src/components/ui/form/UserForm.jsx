import React, { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import Input from "../input/Input";

const UserForm = () => {
  const { control } = useForm({
    mode: onchange,
  });
  const formRef = useRef(null);
  const [filter] = useSearchParams();

  useEffect(() => {
    if (filter.get("update")) {
      formRef.current.classList.replace("form-close", "form-open");
    }
  }, []);

  return (
    <div className="fixed inset-0 z-[100] form-close" ref={formRef}>
      <div className="absolute inset-0 bg-black/30" />
      <div className="flex-center w-full h-full relative z-[110]">
        <form className="flex-center rounded-lg bg-white px-4 py-6 flex flex-col gap-8 max-w-xl w-full">
          <div className="w-full mt-12 flex flex-col gap-6">
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
              value="Thêm"
              className="py-4 px-8 bg-blue-500 text-white text-lg font-medium rounded cursor-pointer hover:bg-blue-400 duration-300"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserForm;
