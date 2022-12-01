import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDeleteDoc } from "../../../hooks/firestore-hook";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";

export function ProductList({ children }) {
  return (
    <div className="grid gap-6 grid-cols-4 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
}

export function ProductItem({ data }) {
  const descriptionEle = React.useRef(null);
  const navigate = useNavigate();
  const [handleDeleteDoc] = useDeleteDoc();

  useEffect(() => {
    descriptionEle.current.insertAdjacentHTML("beforeend", data.description);
  }, [data.description]);
  const handleNavigate = () => {
    navigate(`/product/${data.id}`);
  };
  const handleDelete = () => {
    handleDeleteDoc("products", data.id, data.path);
  };

  return (
    <div className="w-full rounded-lg bg-white shadow flex flex-col relative duration-300 hover:shadow-xl">
      <div className="absolute top-2 left-2 bg-gray-500/50 rounded text-white z-30 font-bold w-10 h-10 flex-center text-lg">
        {data.count}
      </div>
      {/* hình ảnh */}
      <div
        className="overflow-hidden rounded-t-lg flex-shrink-0 aspect-video bg-gray-200"
        onClick={handleNavigate}
      >
        <img
          src={data.images[0]}
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      {/* thông tin */}
      <div className="flex-1 px-3 py-4">
        <span className="text-sm text-blue-500 font-bold mb-0.5 py-1 px-2 bg-gray-800/10 rounded">
          {data.cateName}
        </span>
        <p
          className="font-bold text-2xl capitalize line-clamp-1"
          onClick={handleNavigate}
        >
          {data.name}
        </p>
        <span
          className="text-gray-500 line-clamp-3 font-medium mb-4"
          ref={descriptionEle}
        ></span>

        <div className="grid grid-cols-2 gap-3 mt-auto">
          <button
            className="w-full flex-center py-3 bg-blue-500 text-white rounded duration-300 hover:bg-blue-400"
            onClick={handleNavigate}
          >
            <Pencil></Pencil>
          </button>
          <button
            className="w-full py-3 bg-red-500 text-white flex-center rounded"
            onClick={handleDelete}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}
