import React from "react";
import { BlogItem, BlogList } from "../../components/ui/blog/BlogUi";
import BlogForm from "../../components/ui/form/BlogForm";

const Blogs = () => {
  return (
    <div>
      <BlogForm />

      <div className="container">
        <BlogList>
          <BlogItem />
          <BlogItem />
          <BlogItem />
        </BlogList>
      </div>
    </div>
  );
};

export default Blogs;
