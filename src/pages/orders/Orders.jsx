import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../../configs/firebase-configs";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const orderRef = collection(db, "orders");
  const Item = (order) => {
    const data = order.order;
    return (
      <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
        <th
          scope="row"
          className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {data.id}
        </th>
        <td className="py-4 px-6">{data.status}</td>
        <td className="py-4 px-6">{data?.date.toDate().toDateString()}</td>
        <td className="py-4 px-6">${data.total}</td>
        <td className="py-4 px-6">View detail</td>
      </tr>
    );
  };

  useEffect(() => {
    onSnapshot(orderRef, (res) => {
      let temp = [];
      const docs = res.docs;
      docs?.length > 0 &&
        docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));
      setOrders(temp);
    });
  }, []);
  return (
    <div className="py-16">
      <div className="container">
        <div className="grid grid-cols-4 gap-6 text-white capitalize font-bold text-2xl mb-10">
          <div className="rounded-lg bg-blue-500 shadow aspect-video py-6 px-9">
            Chờ xác nhận: 10
          </div>
          <div className="rounded-lg bg-pink-500 shadow aspect-video py-6 px-9">
            Đã xác nhận: 20
          </div>
          <div className="rounded-lg bg-red-500 shadow aspect-video py-6 px-9">
            Đang giao: 15
          </div>
          <div className="rounded-lg bg-green-500 shadow aspect-video py-6 px-9">
            Đơn hôm nay: 30
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
