import React from "react";
import ContactItem, { ContactItemShimmer } from "./ContactItem";

const Contacts = () => {
  return (
    <div className="bg-slate-500 text-white rounded-lg p-2 m-2 h-full w-1/4">
      <input
        type="text"
        className="w-11/12 h-10 text-black p-2 m-3 rounded-sm   "
        placeholder="search contact here"
      />
      <ContactItemShimmer />
    </div>
  );
};

export default Contacts;
