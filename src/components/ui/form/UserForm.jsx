import {
  addDoc,
  collection,
  doc,
  onSnapshot,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../configs/firebase-configs";
import Input from "../input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShowError } from "../../../hooks/useValid";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Nhập email chưa đúng")
    .required("Vui lòng nhập email"),
  password: yup
    .string()
    .required("Mật khẩu không được để trống")
    .min(6, "Mật khẩu ít nhất 6 ký tự"),
});
const UserForm = () => {
  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const [type, setType] = useState("hidden");
  const [filter] = useSearchParams();
  const [id, setId] = useState(null);
  const navigate = useNavigate();
  const [handleShowErr] = useShowError(errors);

  useEffect(() => {
    if (filter.get("update")) {
      setType("update");
      setId(filter.get("update"));
    } else if (filter.get("add")) setType("add");
    else setType("hidden");
  }, [filter]);
  useEffect(() => {
    if (type === "update" && id) {
      const userRef = doc(collection(db, "users"), id);
      onSnapshot(userRef, (res) => {
        const data = res.data();
        for (const key in data) {
          if (key !== "id") {
            setValue(key, data[key]);
          }
        }
      });
    }
  }, [id]);
  useEffect(() => {
    handleShowErr();
  }, [errors]);

  const handleAddUser = (value) => {
    const usersRef = query(
      collection(db, "users"),
      where("email", "==", value.email)
    );

    onSnapshot(usersRef, (res) => {
      res.docs.length === 0 &&
        addDoc(collection(db, "users"), value).then(() => {
          toast.success("Thêm thành công");
          navigate("/users");
        });
    });
  };
  const handleUpdateUser = (value) => {
    const docRef = doc(collection(db, "users"), id);
    const querySnapshot = query(
      collection(db, "users"),
      where("email", "==", value.email)
    );

    onSnapshot(querySnapshot, (res) => {
      res.docs.length === 0 &&
        updateDoc(docRef, value).then(() => {
          toast.success("Cập nhật thành công");
          navigate("/users");
        });
    });
  };

  return (
    <div
      className={`fixed inset-0 z-[100] ${
        type === "hidden" ? "hidden" : "block"
      }`}
    >
      <div className="absolute inset-0 bg-black/30" />
      <div className="flex-center w-full h-full relative z-[110]">
        <form
          className={`flex-center rounded-lg bg-white px-4 py-6 flex-col gap-8 max-w-xl w-full flex relative`}
          onSubmit={handleSubmit(
            type === "add" ? handleAddUser : handleUpdateUser
          )}
        >
          <div
            className="absolute top-6 right-6 cursor-pointer z-50"
            onClick={() => {
              navigate("/users");
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <div className="w-full mt-12 flex flex-col gap-6">
            <Input
              name="email"
              control={control}
              display="Email"
              placeholder="Nhập email"
            />
            <Input
              name="password"
              type={type === "add" ? "password" : "text"}
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
