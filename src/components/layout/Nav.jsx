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
      <div className="navbar">
        <div className="navbar-start w-full">
          <ul className="menu menu-horizontal">
            <li>
              <NavLink to="/">Trang chủ</NavLink>
            </li>
            <li>
              <NavLink to="/products">Quản lý sản phẩm</NavLink>
            </li>
            <li>
              <NavLink to="/categories">Quản lý danh mục</NavLink>
            </li>
            <li>
              <NavLink to="/users">Quản lý người dùng</NavLink>
            </li>
            <li>
              <NavLink to="/blogs">Quản lý blog</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Quản lý đơn hàng</NavLink>
            </li>
            <li>
              <NavLink to="/comments">Quản lý bình luận</NavLink>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className={`flex items-center w-full`}>
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
                  className="ml-5 btn btn-primary"
                  onClick={handleSignOut}
                >
                  Sign out
                </button>
              </div>
            ) : (
              <Link to={`/sign-in`} className="btn ml-auto px-6 btn-primary">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Nav;
