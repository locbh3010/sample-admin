import { addDoc, collection } from "firebase/firestore";
import { toast } from "react-toastify";
import { db } from "../configs/firebase-configs";

export function useAddDoc() {
  const handleAddDoc = (path, data) => {
    const colRef = collection(db, path);
    addDoc(colRef, data).then(() => {
      toast.success("Thêm danh mục thành công");
    });
  };

  return [handleAddDoc];
}
