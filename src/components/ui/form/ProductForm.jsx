import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "../input/Select";
import { db, storage } from "../../../configs/firebase-configs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Input from "../input/Input";
import Editor from "../input/Editor";
import InputFile from "../input/InputFile";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useAddDoc } from "../../../hooks/firestore-hook";

const ProductForm = ({ type }) => {
  const { control, handleSubmit, setValue, watch, getValues } = useForm({
    mode: onchange,
  });
  const [state, setState] = useState({
    categories: [],
  });
  const categoryRef = collection(db, "categories");
  const watchPath = watch("path");
  const [images, setImages] = useState([]);
  const [handleAddDoc] = useAddDoc();

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

    handleAddDoc("products", values);
  };
  const handleUpdate = (values) => {
    console.log(values);
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

  const handleSelectChange = (e) => {
    setValue("cateId", e.target.value);
    const docRef = doc(categoryRef, e.target.value);
    getDoc(docRef).then((res) => setValue("cateName", res.data().name));
  };

  return (
    <div>
      <form
        onSubmit={
          type === "add" ? handleSubmit(handleAdd) : handleSubmit(handleUpdate)
        }
      >
        <div className="grid grid-cols-2 gap-4 items-end">
          <Select
            control={control}
            name="cateId"
            defaultValue={type === "add" && 0}
            onChange={handleSelectChange}
          >
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
            display="Nơi lưu ảnh"
            placeholder="Nhập path"
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
            display="Số lượng sản phẩm"
            placeholder="Nhập số lượng sản phẩm"
          />
          <Input
            type="number"
            name="discount"
            control={control}
            display="Giảm giá"
            placeholder="Nhập phần trăm giảm giá"
          />
        </div>
        <div className="mb-6">
          <Editor control={control} name="description"></Editor>
        </div>
        <div className="mb-10">
          {watchPath && (
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

ProductForm.propTypes = {
  type: PropTypes.oneOf(["add", "update"]).isRequired,
};

export default ProductForm;
