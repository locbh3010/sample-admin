import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { BlogItem, BlogList } from "../../components/ui/blog/BlogUi";
import BlogForm from "../../components/ui/form/BlogForm";
import { db } from "../../configs/firebase-configs";

const Blogs = () => {
  const blogRef = collection(db, "blogs");
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    onSnapshot(blogRef, (res) => {
      let temp = [];
      res.docs.length > 0 &&
        res.docs.map((doc) => temp.push({ id: doc.id, ...doc.data() }));

      setBlogs(temp);
    });
  }, []);
  return (
    <div>
      <BlogForm />

      <div className="container mb-20">
        <BlogList>
          {blogs.length > 0 &&
            blogs.map((blog) => <BlogItem key={blog.id} blog={blog} />)}
        </BlogList>
      </div>
    </div>
  );
};

export default Blogs;
