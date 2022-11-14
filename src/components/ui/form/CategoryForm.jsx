import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../input/Input";
import InputFile from "../input/InputFile";
import { useRemoveVietnamTones } from "../../../hooks/useRemoveVietnamTone";
import { storage } from "../../../configs/firebase-configs";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAddDoc } from "../../../hooks/firestore-hook";

const CategoryForm = ({ type }) => {
  const { control, handleSubmit, getValues, setValue } = useForm({
    mode: onchange,
  });
  const [removeTones] = useRemoveVietnamTones();
  const [handleAddDoc] = useAddDoc();
  const [image, setImage] = useState(null);

  const handleUploadImage = (file) => {
    if (file) {
      const path = removeTones(getValues("name")).toLowerCase();
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        setValue("image", downloadURL);
        setValue("path", path);
        setImage(downloadURL);
      });
    }
  };
  const handleAddCategory = (values) => {
    handleAddDoc("categories", values);
  };
  const handleUpdateCategory = (values) => {
    console.log("update");
  };

  const handleInputChange = (e) => {
    const file = e.target.files[0];
    if (file) handleUploadImage(file);
  };

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
          <InputFile
            display="Hình ảnh"
            name="image"
            onChange={handleInputChange}
          />
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
