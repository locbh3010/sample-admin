import { collection, getCountFromServer } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../../../configs/firebase-configs";

const Block = ({ slug, display, color }) => {
  const navigate = useNavigate();
  const colRef = collection(db, slug);
  const [count, setCount] = useState(0);

  useEffect(() => {
    async function countFunc() {
      const snapshot = await getCountFromServer(colRef);

      setCount(snapshot.data().count);
    }

    countFunc();
  }, []);

  return (
    <div
      onClick={() => navigate(`/${slug}`)}
      className={`${color} bg-white shadow rounded px-3 py-4 relative cursor-pointer duration-300 hover:shadow-md`}
    >
      <div className="absolute top-0 left-0 h-full w-1 bg-current rounded-l"></div>
      <span className="block font-bold text-current mb-1 line-clamp-1">
        Tổng số {display}
      </span>
      <span className="text-slate-700 font-bold text-4xl">
        {count ? count : 0}
      </span>
    </div>
  );
};

const HomeHeader = () => {
  return (
    <div>
      <div className="container">
        <div className="p-4">
          <div className="grid grid-cols-4 gap-6">
            <Block
              slug="products"
              display="sản phẩm"
              color="text-blue-500"
            ></Block>
            <Block
              slug="categories"
              display="danh mục"
              color="text-neutral-500"
            ></Block>
            <Block
              slug="users"
              display="người dùng"
              color="text-red-500"
            ></Block>
            <Block
              slug="orders"
              display="đơn hàng"
              color="text-stone-500"
            ></Block>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHeader;
