import React from "react";
import tick from "../assets/tick.png";
import nottick from "../assets/not_tick.png";
import delete_ from "../assets/delete.png";

const Todoitems = ({ Text, id, iscomplete, deletetodo, toggle }) => {
  return (
    <div className="flex items-center my-3 gap-2">
      <div
        onClick={() => {
          toggle(id);
        }}
        className="flex  items-center"
      >
        <img className="w-7" src={iscomplete ? tick : nottick} alt="" />
        <p
          className={`text-amber-950  ml-2 w-50 decoration-black ${
            iscomplete ? "line-through" : ""
          }`}
        >
          {Text}
        </p>
      </div>
      <img
        onClick={() => {
          deletetodo(id);
        }}
        src={delete_}
        alt=""
        className="w-4 cursor-pointer  items-end"
      />
    </div>
  );
};

export default Todoitems;
