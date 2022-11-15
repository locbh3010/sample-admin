import React, { useEffect, useState } from "react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay, Pagination } from "swiper";
import { useParams } from "react-router-dom";
import { doc, collection, onSnapshot, query, where } from "firebase/firestore";
import { ProductItem, ProductList } from "../../components/ui/product/Product";
import ProductForm from "../../components/ui/form/ProductForm";
import { db } from "../../configs/firebase-configs";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState([]);
  const [similar, setSimilar] = useState([]);
  const docRef = doc(collection(db, "products"), id);

  useEffect(() => {
    onSnapshot(docRef, (res) => {
      res.data() && setProduct(res.data());
      const similarSnapshot = query(
        collection(db, "products"),
        where("cateId", "==", res.data().cateId)
      );

      onSnapshot(similarSnapshot, (res) => {
        const docs = res.docs;
        let temp = [];

        docs?.length > 0 &&
          docs.map((doc) => {
            if (doc.id !== id) {
              temp.push({ id: doc.id, ...doc.data() });
            }
          });

        setSimilar(temp);
      });
    });
  }, [id]);
  return (
    <div>
      <div className="container mt-10">
        <div className="grid grid-cols-2 gap-6 mb-16">
          <div className="rounded-lg aspect-video overflow-hidden">
            {product && (
              <Swiper
                navigation={true}
                modules={[Navigation, Autoplay, Pagination]}
                autoplay={{ delay: 1500, disableOnInteraction: false }}
                className="h-full w-full"
                pagination={{ type: "progressbar" }}
              >
                {product?.images?.length > 0 &&
                  product.images.map((img) => (
                    <SwiperSlide key={img}>
                      <img
                        src={img}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </SwiperSlide>
                  ))}
              </Swiper>
            )}
          </div>
          <ProductForm type="update" />
        </div>

        <ProductList>
          {similar?.length > 0 &&
            similar.map((item) => <ProductItem key={item.id} data={item} />)}
        </ProductList>
      </div>
    </div>
  );
};

export default ProductDetail;
