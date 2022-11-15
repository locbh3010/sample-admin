import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import { db } from "../../configs/firebase-configs";
import CategoryHeader from "./header/CategoryHeader";

const CategoryDetail = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const productRef = query(
      collection(db, "products"),
      where("cateId", "==", id)
    );

    onSnapshot(productRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => {
          temp.push({ id: doc.id, ...doc.data() });
        });

      setProducts(temp);
    });
  }, []);

  return (
    <div>
      <CategoryHeader />
      <div className="mt-8 mb-20 container">
        <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800">
          Sản phẩm trong danh mục
        </h4>
        <ProductList>
          {products?.length > 0 &&
            products.map((item) => <ProductItem key={item.id} data={item} />)}
        </ProductList>
      </div>
    </div>
  );
};

export default CategoryDetail;
