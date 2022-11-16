import { signOut } from "firebase/auth";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { auth, db } from "../../configs/firebase-configs";
import { useAuth } from "../../contexts/AuthContext";

const handleSignOut = () => {
  signOut(auth);
  location.reload();
};

const Nav = () => {
  const { user } = useAuth();
  const uid = user?.uid;
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (uid) {
      const userRef = query(collection(db, "users"), where("uid", "==", uid));
      onSnapshot(userRef, (res) => {
        const doc = res.docs[0];
        setCurrentUser({
          id: doc.id,
          ...doc.data(),
        });
      });
    }
  }, [uid]);

  return (
    <div className="py-4 bg-white/80 text-slate-900/80 font-bold backdrop-blur sticky top-0 left-0 w-full z-50 shadow">
      <div className="container">
        <div className={`flex items-center w-full`}>
          <div className="flex items-center justify-center gap-4">
            <NavLink to="/">Trang chủ</NavLink>
            <NavLink to="/products">Quản lý sản phẩm</NavLink>
            <NavLink to="/categories">Quản lý danh mục</NavLink>
            <NavLink to="/users">Quản lý người dùng</NavLink>
          </div>

          {currentUser ? (
            <div className="ml-auto flex items-center">
              <span className="text-sm font-bold text-slate-900 mr-4 capitalize">
                {currentUser.username}
              </span>
              <div className="w-8 h-8 rounded-full bg-black relative">
                <img
                  src="https://png.pngtree.com/png-clipart/20210608/ourlarge/pngtree-dark-gray-simple-avatar-png-image_3418404.jpg"
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <button
                className="capitalize block font-medium px-6 py-2 bg-blue-500 rounded text-white hover:bg-blue-400 duration-300 whitespace-nowrap ml-5"
                onClick={handleSignOut}
              >
                Sign out
              </button>
            </div>
          ) : (
            <Link to={`/sign-in`} className="btn ml-auto px-6 py-2 rounded">
              Đăng nhập
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
