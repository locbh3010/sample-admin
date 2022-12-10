import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PhotoIcon from "../../icon/PhotoIcon";
import Button from "../button/Button";
import Editor from "../input/Editor";
import Input from "../input/Input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "../../../configs/firebase-configs";
import { useAddDoc, useUpdateDoc } from "../../../hooks/firestore-hook";
import { useAuth } from "../../../contexts/AuthContext";
import { collection, doc, onSnapshot, Timestamp } from "firebase/firestore";
import { useParams } from "react-router-dom";
import Select from "../input/Select";

const BlogForm = ({ type = "add" }) => {
  const { control, handleSubmit, getValues, setValue, watch, register } =
    useForm({
      mode: onchange,
    });
  const { id } = type === "update" && useParams();
  const [image, setImage] = useState(null);
  const watchSlug = watch("slug");
  const [handleAddDoc] = useAddDoc();
  const [handleUpdate] = useUpdateDoc();
  const { user } = useAuth();

  const handleUploadImage = (file) => {
    if (file) {
      const path = getValues("path");
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file)
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          setValue("image", downloadURL);
          setImage(downloadURL);
        })
        .catch((err) => {
          switch (err.status) {
            case "403":
              toast.error("Bạn chưa đăng nhập");
              break;

            default:
              break;
          }
        });
    }
  };
  const handleInputChange = (e) => {
    const selectFile = e.target.files[0];
    handleUploadImage(selectFile);
  };

  const handleAddBlog = (value) => {
    const date = new Date();
    const timestampNow = Timestamp.fromDate(date);
    value.createAt = timestampNow;
    value.email = user.email;
    if (value.comment === "<p><br></p>") {
      return;
    }

    handleAddDoc("blogs", value);
  };
  const handleUpdateBlog = (value) => {
    const dataUpdate = {
      path: "blogs",
      id,
      data: value,
    };

    handleUpdate(dataUpdate);
  };

  useEffect(() => {
    if (id && type === "update") {
      const blogRef_ = doc(collection(db, "blogs"), id);
      onSnapshot(blogRef_, (res) => {
        const data = res.data();
        for (const key in data) {
          setValue(key, data[key]);
        }
        setImage(data.image);
      });
    }
  }, [id]);

  return (
    <div>
      <form
        onSubmit={handleSubmit(
          type === "add" ? handleAddBlog : handleUpdateBlog
        )}
      >
        <div className="max-w-2xl mx-auto py-8 flex flex-col gap-6">
          <div className="form-control">
            <label htmlFor="categories" className="label">
              Danh muc blog
            </label>
            <Select control={control} name="categories" id="categories">
              <option disabled selected>
                Chon danh muc
              </option>
              <option value="fashion">Fashion</option>
              <option value="style">style</option>
              <option value="accessories">Accessories</option>
              <option value="season">Season</option>
            </Select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              control={control}
              name="slug"
              placeholder="Nhập đường dẫn blog"
              display="Đường dẫn blog"
              disabled={type === "update"}
            />
            <Input
              control={control}
              name="name"
              placeholder="Nhập tên blog"
              display="Tên blog"
            />
          </div>
          <div>
            {watchSlug && (
              <label
                htmlFor="image"
                className="w-full overflow-hidden rounded-lg bg-gray-300 aspect-video cursor-pointer block flex-center text-gray-400"
              >
                {image ? (
                  <img
                    src={image}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <PhotoIcon width="128px" />
                )}
              </label>
            )}
            <input
              type="file"
              className="hidden"
              name="image"
              id="image"
              accept="image/jpeg, image/png, image/gif, image/webp"
              onChange={handleInputChange}
            />
          </div>
          <div className="flex flex-col gap-2 py-4">
            <label htmlFor="description">Mô tả</label>
            <textarea
              name="description"
              id="description"
              cols="30"
              rows="10"
              className="textarea textarea-bordered"
              {...register("description")}
            ></textarea>
          </div>
          <div className="flex flex-col gap-2 py-4">
            <label htmlFor="content">Nội dung</label>
            <Editor name="content" control={control} />
          </div>

          <Button
            type="submit"
            variant="update"
            className="block text-lg font-bold w-full bg-blue-500 text-white py-3 rounded duration-300 hover:bg-blue-400"
          >
            {type === "add" ? "Thêm" : "Cập nhật"} blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
