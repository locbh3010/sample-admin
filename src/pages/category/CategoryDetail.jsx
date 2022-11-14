import React from "react";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import CategoryHeader from "./header/CategoryHeader";

const CategoryDetail = () => {
  return (
    <div>
      <CategoryHeader />
      <div className="mt-8 mb-20 container">
        <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800">
          Sản phẩm trong danh mục
        </h4>
        <ProductList>
          <ProductItem></ProductItem>
        </ProductList>
      </div>
    </div>
  );
};

export default CategoryDetail;
