import {
  collection,
  doc,
  documentId,
  getCountFromServer,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import CommentUi from "../../components/ui/comment/CommentUi";
import Input from "../../components/ui/input/Input";
import { db, storage } from "../../configs/firebase-configs";
import { useUpdateDoc } from "../../hooks/firestore-hook";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useShowError } from "../../hooks/useValid";
import { nameRegExp, phoneRegExp, titleCase } from "../../utils/function";
import { toast } from "react-toastify";

const schema = yup.object().shape({
  fullname: yup
    .string()
    .required("Vui lòng nhập họ tên")
    .matches(nameRegExp, "Họ tên không có ký tự đặc biệt"),
  email: yup
    .string()
    .required("Vui lòng nhập email")
    .email("Email sai định dạng"),
  phone: yup
    .string()
    .required("Vui lòng nhập số điện thoại")
    .matches(phoneRegExp, "Số điện thoại không đúng")
    .min(10, "Số điện thoại tối thiểu 10 số")
    .max(11, "Số điện thoại tối đa 11 số"),
});
const User = () => {
  const {
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(schema),
  });
  const { id } = useParams();
  const [user, setUser] = useState({});
  const [avatar, setAvatar] = useState(null);
  const [handleUpdate] = useUpdateDoc();
  const [comments, setComments] = useState([]);
  const [handleShowErr] = useShowError(errors);

  useEffect(() => {
    if (id) {
      const userRef = doc(collection(db, "users"), id);
      const commentsRef = query(
        collection(db, "comments"),
        where("userRef", "==", userRef)
      );
      onSnapshot(userRef, (res) => {
        setUser({ id: res.id, ...res.data() });
        const data = res.data();

        for (const key in data) {
          setValue(key, data[key]);
        }
        setAvatar(data.avatar);
      });
      onSnapshot(commentsRef, (res) => {
        let temp = [];
        res.docs.length > 0 &&
          res.docs.map((doc) =>
            temp.push({ id: doc.id, data: { ...doc.data() } })
          );
        setComments(temp);
      });
    }
  }, [id]);
  useEffect(() => {
    handleShowErr();
  }, [errors]);

  const handleUpdateUser = async (value) => {
    value.fullname = titleCase(value.fullname);
    const userSameEmail = query(
      collection(db, "users"),
      where("email", "==", value.email),
      where(documentId(), "!=", user.id)
    );
    const count = await getCountFromServer(userSameEmail);
    if (value.phone[0] !== 0) {
      toast.error("Số điện thoại phải bắt đầu bằng 0");
      return;
    } else if (count.data().count === 0) {
      handleUpdate({ path: "users", id: user.id, data: value });
      return;
    } else {
      toast.error("Email bị trùng lặp");
      return;
    }
  };
  const handleUploadImage = (file) => {
    if (file) {
      const path = user.id;
      const storageRef = ref(storage, `images/${path}/${file.name}`);
      uploadBytes(storageRef, file)
        .then(async (snapshot) => {
          const downloadURL = await getDownloadURL(snapshot.ref);
          setValue("avatar", downloadURL);
          setAvatar(downloadURL);
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
    const file = e.target.files[0];
    handleUploadImage(file);
  };

  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-4">
          <label className="w-24 h-24 rounded-full bg-gray-400 flex items-center justify-center overflow-hidden">
            {avatar ? (
              <img src={avatar} alt="" className="w-full h-full object-cover" />
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8 text-gray-300"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
                />
              </svg>
            )}
            <input
              type="file"
              className="hidden"
              onChange={handleInputChange}
            />
          </label>
          <span>{user?.id}</span>
        </div>

        <div className="py-16">
          <form onSubmit={handleSubmit(handleUpdateUser)}>
            <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-fr mb-12">
              <Input name="fullname" control={control} display="Họ và tên" />
              {/* <Input name="username" control={control} display="User name" /> */}
              <Input name="email" control={control} display="Email" />
              <Input name="phone" control={control} display="Số điện thoại" />
            </div>
            <button
              type="submit"
              className="text-white bg-black py-4 w-full font-medium uppercase border-2 border-black duration-300 hover:text-black hover:bg-transparent"
            >
              Lưu thay đổi
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-10">
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentUi key={comment.id} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default User;
