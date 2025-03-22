import { db } from "../../Frontend/src/firebaseConfig";
import {
  collection,
  addDoc,
  serverTimestamp,
  updateDoc,
  deleteDoc,
  doc,
  getDocs
} from "firebase/firestore";

// 🔄 CREATE POST
export const createPost = async ({ content, imageFile, user }) => {
  try {
    let imageUrl = "";

    // Upload image to Cloudinary if provided
    if (imageFile) {
      const formData = new FormData();
      formData.append("file", imageFile);
      formData.append("upload_preset", "your_upload_preset");

      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      imageUrl = data.secure_url;
    }

    // Save post to Firestore
    const postRef = await addDoc(collection(db, "posts"), {
      content,
      imageUrl,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
      user: {
        uid: user.uid,
        username: user.username,
        fullName: user.fullName,
      },
    });

    return { success: true, id: postRef.id };
  } catch (error) {
    console.error("❌ Error creating post:", error);
    return { success: false, error: error.message };
  }
};

// ✏️ UPDATE POST
export const updatePost = async ({ postId, newContent, newImageFile }) => {
  try {
    const postRef = doc(db, "posts", postId);
    let updatedData = {
      content: newContent,
      updatedAt: serverTimestamp(),
    };

    // If new image is provided
    if (newImageFile) {
      const formData = new FormData();
      formData.append("file", newImageFile);
      formData.append("upload_preset", "your_upload_preset");

      const res = await fetch("https://api.cloudinary.com/v1_1/your_cloud_name/image/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      updatedData.imageUrl = data.secure_url;
    }

    await updateDoc(postRef, updatedData);

    return { success: true };
  } catch (error) {
    console.error("❌ Error updating post:", error);
    return { success: false, error: error.message };
  }
};

// 🗑️ DELETE POST (also deletes its comments)
export const deletePost = async (postId) => {
  try {
    const postRef = doc(db, "posts", postId);

    // Delete comments first
    const commentsSnapshot = await getDocs(collection(db, "posts", postId, "comments"));
    const deletePromises = commentsSnapshot.docs.map((doc) => deleteDoc(doc.ref));
    await Promise.all(deletePromises);

    // Then delete post
    await deleteDoc(postRef);

    return { success: true };
  } catch (error) {
    console.error("❌ Error deleting post:", error);
    return { success: false, error: error.message };
  }
};
