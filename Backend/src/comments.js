import { collection, addDoc, serverTimestamp, updateDoc, deleteDoc, doc } from "firebase/firestore";
import { db } from "../../Frontend/src/firebaseConfig";

// 💬 ADD COMMENT
export const addComment = async ({ postId, text, user }) => {
  try {
    const commentRef = await addDoc(collection(db, "posts", postId, "comments"), {
      text,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      user: {
        uid: user.uid,
        username: user.username,
        fullName: user.fullName
      }
    });

    return { success: true, id: commentRef.id };
  } catch (error) {
    console.error("❌ Error adding comment:", error);
    return { success: false, error: error.message };
  }
};

// ✏️ UPDATE COMMENT
export const updateComment = async ({ postId, commentId, newText }) => {
  try {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    await updateDoc(commentRef, {
      text: newText,
      updatedAt: serverTimestamp()
    });

    return { success: true };
  } catch (error) {
    console.error("❌ Error updating comment:", error);
    return { success: false, error: error.message };
  }
};

// 🗑️ DELETE COMMENT
export const deleteComment = async ({ postId, commentId }) => {
  try {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    await deleteDoc(commentRef);

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting comment:", error);
    return { success: false, error: error.message };
  }
};
