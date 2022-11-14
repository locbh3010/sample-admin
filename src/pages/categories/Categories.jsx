import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  CategoryItem,
  CategoryList,
} from "../../components/ui/category/Category";
import CategoryForm from "../../components/ui/form/CategoryForm";
import { db } from "../../configs/firebase-configs";

const Categories = () => {
  const colRef = collection(db, "categories");
  const [state, setState] = useState({
    categories: [],
  });

  useEffect(() => {
    onSnapshot(colRef, (response) => {
      const docs = response.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) =>
          temp.push({
            id: doc.id,
            ...doc.data(),
          })
        );

      setState({
        ...state,
        categories: temp,
      });
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="max-w-2xl mx-auto w-full">
          <h1 className="text-3xl text-gray-900 py-6 font-bold capitalize">
            Quản lý danh mục
          </h1>
        </div>
        <div className="max-w-2xl mx-auto w-full">
          <CategoryForm type="add" />
        </div>
        <div className="container mt-20">
          <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800 dark:text-white">
            Tất cả danh mục
          </h4>
          <div className="py-6">
            <CategoryList>
              {state.categories?.length > 0 &&
                state.categories.map((category) => (
                  <CategoryItem key={category.id} data={category} />
                ))}
            </CategoryList>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
