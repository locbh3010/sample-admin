import React from "react";
import { Link } from "react-router-dom";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";
import Button from "../button/Button";

export function ProductList({ children }) {
  return (
    <div className="grid gap-6 grid-cols-4 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
}

export function ProductItem() {
  return (
    <div className="w-full rounded-lg bg-white shadow flex flex-col relative">
      <div className="absolute top-2 left-2 bg-white/25 rounded text-white z-50 font-bold w-10 h-10 flex-center text-lg">
        50
      </div>
      {/* hình ảnh */}
      <div className="overflow-hidden rounded-t-lg flex-shrink-0">
        <img
          src="https://media.vneconomy.vn/640x360/images/upload/2022/06/08/nft-free-jpg-optimal.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* thông tin */}
      <div className="flex-1 px-3 py-4">
        <span className="text-sm text-blue-500 font-bold mb-0.5 py-1 px-2 bg-gray-800/10 rounded">
          categories name
        </span>
        <p className="font-bold text-2xl capitalize line-clamp-1">
          name product
        </p>
        <span className="text-gray-500 line-clamp-3 font-medium mb-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo
          asperiores aspernatur architecto obcaecati illum, unde soluta
          laboriosam reiciendis dolor eligendi.
        </span>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <Link className="w-full flex-center py-3 bg-blue-500 text-white rounded duration-300 hover:bg-blue-400">
            <Pencil></Pencil>
          </Link>
          <button className="w-full py-3 bg-red-500 text-white flex-center rounded">
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}
