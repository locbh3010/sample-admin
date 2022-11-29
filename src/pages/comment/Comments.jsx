import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import CommentUi from "../../components/ui/comment/CommentUi";
import { db } from "../../configs/firebase-configs";

const Comments = () => {
  const [comments, setComments] = useState([]);
  const commentCol = collection(db, "comments");
  const [user, setUser] = useState({});

  useEffect(() => {
    onSnapshot(commentCol, (res) => {
      let temp = [];
      res.docs.length > 0 &&
        res.docs.map((doc) => {
          temp.push({ id: doc.id, data: { ...doc.data() } });
          onSnapshot(doc.data().userRef, (res_) => {
            setUser({ id: res_.id, ...res_.data() });
          });
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
        {comments.length > 0 &&
          comments.map((comment) => (
            <CommentUi key={comment.id} comment={comment} user={user} />
          ))}
      </div>
    </div>
  );
};

export default Comments;
