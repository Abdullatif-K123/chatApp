import React, { useState } from "react";
import {
  collection,
  getDoc,
  getDocs,
  query,
  setDoc,
  where,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const Search = () => {
  const [userName, setUserName] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const handleSearch = async () => {
    const q = query(
      collection(db, "users"),
      where("displayName", "==", userName)
    );
    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.data().uid === currentUser.uid) setErr(true);
        else {
          setUser(doc.data());
          setErr(false);
        }
      });
    } catch (err) {
      console.log("here is an error");
      setErr(true);
    }
  };
  const handleKey = (e) => {
    handleSearch();
    console.log("hello");
  };
  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;
    try {
      const res = await getDoc(doc(db, "chats", combinedId));
      if (!res.exists()) {
        //Create a new document
        await setDoc(doc(db, "chats", combinedId), { messages: [] });
        //Create user Chats
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (error) {
      setErr(true);
    }
    setUser(null);
    setUserName("");
  };
  return (
    <div className="search">
      <div className="searchform">
        <input
          type="text"
          placeholder="find your friends "
          onKeyDown={handleKey}
          onChange={(e) => {
            setUserName(e.target.value);
          }}
          value={userName}
        />
      </div>
      {err && <span>User Not Found !!!</span>}
      {user && (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt={user.displayName} />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
            <p>{user.lastMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
