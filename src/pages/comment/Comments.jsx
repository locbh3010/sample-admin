import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CommentUi from "../../components/ui/comment/CommentUi";
import { db } from "../../configs/firebase-configs";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const commentCol = collection(db, "comments");

  useEffect(() => {
    onSnapshot(commentCol, (res) => {
      let temp = [];
      res.docs.length > 0 &&
        res.docs.map((doc) => {
          temp.push({ id: doc.id, data: { ...doc.data() } });
        });
      setComments(temp);
    });
  }, []);
  return (
    <div className="py-24">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold capitalize mb-12">
          Quản lý bình luận
        </h1>
        <div className="flex flex-col gap-4">
          {comments.length > 0 &&
            comments.map((comment) => (
              <CommentUi key={comment.id} comment={comment} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Comments;
