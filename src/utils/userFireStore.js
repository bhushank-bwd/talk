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
import getToken from "./getToken";

export const addUserToFireStore = async (user) => {
  const q = query(usersCollectionRef, where("uid", "==", user.uid));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.size <= 0) {
    const docRef = await addDoc(usersCollectionRef, {
      uid: user.uid,
      email: user.email,
      username: user.username,
      docId: "",
      createdAt: serverTimestamp(),
    });
    await updateDoc(docRef, {
      docId: docRef.id,
    });
    updateDocId(docRef.id);
    return docRef.id;
  } else {
    const userDocRef = doc(usersCollectionRef, querySnapshot.docs[0].id);
    updateDocId(querySnapshot.docs[0].id);
    return querySnapshot.docs[0].id;
  }
};
const updateDocId = async (doc_id) => {
  const authtoken = getToken();
  let updateDocIdResult = await fetch("http://localhost:5000/api/user/update", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "auth-token": authtoken,
    },
    body: JSON.stringify({
      doc_id,
    }),
  });
  updateDocIdResult = await updateDocIdResult.json();
};
// const q = query(usersCollectionRef);
// onSnapshot(q, (snapshot) => {
//   console.log("33", snapshot);
// });
