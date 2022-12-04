import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Select from "../input/Select";
import { db, storage } from "../../../configs/firebase-configs";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import Input from "../input/Input";
import Editor from "../input/Editor";
import InputFile from "../input/InputFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firestore-hook";
import { useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useShowError } from "../../../hooks/useValid";

const pathRegExp = /^[A-Za-z0-9_.]+$/;

const schema = yup.object().shape({
  cateId: yup
    .string()
    .notOneOf([0, "0"], "Vui lòng chọn danh mục")
    .required("Vui lòng chọn danh mục"),
  path: yup
    .string()
    .required("Hãy nhập path")
    .matches(pathRegExp, "Path không đúng chuẩn"),
  name: yup.string().required("Vui lòng nhập tên sản phẩm"),
  price: yup
    .number()
    .required("Vui lòng nhập giá sản phẩm")
    .min(1, "Giá sản phẩm phải lớn hơn 1"),
  count: yup
    .number()
    .required("Vui lòng nhập số lượng sản phẩm")
    .min(0, "Số lượng sản phẩm không phải số âm"),
  discount: yup
    .number()
    .required("Vui lòng nhập phần trăm giảm giá")
    .min(0, "Phần trăm giảm giá nhỏ nhất là 0")
    .max(100, "Phần trăm giảm giá lớn nhất là 100"),
});

const ProductForm = ({ type }) => {
  const [product, setProduct] = useState([]);
  const {
    control,
    handleSubmit,
    setValue,
    watch,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schema),
  });
  const [state, setState] = useState({
    categories: [],
  });
  const categoryRef = collection(db, "categories");
  const watchPath = watch("path");
  const [images, setImages] = useState([]);
  const [handleAddDoc] = useAddDoc();
  const [handleUpdateDoc] = useUpdateDoc();
  const { id } = type === "update" && useParams();
  const [handleShowErr] = useShowError(errors);

  const handleUploadImage = (file) => {
    if (file) {
      const path = getValues("path");
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file).then(async (snapshot) => {
        const downloadURL = await getDownloadURL(snapshot.ref);
        setImages((img) => [...img, downloadURL]);
      });
    }
  };

  const handleAdd = (values) => {
    values.images = images;
    values.price = +values.price;

    handleAddDoc("products", values);
  };
  const handleUpdate = (values) => {
    values.images = images;
    values.price = +values.price;

    const dataUpdate = {
      path: "products",
      id: product.id,
      data: values,
    };
    handleUpdateDoc(dataUpdate);
  };

  const handleInputChange = (e) => {
    const files = e.target.files;
    setImages([]);
    if (files) {
      [...files].map((file) => handleUploadImage(file));
    }
  };

  useEffect(() => {
    getDocs(categoryRef).then((res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setState({
        ...state,
        categories: temp,
      });
    });
  }, []);
  useEffect(() => {
    if (type === "update" && id) {
      const productRef = doc(collection(db, "products"), id);

      onSnapshot(productRef, (res) =>
        setProduct({ id: res.id, ...res.data() })
      );
    }
  }, [id]);
  useEffect(() => {
    if (type === "update" && product) {
      for (const key in product) {
        setValue(key, product[key]);
      }
      setImages(product.images);
    }
  }, [product]);
  useEffect(() => {
    handleShowErr();
  }, [errors]);

  const handleSelectChange = (e) => {
    setValue("cateId", e.target.value);
    const docRef = doc(categoryRef, e.target.value);
    getDoc(docRef).then((res) => {
      if (res.data()?.name) {
        setValue("cateName", res.data().name);
      } else toast.error("Vui lòng chọn danh mục");
    });
  };

  return (
    <div>
      <form
        onSubmit={
          type === "add" ? handleSubmit(handleAdd) : handleSubmit(handleUpdate)
        }
      >
        {type === "update" ? (
          <div className="text-lg font-medium flex items-center gap-4 mb-6">
            {product && (
              <>
                <span>{product.cateName}</span>-<span>{product.name}</span>
              </>
            )}
          </div>
        ) : (
          ""
        )}
        <div className="grid grid-cols-2 gap-4 items-end">
          <Select control={control} name="cateId" onChange={handleSelectChange}>
            <option value="0">Chọn danh mục</option>
            {state.categories?.length > 0 &&
              state.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
          </Select>
          <Input
            name="path"
            control={control}
            display={type === "add" && "Nơi lưu ảnh"}
            placeholder="Nhập path"
            disabled={type === "update" ? true : false}
          />
        </div>

        <div className="grid grid-cols-2 gap-4 items-end grid-flow-row auto-rows-fr mt-4 mb-10">
          <Input
            name="name"
            control={control}
            display="Tên sản phẩm"
            placeholder="Nhập tên sản phẩm"
          />
          <Input
            type="number"
            name="price"
            control={control}
            display="Giá sản phẩm"
            placeholder="Nhập giá sản phẩm"
          />
          <Input
            type="number"
            name="count"
            control={control}
            defaultValue={1}
            display="Số lượng sản phẩm"
            placeholder="Nhập số lượng sản phẩm"
          />
          <Input
            type="number"
            name="discount"
            control={control}
            display="Giảm giá"
            placeholder="Nhập phần trăm giảm giá"
            defaultValue={0}
            min={0}
            max={100}
          />
        </div>
        <div className="mb-6">
          <Editor control={control} name="description"></Editor>
        </div>
        <div className="mb-10">
          {watchPath && !errors.path && (
            <InputFile name="images" multiple onChange={handleInputChange} />
          )}
        </div>
        <div className="w-full flex-center">
          <button
            type="submit"
            className="px-6 py-4 bg-blue-500 duration-300 hover:bg-blue-400 rounded text-white text-lg font-semibold capitalize"
          >
            {type === "add" ? "thêm" : "cập nhật"} sản phẩm
          </button>
        </div>
      </form>
      <div className="grid grid-cols-3 gap-4 grid-flow-row autor-rows-fr mt-8">
        {images?.length > 0 &&
          images.map((img) => (
            <div className="w-full aspect-video overflow-hidden" key={img}>
              <img src={img} alt="" className="w-full h-full object-cover" />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductForm;
