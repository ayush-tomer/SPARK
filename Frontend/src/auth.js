import {
    getAuth,
    onAuthStateChanged ,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
  } from "firebase/auth";
  import {
    getFirestore,
    doc,
    setDoc,
    getDoc,
  } from "firebase/firestore";
  import { app } from "./firebaseConfig";
  
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  // Check if a username already exists in the 'usernames' collection
  export const checkUsernameExists = async (username) => {
    try {
      const docRef = doc(db, "usernames", username);
      const docSnap = await getDoc(docRef);
  
      // If the document exists, the username is taken
      return { success: true, exists: docSnap.exists() };
    } catch (error) {
      console.error("Error checking username:", error);
      return { success: false, error: error.message };
    }
  };
  
  // Register a new user with email, password, full name, and unique username
  export const signUp = async (email, password, fullName, username) => {
    try {
      // Check if the username already exists
      const { success, exists, error } = await checkUsernameExists(username);
      if (!success) return { success: false, error: error || "Error checking username" };
      if (exists) return { success: false, error: "Username already taken" };
  
      // Create user in Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      // Add the username to the 'usernames' collection
      await setDoc(doc(db, "usernames", username), { uid: user.uid });
  
      // Store additional user info in the 'users' collection
      const userData = {
        fullName,
        username,
        email,
        uid: user.uid,
      };
      await setDoc(doc(db, "users", user.uid), userData);
  
      console.log("✅ User Signed Up:", userData);
      return { success: true, user };
    } catch (error) {
      console.error("❌ Signup Error:", error);
      return { success: false, error: error.message };
    }
  };
  
  // Sign in an existing user with email and password
  export const signIn = async (email, password) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
  
      console.log("✅ User Signed In:", {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || "N/A",
      });
      return { success: true, user };
    } catch (error) {
      console.error("❌ Sign In Error:", error);
      return { success: false, error: error.message };
    }
  };
  
  // Sign out the current user
  export const logout = async () => {
    try {
      await signOut(auth);
      console.log("✅ User Logged Out");
      return { success: true };
    } catch (error) {
      console.error("❌ Logout Error:", error.message);
      return { success: false, error: error.message };
    }
  };
  
  export const getUserData = async () => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          try {
            const userDoc = await getDoc(doc(db, "users", user.uid));
            if (userDoc.exists()) {
              const userData = userDoc.data();
              console.log("✅ User Data:", userData);
              resolve(userData);
            } else {
              console.error("❌ User data not found!");
              reject("User data not found");
            }
          } catch (error) {
            console.error("❌ Error fetching user data:", error);
            reject(error.message);
          }
        } else {
          console.log("❌ No user logged in");
          reject("No user logged in");
        }
      });
    });
  };