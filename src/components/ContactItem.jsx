import React from "react";

const ContactItem = () => {
  return (
    <div className="flex p-2 mt-2">
      <div className="rounded-[50%] h-14 w-16 bg-white mx-2"></div>
      <div className="mx-2 px-2 flex flex-col w-full">
        <span>Bhushan Kumbhar</span>
        <div className="w-full flex justify-between mt-1">
          <span>Good Morning</span>
          <span>Sat</span>
        </div>
      </div>
    </div>
  );
};

export const ContactItemShimmer = () => {
  return (
    <div className="animate-pulse flex p-2 mt-2">
      <div className="rounded-[50%] h-14 w-16 bg-slate-700 mx-2"></div>
      <div className="mx-2 px-2 flex flex-col w-full">
        <span className="rounded-md bg-slate-700 h-6 w-32"></span>
        <div className="w-full flex justify-between mt-1">
          <span className="rounded-md bg-slate-700 h-6 w-44"></span>
          <span className="rounded-md bg-slate-700 h-6 w-12"></span>
        </div>
      </div>
    </div>
  );
};

export default ContactItem;
