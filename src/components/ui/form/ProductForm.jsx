import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import Select from "../input/Select";
import { db } from "../../../configs/firebase-configs";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import Input from "../input/Input";
import Editor from "../input/Editor";
import InputFile from "../input/InputFile";

const ProductForm = ({ type }) => {
  const { control, handleSubmit, setValue, watch } = useForm({
    mode: onchange,
  });
  const [state, setState] = useState({
    categories: [],
  });
  const categoryRef = collection(db, "categories");
  const watchPath = watch("path");

  const handleAdd = (values) => {
    console.log(values);
  };
  const handleUpdate = (values) => {};

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
          <Editor setValue={setValue} field="description"></Editor>
        </div>
        <div className="mb-10">
          {watchPath && <InputFile name="images" multiple />}
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
    </div>
  );
};

ProductForm.propTypes = {
  type: PropTypes.oneOf(["add", "update"]).isRequired,
};

export default ProductForm;
