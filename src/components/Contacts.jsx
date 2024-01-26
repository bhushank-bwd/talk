import React, { useEffect, useState } from "react";
import ContactItem, { ContactItemShimmer } from "./ContactItem";
import { useSelector } from "react-redux";
import { addCacheSearch } from "../utils/chatSlice";
import { usersCollectionRef } from "../utils/fireBase";
import { getDocs, query, where } from "firebase/firestore";

const Contacts = () => {
  const { contacts } = useSelector((store) => store.chat);
  const user = useSelector((store) => store.user);
  const [searchQuery, setSearchQuery] = useState("");
  const [contactLoading, setContactLoading] = useState(false);
  const [searchList, setSearchList] = useState([]);
  const [search, setSearch] = useState(false);
  const cachedSearch = useSelector((store) => store.chat);
  useEffect(() => {
    // const timer = setTimeout(() => {
    //   if (cachedSearch[searchQuery]) {
    //     setSearchList(cachedSearch[searchQuery]);
    //   } else {
    //     searchData();
    //   }
    // }, 400);
    // return () => {
    //   clearTimeout(timer);
    // };
  }, [searchQuery]);

  const searchData = async () => {
    setContactLoading(true);
    console.log(searchQuery);
    if (user) {
      const q = query(
        usersCollectionRef,
        where("display_name", ">=", searchQuery.toLowerCase()),
        where("display_name", "<=", searchQuery.toLowerCase() + "\uf8ff"),
        where("uid", "!=", user.uid)
      );

      const querySnapshot = await getDocs(q);

      console.log("39", querySnapshot);
    }

    setContactLoading(false);
  };

  return (
    <div className="bg-slate-500 text-white rounded-lg p-2 m-2 h-full w-1/4">
      <input
        type="text"
        className="w-11/12 h-10 text-black p-2 m-3 rounded-sm   "
        placeholder="search contact here"
        value={searchQuery}
        onChange={(e) => {
          setSearchQuery(e.target.value);
        }}
      />
      {contacts.length > 0 ? (
        contacts.map((contact) => {
          console.log(contact);
          return <ContactItem contact={contact} />;
        })
      ) : (
        <h1 className="p-2">No contact Yet </h1>
      )}
      {contactLoading && <ContactItemShimmer />}
    </div>
  );
};

export default Contacts;
