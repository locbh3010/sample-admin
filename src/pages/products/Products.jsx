import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Dropdown, { DropdownItem } from "../../components/ui/dropdown/Dropdown";
import ProductForm from "../../components/ui/form/ProductForm";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import { db } from "../../configs/firebase-configs";

const Products = () => {
  const [products, setProducts] = useState([]);
  const colRef = collection(db, "products");

  useEffect(() => {
    onSnapshot(colRef, (res) => {
      let temp = [];
      res.docs.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setProducts(temp);
    });
  }, []);

  return (
    <div>
      <div className="container">
        <div className="max-w-4xl mx-auto py-12">
          <h1 className="text-4xl font-bold capitalize text-slate-800 mt-4 mb-8">
            Quản lý sản phẩm
          </h1>
          <ProductForm type="add" />
        </div>
      </div>
      <div className="container">
        <div className="py-10"></div>
        <ProductList>
          {products?.length > 0 &&
            products.map((product) => (
              <ProductItem data={product} key={product.id} />
            ))}
        </ProductList>
      </div>
    </div>
  );
};

export default Products;
