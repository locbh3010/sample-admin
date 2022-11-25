import React, { useRef } from "react";
import Pencil from "../../icon/Pencil";
import Trash from "../../icon/Trash";

const CommentUi = () => {
  const detailRef = useRef(null);

  const handleToggleDetail = (e) => {
    detailRef.current.classList.toggle("hidden");
  };
  const handleCloseRef = () => {
    detailRef.current.classList.add("hidden");
  };
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
          <button className="bg-blue-500 rounded w-10 h-10 text-white flex items-center justify-center duration-300 hover:shadow-md">
            <Pencil />
          </button>
          <button className="bg-red-500 rounded w-10 h-10 text-white flex items-center justify-center duration-300 hover:shadow-md">
            <Trash />
          </button>
        </div>

        <div className="flex items-start gap-4 flex-col">
          <div className="flex items-start gap-4">
            <div className="w-20 h-20 rounded-full overflow-hidden bg-gray-400 flex-shrink-0">
              <img
                src="https://i.pinimg.com/236x/35/e2/94/35e294823844c49c38cfadf8a355c9bf.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </div>

            <div className="flex flex-col">
              <span className="font-bold text-lg capitalize">
                Lorem ipsum dolor sit amet.
              </span>
              <span className="text-gray-400 font-medium">
                Lorem, ipsum dolor.
              </span>
            </div>
          </div>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Hic
            sapiente et quasi nihil officia accusamus ad ullam, assumenda iste
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nobis, ad
            animi? Dolorum tempore asperiores quam laborum! Amet aliquid facilis
            consectetur.
          </p>
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
        <div className="bg-gray-400 rounded-full overflow-hidden w-24 h-24"></div>
        <div className="grid grid-cols-2 gap-4 grid-flow-row auto-rows-fr py-4">
          <div className="flex flex-col gap-1">
            <span className="font-semibold capitalize">Email</span>
            <span>huuloc@gmail.com</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold capitalize">Số điện thoại</span>
            <span>0356454288</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold capitalize">Họ tên</span>
            <span>Bùi Hữu Lộc</span>
          </div>
          <div className="flex flex-col gap-1">
            <span className="font-semibold capitalize">UID</span>
            <span>LKjif891j7a</span>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="aspect-video overflow-hidden rounded-lg shadow">
            <img
              src="https://media.vneconomy.vn/640x360/images/upload/2022/06/08/nft-free-jpg-optimal.jpg"
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="py-4 flex flex-col overflow-hidden text-ellipsis">
            <span className="font-bold text-xl mb-4">
              Lorem ipsum, dolor sit amet consectetur adipisicing.
            </span>
            <span className="text-gray-800">$400</span>
            <div className="text-gray-500">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Reiciendis, explicabo.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentUi;
