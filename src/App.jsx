import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Categories from "./pages/categories/Categories";
import CategoryDetail from "./pages/category/CategoryDetail";
import Home from "./pages/home/Home";
import Products from "./pages/products/Products";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/categories" element={<Categories />}></Route>
        <Route path="/category/:id" element={<CategoryDetail />}></Route>
        <Route path="/products" element={<Products />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
