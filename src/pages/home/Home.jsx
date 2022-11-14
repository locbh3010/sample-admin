import React from "react";
import {
  CategoryItem,
  CategoryList,
} from "../../components/ui/category/Category";
import Checkbox from "../../components/ui/input/Checkbox";
import Input from "../../components/ui/input/Input";
import InputFile from "../../components/ui/input/InputFile";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import HomeHeader from "./header/HomeHeader";

const Home = () => {
  return (
    <div>
      <HomeHeader />
      {/* danh mục nổi bật */}
      <div className="container dark:bg-black">
        <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800 dark:text-white">
          Danh mục nổi bật
        </h4>
        <div className="py-6">
          <CategoryList>
            <CategoryItem />
          </CategoryList>
        </div>
      </div>

      {/* sản phẩm nổi bật */}
      <div className="container mt-8 mb-20">
        <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800">
          Sản phẩm nổi bật
        </h4>
        <ProductList>
          <ProductItem></ProductItem>
        </ProductList>
      </div>
    </div>
  );
};

export default Home;
