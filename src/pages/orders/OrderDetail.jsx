import { collection, doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { db } from "../../configs/firebase-configs";

const OrderDetail = () => {
  const { id } = useParams();
  const [order, setOrder] = useState({});
  const orderRef = doc(collection(db, "orders"), id);
  const [user, setUser] = useState({});

  useEffect(() => {
    onSnapshot(orderRef, (res) => {
      setOrder({ id: res.id, ...res.data() });
      const userRef = doc(collection(db, "users"), res.data().uid);

      getDoc(userRef).then((uRes_) => {
        setUser({ id: uRes_.id, ...uRes_.data() });
      });
    });
  }, [id]);

  return (
    <div className="max-w-3xl mx-auto py-12 px-8 bg-white mt-20 shadow">
      {order && (
        <>
          <div className="flex items-center justify-between mb-4 text-lg font-medium">
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0 rounded-full overflow-hidden w-16 h-16">
                <img
                  src={user.avatar}
                  alt=""
                  className="w-full h-full object-cover"
                />
              </div>
              <span>{user.email}</span>
            </div>

            <span>UID: {user.id}</span>
          </div>
          <div className="flex items-center justify-between text-lg pb-6">
            <span className="font-medium">Order Id: {order.id}</span>
            <span className="capitalize">{order.status}</span>
          </div>
          <div className="py-10 border-gray-300 border-t border-b text-gray-400">
            {order.items?.length > 0 &&
              order.items.map((item) => (
                <div
                  className="flex items-center justify-between"
                  key={item.pid}
                >
                  <span>
                    {item.name} * {item.amount}
                  </span>
                  <span>${item.price}</span>
                </div>
              ))}
          </div>
          <div className="flex items-center justify-between mt-10 uppercase text-black font-semibold text-xl">
            <span>Total</span>
            <span>${order.total}</span>
          </div>
        </>
      )}
    </div>
  );
};

export default OrderDetail;
