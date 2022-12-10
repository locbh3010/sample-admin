import React, { useEffect, useState } from "react";
import Pencil from "../../icon/Pencil";
import { useNavigate } from "react-router-dom";
import Trash from "../../icon/Trash";
import { useDeleteDoc } from "../../../hooks/firestore-hook";
import {
  collection,
  getCountFromServer,
  query,
  where,
} from "firebase/firestore";
import { db } from "../../../configs/firebase-configs";

export const CategoryList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-6 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
};

export const CategoryItem = React.memo(({ data }) => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate(`/category/${data.id}`);
  };
  const [handleRemove] = useDeleteDoc();
  const handleDeleteCategory = () => {
    handleRemove("categories", data.id, data.path);
  };
  const [count, setCount] = useState(0);

  useEffect(() => {
    const funcCount = async () => {
      const colRef = query(
        collection(db, "products"),
        where("cateId", "==", data.id)
      );
      const snapshot = await getCountFromServer(colRef);

      setCount(snapshot.data().count);
    };

    funcCount();
  }, []);

  return (
    <div className="card flex-row card-bordered hover:shadow transition overflow-hidden group">
      <figure
        className="aspect-square overflow-hidden bg-base-200 rounded-none flex-shrink-0 basis-2/5 cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={data.image}
          alt=""
          className="w-full h-full object-cover transition-all duration-300 ease-in-out group-hover:scale-125"
        />
      </figure>
      <div className="card-body py-4 px-3">
        <div>
          <span className="card-title cursor-pointer">{data.name}</span>
          <span className="text-gray-400 font-bold block">
            Tổng số sản phẩm: {count}
          </span>
        </div>
        <div className="mt-auto w-full grid grid-cols-2 gap-2">
          <button className="btn btn-info text-white" onClick={handleNavigate}>
            <Pencil></Pencil>
          </button>
          <button
            className="btn-error text-white btn"
            onClick={handleDeleteCategory}
          >
            <Trash />
          </button>
        </div>
      </div>
    </div>
  );
});
