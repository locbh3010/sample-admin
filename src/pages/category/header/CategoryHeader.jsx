import { collection, doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CategoryForm from "../../../components/ui/form/CategoryForm";
import { db } from "../../../configs/firebase-configs";

const CategoryHeader = () => {
  const { id } = useParams();
  const [category, setCategory] = useState({});

  useEffect(() => {
    const docRef = doc(collection(db, "categories"), id);
    onSnapshot(docRef, (res) => {
      setCategory({
        id: res.id,
        ...res.data(),
      });
    });
  }, []);

  return (
    <div className="mt-12">
      <div className="container">
        <div className="grid grid-cols-2 gap-6">
          <div className="aspect-video rounded-lg shadow-2xl">
            <img
              src={category?.image}
              alt=""
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <CategoryForm type="update" />
        </div>
      </div>
    </div>
  );
};

export default CategoryHeader;
