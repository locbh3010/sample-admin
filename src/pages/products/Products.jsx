import React from "react";
import ProductForm from "../../components/ui/form/ProductForm";

const Products = () => {
  return (
    <div>
      <div className="container">
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold capitalize text-slate-800 mt-4 mb-8">
            Quản lý sản phẩm
          </h1>
          <ProductForm type="add" />
        </div>
      </div>
    </div>
  );
};

export default Products;
