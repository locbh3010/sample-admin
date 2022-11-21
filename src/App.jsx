import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import CategoryDetail from "./pages/category/CategoryDetail";
import Home from "./pages/home/Home";
import Orders from "./pages/orders/Orders";
import ProductDetail from "./pages/product/ProductDetail";
import Products from "./pages/products/Products";
import SignIn from "./pages/signIn/SignIn";
import Users from "./pages/users/Users";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />}></Route>
          <Route path="/categories" element={<Categories />}></Route>
          <Route path="/category/:id" element={<CategoryDetail />}></Route>
          <Route path="/products" element={<Products />}></Route>
          <Route path="/product/:id" element={<ProductDetail />}></Route>
          <Route path="/users" element={<Users />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
};

export default App;
