import React, { useEffect, useState } from "react";
import UserForm from "../../components/ui/form/UserForm";
import { Table, Th, UserItem } from "../../components/ui/table/Table";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../configs/firebase-configs";
import { useNavigate } from "react-router-dom";

const Users = () => {
  const userRef = collection(db, "users");
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    onSnapshot(userRef, (res) => {
      const docs = res.docs;
      let temp = [];

      docs?.length > 0 &&
        docs.map((doc) =>
          temp.push({
            id: doc.id,
            ...doc.data(),
          })
        );

      setUsers(temp);
    });
  }, []);

  return (
    <div className="mt-14">
      <UserForm />
      <div className="container">
        <h1 className="text-3xl font-bold capitalize mb-12">
          Quản lý người dùng
        </h1>

        <div className="mt-16">
          <div className="bg-white p-1 mb-4 inline-flex rounded-full gap-1">
            <button
              className="btn btn-primary rounded-full px-6"
              onClick={() => {
                navigate({ pathname: "/users", search: "?add=true" });
              }}
            >
              Thêm người dùng
            </button>
          </div>
          <Table>
            <thead className="border-b bg-white">
              <tr>
                <Th>#</Th>
                <Th>UID</Th>
                <Th>Email</Th>
                <Th>Username</Th>
                <Th>Action</Th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {users?.length > 0 &&
                users.map((user, index) => (
                  <UserItem key={user.id} data={user} index={index} />
                ))}
            </tbody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Users;
