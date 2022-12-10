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
    <div className="card group">
      <div className="absolute top-2 left-2 bg-gray-500/50 rounded text-white z-30 font-bold w-10 h-10 flex-center text-lg">
        {data.count}
      </div>
      {/* hình ảnh */}
      <figture
        className="overflow-hidden rounded-t-lg flex-shrink-0 aspect-video bg-slate-300 cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={data.images[0]}
          alt=""
          className="w-full h-full object-cover duration-300 ease-linear group-hover:scale-125"
        />
      </figture>
      {/* thông tin */}
      <div className="card-body p-0 px-2 py-3">
        <span className="badge badge-primary bg-opacity-20 border-0 text-blue-500">
          {data.cateName}
        </span>
        <p className="card-title line-clamp-1" onClick={handleNavigate}>
          {data.name}
        </p>
        <span
          className="text-gray-400 line-clamp-3 font-medium mb-4"
          ref={descriptionEle}
        ></span>

        <div className="card-actions grid w-full grid-cols-2 gap-2">
          <button
            className="btn btn-info text-white bg-blue-500"
            onClick={handleNavigate}
          >
            <Pencil></Pencil>
          </button>
          <button className="btn btn-error text-white" onClick={handleDelete}>
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
}
