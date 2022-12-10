import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDeleteDoc } from "../../../hooks/firestore-hook";

export const BlogList = ({ children }) => {
  return (
    <div className="grid grid-cols-3 gap-12 grid-flow-row auto-rows-fr">
      {children}
    </div>
  );
};

export const BlogItem = ({ blog }) => {
  const navigate = useNavigate();
  const [handleDelete] = useDeleteDoc();

  const handleNavigate = () => {
    navigate(`/blog/${blog.id}`);
  };
  const onRemoveBlog = () => {
    handleDelete("blogs", blog.id, blog.slug);
  };
  return (
    <div className="card gap-5.5">
      <figure
        className="aspect-video overflow-hidden rounded-lg flex-shrink-0 cursor-pointer"
        onClick={handleNavigate}
      >
        <img
          src={blog.image}
          alt=""
          className="w-full h-full object-cover duration-300 group-hover:scale-125"
        />
      </figure>
      <div className="flex flex-col flex-1 mt-2 card-body p-0">
        <span className="block text-gray-400 text-sm capitalize">
          {blog.categories} - {blog.createAt.toDate().toDateString()}
        </span>
        <p
          className="mt-1 mb-3.5 capitalize text-xl line-clamp-2 text-black cursor-pointer card-title"
          onClick={handleNavigate}
        >
          {blog.name}
        </p>
        <span className="text-gray-dark mb-6 line-clamp-2 mt-auto">
          {blog.description}
        </span>

        <div className="overflow-hidden grid grid-cols-2">
          <button
            className="btn btn-primary rounded-r-none"
            onClick={handleNavigate}
          >
            Read More
          </button>
          <button
            className="btn btn-error text-white rounded-l-none"
            onClick={onRemoveBlog}
          >
            Delete Blog
          </button>
        </div>
      </div>
    </div>
  );
};
