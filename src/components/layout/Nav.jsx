import React from "react";
import { NavLink } from "react-router-dom";

const Nav = () => {
  return (
    <div className="py-4 bg-white/80 text-slate-900/80 font-bold backdrop-blur sticky top-0 left-0 w-full z-50 shadow">
      <div className="container">
        <div className="flex items-center justify-center gap-4">
          <NavLink to="/">Trang chủ</NavLink>
          <NavLink to="/products">Quản lý sản phẩm</NavLink>
          <NavLink to="/categories">Quản lý danh mục</NavLink>
        </div>
      </div>
    </div>
  );
};

export default Nav;
