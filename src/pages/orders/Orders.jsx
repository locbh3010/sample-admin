import {
  collection,
  onSnapshot,
  query,
  Timestamp,
  where,
} from "firebase/firestore";

import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { db } from "../../configs/firebase-configs";
import { useUpdateDoc } from "../../hooks/firestore-hook";
const Item = ({ order }) => {
  const id = order.id;
  const data = order.data;
  const [status, setStatus] = useState(null);
  const [handleUpdate] = useUpdateDoc();

  const handleSelectChange = (e) => {
    if (e.target.value === "pending" && data.status !== "pending") {
      e.target.value = data.status;
      toast.error("Không thể thay đổi về pending");
    } else {
      setStatus(e.target.value);
    }
  };
  const handleUpdateItem = () => {
    data.status = status;
    const updateData = {
      path: "orders",
      id,
      data,
    };
    console.log(updateData);
    handleUpdate(updateData);
  };

  return (
    <>
      {data && (
        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 relative">
          <th
            scope="row"
            className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
          >
            {id}
          </th>
          <td className="py-4 px-6 relative">
            <div
              className={`flex items-center justify-center p-3 text-white bg-blue-500 rounded-full cursor-pointer absolute left-0  top-1/2 -translate-y-1/2 duration-300 -translate-x-[90%] ${
                status && status !== data.status
                  ? "opacity-100 visible"
                  : "opacity-0 invisible"
              }`}
              onClick={handleUpdateItem}
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
                  d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                />
              </svg>
            </div>
            <select
              className="py-4 w-full px-4 appearance-none rounded bg-white/80 border border-gray-300 outline-none duration-300 focus:shadow-md font-medium text-slate-800 focus:border-blue-500 capitalize"
              defaultValue={data.status}
              onChange={handleSelectChange}
            >
              <option value="pending" disabled={data.status !== "pending"}>
                Chờ xác nhận
              </option>
              <option value="active" disabled={data.status !== "pending"}>
                xác nhận
              </option>
              <option
                value="shipping"
                disabled={data.status === "resolve" || data.status === "reject"}
              >
                đang giao
              </option>
              <option
                value="resolve"
                disabled={
                  data.status === "reject" || data.status !== "shipping"
                }
              >
                hoàn thành
              </option>
              <option value="reject" disabled={data.status === "resolve"}>
                đã hủy
              </option>
            </select>
          </td>
          <td className="py-4 px-6">{data.date.toDate().toDateString()}</td>
          <td className="py-4 px-6">${data.total}</td>
          <td className="py-4 px-6 ">
            <Link to={`/order/${id}`}>View detail</Link>
          </td>
        </tr>
      )}
    </>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [active, setActive] = useState([]);
  const [pending, setPending] = useState([]);
  const [shipping, setShipping] = useState([]);
  const [orderToday, setOrderToday] = useState([]);
  const orderRef = collection(db, "orders");

  useEffect(() => {
    const now = new Date();
    now.setHours(5, 0, 0, 0);
    const timestamp = Timestamp.fromDate(now);
    const orderToDay = query(
      collection(db, "orders"),
      where("date", ">", timestamp)
    );
    onSnapshot(orderRef, (res) => {
      let temp = [];
      setActive([]);
      setPending([]);
      setShipping([]);
      const docs = res.docs;
      docs?.length > 0 &&
        docs.map((doc) => {
          temp.push({ id: doc.id, data: { ...doc.data() } });

          switch (doc.data().status) {
            case "pending":
              setPending((oldValue) => [
                ...oldValue,
                { id: doc.id, ...doc.data() },
              ]);
              break;
            case "active":
              setActive((oldValue) => [
                ...oldValue,
                { id: doc.id, ...doc.data() },
              ]);
              break;
            case "shipping":
              setShipping((oldValue) => [
                ...oldValue,
                { id: doc.id, ...doc.data() },
              ]);
              break;
            case "resolve":
              break;
            case "reject":
              break;

            default:
              break;
          }
        });
      setOrders(temp);
    });
    onSnapshot(orderToDay, (res) => {
      setOrderToday([]);
      const docs = res.docs;
      docs?.length > 0 &&
        docs.map((doc) =>
          setOrderToday((oldValue) => [
            ...oldValue,
            { id: doc.id, ...doc.data() },
          ])
        );
    });
  }, []);

  return (
    <div className="py-16">
      <div className="container">
        <div className="grid grid-cols-4 gap-6 text-white capitalize font-bold text-2xl mb-10">
          <div className="rounded-lg bg-blue-500 shadow aspect-video py-6 px-9">
            Chờ xác nhận: {pending.length}
          </div>
          <div className="rounded-lg bg-pink-500 shadow aspect-video py-6 px-9">
            Đã xác nhận: {active.length}
          </div>
          <div className="rounded-lg bg-red-500 shadow aspect-video py-6 px-9">
            Đang giao: {shipping.length}
          </div>
          <div className="rounded-lg bg-green-500 shadow aspect-video py-6 px-9">
            Đơn hôm nay: {orderToday.length}
          </div>
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                order id
              </th>
              <th scope="col" className="py-3 px-6">
                status
              </th>
              <th scope="col" className="py-3 px-6">
                date
              </th>
              <th scope="col" className="py-3 px-6">
                total
              </th>
              <th scope="col" className="py-3 px-6">
                action
              </th>
            </tr>
          </thead>
          <tbody>
            {orders?.length > 0 &&
              orders.map((order) => <Item key={order.id} order={order} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
