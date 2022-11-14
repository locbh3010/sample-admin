import React from "react";
import Pencil from "../../icon/Pencil";
import { Link } from "react-router-dom";
import Button from "../button/Button";
import Trash from "../../icon/Trash";

export const CategoryList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-6 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
};

export const CategoryItem = () => {
  return (
    <div className="flex bg-white rounded-lg shadow w-full duration-300 hover:shadow-lg">
      <div className="flex-shrink-0 aspect-square overflow-hidden rounded-l-lg h-full basis-[40%]">
        <img
          src="https://duhocthanhcong.vn/wp-content/uploads/school-photos/IMG%20Academy/IMG-Academy-Album1.jpg"
          alt=""
          className="w-full h-full object-cover"
        />
      </div>
      <div className="flex-1 px-3 py-4 flex flex-col">
        <div>
          <span className="text-2xl text-slate-900 capitalize mb-2 line-clamp-1 font-medium">
            Dây chuyền
          </span>
          <span className="text-gray-400 font-bold block">
            Tổng số sản phẩm: 10
          </span>
        </div>
        <div className="mt-auto flex items-center gap-3">
          <Link className="btn-update">
            <Pencil></Pencil>
          </Link>
          <Button variant="remove">
            <Trash />
          </Button>
        </div>
      </div>
    </div>
  );
};
