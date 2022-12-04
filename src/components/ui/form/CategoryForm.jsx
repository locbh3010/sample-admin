import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../input/Input";
import InputFile from "../input/InputFile";
import { db, storage } from "../../../configs/firebase-configs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firestore-hook";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShowError } from "../../../hooks/useValid";

const pathRegExp = /^[A-Za-z0-9_.]+$/;

const schema = yup.object().shape({
  name: yup.string().required("Vui lòng nhập tên danh mục"),
  path: yup
    .string()
    .matches(pathRegExp, "Sai định dạng đường dẫn")
    .required("Vui lòng nhập đương dẫn"),
});

const CategoryForm = ({ type }) => {
  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });

  const { id } = type === "update" && useParams();

  const [image, setImage] = useState(null);
  const [category, setCategory] = useState({});
  const watchPath = watch("path");

  // custom hook
  const [handleShowErr] = useShowError(errors);
  const [handleAddDoc] = useAddDoc();
  const [handleUpdate] = useUpdateDoc();

  const handleUploadImage = (file) => {
    if (file) {
      const path = getValues("path");
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file)
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          setValue("image", downloadURL);
          setImage(downloadURL);
        })
        .catch((err) => {
          switch (err.status) {
            case "403":
              toast.error("Bạn chưa đăng nhập");
              break;

            default:
              break;
          }
        });
    }
  };
  const handleAddCategory = (values) => {
    handleAddDoc("categories", values);
  };
  const handleUpdateCategory = (values) => {
    const updateData = {
      path: "categories",
      id,
      data: values,
    };
    handleUpdate(updateData);
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUploadImage(file);
  };

  useEffect(() => {
    if (type === "update" && id) {
      const docRef = doc(collection(db, "categories"), id);
      onSnapshot(docRef, async (res) => {
        const data = await res.data();

        await setCategory(data);
      });
    }
  }, []);
  useEffect(() => {
    for (const key in category) {
      setValue(key, category[key]);
    }
  }, [category]);
  useEffect(() => {
    handleShowErr();
  }, [errors]);

  return (
    <form
      onSubmit={
        type === "add"
          ? handleSubmit(handleAddCategory)
          : type === "update" && handleSubmit(handleUpdateCategory)
      }
    >
      <div>
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nhập tên danh mục"
            display="Tên danh mục"
            control={control}
          />
          <Input
            name="path"
            placeholder="Nhập vào path image"
            display="Folder lưu ảnh"
            control={control}
            disabled={type === "update" ? true : false}
          />
          {watchPath && !errors.path && (
            <InputFile
              display="Hình ảnh"
              name="image"
              onChange={handleInputChange}
            />
          )}
        </div>
        <div className="w-full flex items-center mt-8">
          <button
            type="submit"
            className="bg-blue-500 px-10 py-3 rounded font-medium text-lg text-white duration-300 hover:shadow-lg mx-auto"
          >
            {type === "add"
              ? "Thêm danh mục"
              : type === "update" && "Cập nhật danh mục"}
          </button>
        </div>
      </div>
      {image && (
        <div className="aspect-video overflow-hidden rounded-lg relative mt-8">
          <img src={image} alt="" className="w-full h-full object-cover" />
        </div>
      )}
    </form>
  );
};

CategoryForm.propTypes = {
  type: PropTypes.oneOf(["add", "update"]).isRequired,
};

export default CategoryForm;
