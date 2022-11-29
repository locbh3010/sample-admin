import {
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import JoditEditor from "jodit-react";
import React, { useEffect, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../configs/firebase-configs";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";

const CommentUi = ({ comment, user }) => {
  const detailRef = useRef(null);
  const commentRef = useRef(null);
  const descriptionProduct = useRef(null);
  const { data, id } = comment;
  const { productRef } = data;
  const [update, setUpdate] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState("");
  const [product, setProduct] = useState({});

  const handleToggleDetail = () => {
    detailRef.current.classList.toggle("hidden");
  };
  const handleCloseRef = () => {
    detailRef.current.classList.add("hidden");
  };
  const handleUpdate = () => {
    if (update) {
      const commentReference = doc(collection(db, "comments"), id);

      data.comment = commentUpdate || data.comment;

      updateDoc(commentReference, data).then(() => {
        toast.success("Cập nhật thành công");
      });
      setUpdate(false);
    } else {
      setCommentUpdate(data.comment);
      setUpdate(true);
    }
  };
  const handleDeleteComment = () => {
    const docRef = doc(collection(db, "comments"), id);
    deleteDoc(docRef).then(() => {
      toast.success("Xóa bình luận thành công");
    });
  };
  useEffect(() => {
    onSnapshot(productRef, (res) => {
      setProduct({ id: res.id, ...res.data() });
    });
  }, [comment]);

  useEffect(() => {
    descriptionProduct.current.textContent = "";
    descriptionProduct?.current?.insertAdjacentHTML(
      "beforeend",
      product.description
    );
  }, [product]);
  useEffect(() => {
    commentRef.current.textContent = "";
    commentRef.current.insertAdjacentHTML("beforeend", data.comment);
  }, [data]);
  return (
    <div className="w-full">
      <div className="bg-white px-4 py-6 rounded shadow">
        <div className="mb-10 flex items-center gap-2">
          <button
            className="bg-green-500 rounded w-10 h-10 text-white flex items-center justify-center duration-300 hover:shadow-md"
            onClick={handleToggleDetail}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
          <button
            className="bg-blue-500 rounded w-10 h-10 text-white flex items-center justify-center duration-300 hover:shadow-md"
            onClick={handleUpdate}
          >
            <Pencil />
          </button>
          <button
            className="bg-red-500 rounded w-10 h-10 text-white flex items-center justify-center duration-300 hover:shadow-md"
            onClick={handleDeleteComment}
          >
            <Trash />
          </button>
        </div>

        <div className="flex gap-4 flex-col">
          <div className="flex items-start gap-4">
            <NavLink
              to={`/user/${user.id}`}
              className="w-20 h-20 rounded-full overflow-hidden bg-gray-400 flex-shrink-0"
            >
              <img
                src={user.avatar}
                alt=""
                className="w-full h-full object-cover"
              />
            </NavLink>

            <div className="flex flex-col">
              <NavLink
                to={`/user/${user.id}`}
                className="font-bold text-lg capitalize"
              >
                {user.fullname}
              </NavLink>
              <span className="text-gray-400 font-medium">
                {data.createAt.toDate().toDateString()}
              </span>
            </div>
          </div>

          {update ? (
            <>
              <JoditEditor
                value={commentUpdate}
                onChange={(content) => setCommentUpdate(content)}
              ></JoditEditor>
              <button
                className="rounded-lg font-medium bg-transparent border border-blue-500 text-blue-500 px-6 py-3"
                onClick={handleUpdate}
              >
                Cập nhật
              </button>
            </>
          ) : (
            <p ref={commentRef}></p>
          )}
        </div>
      </div>
      <div
        className="my-4 bg-white rounded shadow py-8 px-4 hidden"
        ref={detailRef}
      >
        <div className="mb-3 flex">
          <button className="ml-auto" onClick={handleCloseRef}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-gray-400"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {product && (
            <>
              <div className="aspect-video overflow-hidden rounded-lg shadow">
                {product.images && (
                  <img
                    src={product.images[0]}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              <div className="py-4 flex flex-col overflow-hidden text-ellipsis">
                <span className="font-bold text-xl mb-4">{product?.name}</span>
                <span className="text-gray-800">${product?.price}</span>
                <div
                  className="text-gray-500 line-clamp-5"
                  ref={descriptionProduct}
                ></div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CommentUi;
