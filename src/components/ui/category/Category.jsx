import React, { useEffect, useState } from "react";
import Pencil from "../../icon/Pencil";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import Trash from "../../icon/Trash";
import PropTypes from "prop-types";
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
    <div className="flex bg-white rounded-lg shadow w-full duration-300 hover:shadow-lg">
      <div
        className="flex-shrink-0 aspect-square overflow-hidden rounded-l-lg h-full basis-[40%]"
        onClick={handleNavigate}
      >
        <img src={data.image} alt="" className="w-full h-full object-cover" />
      </div>
      <div className="flex-1 px-3 py-4 flex flex-col">
        <div>
          <span className="text-2xl text-slate-900 capitalize mb-2 line-clamp-1 font-medium">
            {data.name}
          </span>
          <span className="text-gray-400 font-bold block">
            Tổng số sản phẩm: {count}
          </span>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <button className="btn-update" onClick={handleNavigate}>
            <Pencil></Pencil>
          </button>
          <Button variant="remove" onClick={handleDeleteCategory}>
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
});

CategoryItem.propTypes = {
  data: PropTypes.object.isRequired,
};
