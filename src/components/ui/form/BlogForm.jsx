import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import PhotoIcon from "../../icon/PhotoIcon";
import Button from "../button/Button";
import Editor from "../input/Editor";
import Input from "../input/Input";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../../configs/firebase-configs";
import { useAddDoc } from "../../../hooks/firestore-hook";
import { useAuth } from "../../../contexts/AuthContext";

const BlogForm = ({ type = "add" }) => {
  const { control, handleSubmit, getValues, setValue, watch } = useForm({
    mode: onchange,
  });
  const [image, setImage] = useState(null);
  const watchSlug = watch("slug");
  const [handleAddDoc] = useAddDoc();
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
    handleAddDoc("blogs", value);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(handleAddBlog)}>
        <div className="max-w-2xl mx-auto py-8 flex flex-col gap-6">
          <Input
            control={control}
            name="categories"
            placeholder="Nhập loại blog"
            display="Loại blog"
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              control={control}
              name="slug"
              placeholder="Nhập đường dẫn blog"
              display="Đường dẫn blog"
            />
            <Input
              control={control}
              name="blog"
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
          <Editor name="description" control={control} />

          <Button
            type="submit"
            variant="update"
            className="block text-lg font-bold w-full bg-blue-500 text-white py-3 rounded duration-300 hover:bg-blue-400"
          >
            Thêm blog
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogForm;
