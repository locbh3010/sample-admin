import { collection, deleteDoc, doc } from "firebase/firestore";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../../configs/firebase-configs";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";

export function Table({ children }) {
  return <table className="min-w-full">{children}</table>;
}

export function Th({ children }) {
  return (
    <th
      scope="col"
      className="text-sm font-medium text-gray-900 px-6 py-4 text-left"
    >
      {children}
    </th>
  );
}

export function Td({ children }) {
  return (
    <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
      {children}
    </td>
  );
}

export function UserItem({ data, index }) {
  const navigate = useNavigate();
  const handleDeleteUser = () => {
    const id = data.id;
    const docRef = doc(collection(db, "users"), id);
    deleteDoc(docRef).then(() => {
      toast.success("Xóa thành công");
    });
  };
  const handleNavigate = () => {
    // navigate({
    //   pathname: "/users",
    //   search: `?update=${data.id}`,
    // });
    navigate(`/user/${data.id}`);
  };
  return (
    <tr className="border-b">
      <Td>
        <div className="rounded-full bg-gray-400 overflow-hidden w-12 h-12 flex-shrink-0">
          <img
            src={data?.avatar}
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
      </Td>
      <Td>{data.id}</Td>
      <Td>{data.email}</Td>
      <Td>{data.username}</Td>
      <Td>
        <div className="flex items-center gap-2">
          <button
            className="bg-red-500 block rounded py-2 px-2 flex-center text-white font-bold"
            onClick={handleDeleteUser}
          >
            <Trash width="20px" />
          </button>
          <button
            className="bg-blue-500 block rounded py-2 px-2 flex-center text-white font-bold"
            onClick={handleNavigate}
          >
            <Pencil width="20px" />
          </button>
        </div>
      </Td>
    </tr>
  );
}
