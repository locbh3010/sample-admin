import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  onSnapshot,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Trash from "../../components/icon/Trash";
import { db } from "../../configs/firebase-configs";
import { useUpdateDoc } from "../../hooks/firestore-hook";
const Select = ({ children, ...props }) => {
  return (
    <select
      className="py-4 w-full px-4 appearance-none rounded bg-white/80 border border-gray-300 outline-none duration-300 focus:shadow-md font-medium text-slate-800 focus:border-blue-500 capitalize"
      {...props}
    >
      {children}
    </select>
  );
};
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
    if (status === "reject") {
      data.items.length > 0 &&
        data.items.map((item) => {
          const id = item.pid;
          const amount = item.amount;
          const productRef = doc(collection(db, "products"), id);
          getDoc(productRef).then((res) => {
            const pData = res.data();
            pData.count += amount;
            updateDoc(productRef, pData);
          });
        });
    }
    const updateData = {
      path: "orders",
      id,
      data,
    };
    handleUpdate(updateData);
  };
  const handleDeleteOrder = () => {
    const deleteRef = doc(collection(db, "orders"), id);
    deleteDoc(deleteRef).then(() => {
      toast.success("Xóa đơn hàng thành công");
    });
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
            <Select defaultValue={data.status} onChange={handleSelectChange}>
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
            </Select>
          </td>
          <td className="py-4 px-6">{data.date.toDate().toDateString()}</td>
          <td className="py-4 px-6">${data.total}</td>
          <td className="py-4 px-6 ">
            <Link to={`/order/${id}`}>View detail</Link>
          </td>
          {data.status === "reject" && (
            <td
              className="flex items-center justify-center w-12 h-12 text-white bg-red-500 rounded-full cursor-pointer absolute left-0 -translate-y-1/2 top-1/2 -translate-x-[calc(100%+20px)] duration-300 hover:bg-red-400"
              onClick={handleDeleteOrder}
            >
              <Trash width="20px" />
            </td>
          )}
        </tr>
      )}
    </>
  );
};
const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState(0);
  const [statis, setStatis] = useState({
    pending: 0,
    active: 0,
    shipping: 0,
    resolve: 0,
  });

  const orderRef = collection(db, "orders");
  const [filter, setFilter] = useState({
    status: 0,
    date: 0,
  });
  const handleGetData = (res) => {
    let temp = [];
    let total_ = 0;
    res.docs?.length > 0 &&
      res.docs.map((doc) => {
        temp.push({ id: doc.id, data: { ...doc.data() } });
        total_ += doc.data().total;
      });

    setTotal(total_);
    setOrders(temp);
  };

  useEffect(() => {
    onSnapshot(orderRef, (res) => {
      let temp = {
        pending: [],
        active: [],
        shipping: [],
        resolve: [],
      };
      res.docs?.length > 0 &&
        res.docs.map((doc) => {
          const status = doc.data().status;

          if (status === "pending") {
            temp[status].push({ ...doc.data() });
          } else if (status === "active") {
            temp[status].push({ ...doc.data() });
          } else if (status === "shipping") {
            temp[status].push({ ...doc.data() });
          } else if (status === "resolve") {
            temp[status].push({ ...doc.data() });
          }
        });

      setStatis({
        pending: temp.pending.length,
        active: temp.active.length,
        shipping: temp.shipping.length,
        resolve: temp.resolve.length,
      });
    });
  }, []);
  useEffect(() => {
    let dateWhere;
    let querySnapshot;
    const statusWhere = where("status", "==", filter.status);
    const date = filter.date;
    const miliHour = 60 * 60 * 1000;
    const miliDay = 24 * miliHour;

    switch (date) {
      case "hour":
        const miliBefore1Hour = Timestamp.now().toMillis() - miliHour;
        const timestampBefore1Hour = Timestamp.fromMillis(miliBefore1Hour);
        dateWhere = where("date", ">=", timestampBefore1Hour);
        break;
      case "day":
        const miliBefore1Day = Timestamp.now().toMillis() - miliDay;
        const timestampBefore1Day = Timestamp.fromMillis(miliBefore1Day);
        dateWhere = where("date", ">=", timestampBefore1Day);
        break;
      case "week":
        const miliBefore1Week = Timestamp.now().toMillis() - 7 * miliDay;
        const timestampBefore1Week = Timestamp.fromMillis(miliBefore1Week);
        dateWhere = where("date", ">=", timestampBefore1Week);
        break;
      case "month":
        const miliBefore30Day = Timestamp.now().toMillis() - 30 * miliDay;
        const timestampBefore30Day = Timestamp.fromMillis(miliBefore30Day);
        dateWhere = where("date", ">=", timestampBefore30Day);
        break;

      default:
        break;
    }

    if (!filter.status && !filter.date) {
      querySnapshot = orderRef;
    } else if (filter.status && !filter.date) {
      querySnapshot = query(orderRef, statusWhere);
    } else if (filter.date && !filter.status) {
      querySnapshot = query(orderRef, dateWhere);
    } else {
      querySnapshot = query(orderRef, dateWhere, statusWhere);
    }

    onSnapshot(querySnapshot, handleGetData);
  }, [filter]);
  const handleSelectChange = (e) => {
    if (e.target.value === "0") {
      setFilter({
        ...filter,
        [e.target.dataset.type]: 0,
      });
    } else {
      setFilter({
        ...filter,
        [e.target.dataset.type]: e.target.value,
      });
    }
  };

  return (
    <div className="py-16">
      <div className="container">
        <div className="grid grid-cols-4 gap-6 text-white capitalize font-bold text-2xl mb-10">
          <div className="rounded-lg bg-blue-500 shadow aspect-video py-6 px-9">
            Chờ xác nhận: {statis.pending}
          </div>
          <div className="rounded-lg bg-pink-500 shadow aspect-video py-6 px-9">
            Đã xác nhận: {statis.active}
          </div>
          <div className="rounded-lg bg-red-500 shadow aspect-video py-6 px-9">
            Đang giao: {statis.shipping}
          </div>
          <div className="rounded-lg bg-green-500 shadow aspect-video py-6 px-9">
            Đơn đã giao: {statis.resolve}
          </div>
        </div>

        <div className="mb-6 grid grid-cols-4 gap-6">
          <Select data-type="status" onChange={handleSelectChange}>
            <option value="0">Chọn trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="active">Đã xác nhận</option>
            <option value="shipping">Đang giao</option>
            <option value="resolve">Hoàn thành</option>
            <option value="reject">Đã hủy</option>
          </Select>
          <Select data-type="date" onChange={handleSelectChange}>
            <option value="0">Tất cả đơn</option>
            <option value="hour">1 giờ trước</option>
            <option value="day">Ngày hôm nay</option>
            <option value="week">7 ngày trước</option>
            <option value="month">30 ngày trước</option>
          </Select>
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
            {orders.length > 0 &&
              orders.map((order) => <Item key={order.id} order={order} />)}
          </tbody>
        </table>
        <div className="w-full px-4 py-3 bg-gray-400 font-semibold text-lg text-white uppercase">
          <span>
            tổng tiền : ${total} - {orders.length} đơn hàng
          </span>
        </div>
      </div>
    </div>
  );
};

export default Orders;
