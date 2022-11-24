import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Blog from "./pages/blog/Blog";
import Blogs from "./pages/blogs/Blogs";
import Categories from "./pages/categories/Categories";
import CategoryDetail from "./pages/category/CategoryDetail";
import Comments from "./pages/comment/Comments";
import Home from "./pages/home/Home";
import OrderDetail from "./pages/orders/OrderDetail";
import Orders from "./pages/orders/Orders";
import ProductDetail from "./pages/product/ProductDetail";
import Products from "./pages/products/Products";
import SignIn from "./pages/signIn/SignIn";
import User from "./pages/users/User";
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
          <Route path="/user/:id" element={<User />}></Route>
          <Route path="/blogs" element={<Blogs />}></Route>
          <Route path="/blog/:id" element={<Blog />}></Route>
          <Route path="/orders" element={<Orders />}></Route>
          <Route path="/comments" element={<Comments />}></Route>
          <Route path="/order/:id" element={<OrderDetail />}></Route>
        </Route>
        <Route path="/sign-in" element={<SignIn />}></Route>
      </Routes>
    </div>
  );
};

export default App;
