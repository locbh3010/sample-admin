import React from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Input from "../input/Input";
import InputFile from "../input/InputFile";

const CategoryForm = ({ type }) => {
  const { control, handleSubmit } = useForm({
    mode: onchange,
  });

  const handleAddCategory = (values) => {
    console.log("add");
  };
  const handleUpdateCategory = (values) => {
    console.log("update");
  };

  return (
    <form
      onSubmit={
        type === "add"
          ? handleSubmit(handleAddCategory)
          : type === "update" && handleSubmit(handleUpdateCategory)
      }
    >
      <div className="max-w-2xl mx-auto w-full">
        <div className="flex flex-col gap-4">
          <Input
            name="name"
            placeholder="Nhập tên danh mục"
            display="Tên danh mục"
            control={control}
          />
          <InputFile display="Hình ảnh" name="image" />
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
    </form>
  );
};

CategoryForm.propTypes = {
  type: PropTypes.oneOf(["add", "update"]).isRequired,
};

export default CategoryForm;
