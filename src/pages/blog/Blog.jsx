import React from "react";
import BlogForm from "../../components/ui/form/BlogForm";

const Blog = () => {
  return (
    <div>
      <div className="max-w-4xl mx-auto py-12">
        <BlogForm type="update" />
      </div>
    </div>
  );
};

export default Blog;
