import React from "react";
import CommentUi from "../../components/ui/comment/CommentUi";

const Comments = () => {
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold capitalize mb-12">
          Quản lý người dùng
        </h1>
        <CommentUi />
      </div>
    </div>
  );
};

export default Comments;
