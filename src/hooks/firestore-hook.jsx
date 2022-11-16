import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { deleteObject, listAll, ref } from "firebase/storage";
import { toast } from "react-toastify";
import { db, storage } from "../configs/firebase-configs";

export function useAddDoc() {
  const handleAddDoc = (path, data) => {
    const colRef = collection(db, path);
    addDoc(colRef, data).then(() => {
      toast.success("Thêm thành công");
    });
  };

  return [handleAddDoc];
}

export function useUpdateDoc() {
  const handleUpdate = ({ path, id, data }) => {
    const docRef = doc(collection(db, path), id);
    updateDoc(docRef, data).then(() => {
      toast.success("Cập nhật thành công");
    });
  };

  return [handleUpdate];
}

export function useDeleteDoc() {
  const handleRemove = (path, id, filePath) => {
    const docRef = doc(collection(db, path), id);
    const listImage = ref(storage, `images/${filePath}`);

    deleteDoc(docRef)
      .then(async () => {
        await listAll(listImage).then(async (res) => {
          const items = res.items;

          (await items?.length) > 0 &&
            items.map((item) => {
              const imageRef = ref(storage, item.fullPath);
              deleteObject(imageRef);
            });
          toast.success("Xóa thành công");
        });
      })
      .catch((err) => {
        if (err) toast.error("Bạn không phải admin");
      });
  };

  return [handleRemove];
}
