import React from "react";
import CategoryForm from "../../components/ui/form/CategoryForm";

const Categories = () => {
  return (
    <div>
      <div className="container">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl text-gray-900 py-6 font-bold capitalize">
            Quản lý danh mục
          </h1>
        </div>
        <CategoryForm type="add" />
      </div>
    </div>
  );
};

export default Categories;
