import { db } from "../../Frontend/src/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDocs,
  query,
  orderBy,
  where
} from "firebase/firestore";

// 🔄 CREATE COMMENT
export const createComment = async ({ postId, content, user }) => {
  try {
    const commentRef = await addDoc(
      collection(db, "posts", postId, "comments"), 
      {
        content,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        user: {
          uid: user.uid,
          username: user.username,
          fullName: user.fullName,
        },
      }
    );

    return { success: true, id: commentRef.id };
  } catch (error) {
    console.error("❌ Error creating comment:", error);
    return { success: false, error: error.message };
  }
};

// 📚 GET ALL COMMENTS FOR A POST
export const getPostComments = async (postId) => {
  try {
    const commentsQuery = query(
      collection(db, "posts", postId, "comments"),
      orderBy("createdAt", "asc")
    );
    
    const commentsSnapshot = await getDocs(commentsQuery);
    const comments = commentsSnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    
    return { success: true, comments };
  } catch (error) {
    console.error("❌ Error fetching comments:", error);
    return { success: false, error: error.message };
  }
};

// ✏️ UPDATE COMMENT
export const updateComment = async ({ postId, commentId, newContent }) => {
  try {
    const commentRef = doc(db, "posts", postId, "comments", commentId);
    
    await updateDoc(commentRef, {
      content: newContent,
      updatedAt: serverTimestamp(),
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

// 📚 GET USER COMMENTS
export const getUserComments = async (userId) => {
  try {
    // This is more complex as we need to query across subcollections
    // We would need to get all posts first, then query comments in each
    const postsSnapshot = await getDocs(collection(db, "posts"));
    
    let userComments = [];
    const fetchPromises = postsSnapshot.docs.map(async (postDoc) => {
      const postId = postDoc.id;
      const commentsQuery = query(
        collection(db, "posts", postId, "comments"),
        where("user.uid", "==", userId)
      );
      
      const commentsSnapshot = await getDocs(commentsQuery);
      const comments = commentsSnapshot.docs.map(doc => ({
        id: doc.id,
        postId,
        ...doc.data()
      }));
      
      userComments = [...userComments, ...comments];
    });
    
    await Promise.all(fetchPromises);
    
    return { success: true, comments: userComments };
  } catch (error) {
    console.error("❌ Error fetching user comments:", error);
    return { success: false, error: error.message };
  }
};