import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../../configs/firebase-configs";
import { doc, collection, getDoc, onSnapshot } from "firebase/firestore";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper";
import ProductForm from "../../../components/ui/form/ProductForm";

const ProductHeader = () => {
  return (
    
  );
};

export default ProductHeader;
