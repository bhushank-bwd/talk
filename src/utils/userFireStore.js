import {
  addDoc,
  doc,
  getDocs,
  query,
  serverTimestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { usersCollectionRef } from "./fireBase";

export const addUserToFireStore = async (user) => {
  const q = query(usersCollectionRef, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size <= 0) {
    const docRef = await addDoc(usersCollectionRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      docId: "",
      createdAt: serverTimestamp(),
    });
    await updateDoc(docRef, {
      docId: docRef.id,
    });
    return docRef.id;
  } else {
    const userDocRef = doc(usersCollectionRef, querySnapshot.docs[0].id);
    const display_name = user.displayName.toLowerCase();
    await updateDoc(userDocRef, {
      displayName: user.displayName,
      display_name: display_name,
    });
    return querySnapshot.docs[0].id;
  }
};
// const q = query(usersCollectionRef);
// onSnapshot(q, (snapshot) => {
//   console.log("33", snapshot);
// });
