import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import {
  CategoryItem,
  CategoryList,
} from "../../components/ui/category/Category";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import { db } from "../../configs/firebase-configs";
import { useAuth } from "../../contexts/AuthContext";
import HomeHeader from "./header/HomeHeader";

const Home = () => {
  const cateRef = collection(db, "categories");
  const productRef = collection(db, "products");
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    onSnapshot(cateRef, (response) => {
      const docs = response.docs;
      let temp = [];

      if (docs && docs.length > 0) {
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
        setCategories(temp);
      }
    });
    onSnapshot(productRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setProducts(temp);
    });
  }, []);

  return (
    <>
      <HomeHeader />
      {user && (
        <div>
          <div className="container dark:bg-black">
            <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800 dark:text-white">
              Danh mục nổi bật
            </h4>
            <div className="py-6">
              <CategoryList>
                {categories?.length > 0 &&
                  categories.map((category) => (
                    <CategoryItem key={category.id} data={category} />
                  ))}
              </CategoryList>
            </div>
          </div>

          <div className="container mt-8 mb-20">
            <h4 className="text-3xl font-semibold leading-normal mt-0 mb-2 text-slate-800">
              Sản phẩm nổi bật
            </h4>
            <ProductList>
              {products?.length > 0 &&
                products.map((product) => (
                  <ProductItem key={product.id} data={product} />
                ))}
            </ProductList>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
