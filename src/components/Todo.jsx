import React, { useEffect, useRef, useState } from "react";
import todo from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";
const Todo = () => {
  const [todolist, settodolist] = useState(
    localStorage.getItem("todo") ? JSON.parse(localStorage.getItem("todo")) : []
  );

  const inputref = useRef();
  const add = () => {
    const inputtext = inputref.current.value.trim();
    if (inputtext == "") {
      return null;
    }
    const newtodo = {
      id: Date.now(),
      Text: inputtext,
      iscomplete: false,
    };
    settodolist((prev) => {
      inputref.current.value = "";
      return [...prev, newtodo];
    });
  };

  const deletetodo = (id) => {
    settodolist((prvtodo) => {
      return prvtodo.filter((todo) => {
        return todo.id != id;
      });
    });
  };
  const toggle = (id) => {
    settodolist((prevtodo) => {
      return prevtodo.map((todo) => {
        if (todo.id === id) {
          return { ...todo, iscomplete: !todo.iscomplete };
        }
        return todo;
      });
    });
  };

  useEffect(() => {
    localStorage.setItem("todo", JSON.stringify(todolist));
  }, [todolist]);
  return (
    <div className="bg-white flex-item-center place-self-center w-80 flex flex-col p-7 min-h-90 rounded-2xl">
      <div className="flex items-center mt-6 gap-2.5">
        <img className="w-6" src={todo} />
        <h1 className="font-bold ">To-Do list</h1>
      </div>

      <div className=" flex items-center bg-gray-400 rounded-full h-10">
        <input
          ref={inputref}
          className=" focus:outline-0  pl-2  "
          type="text"
          placeholder="add your task"
        />
        <button
          onClick={add}
          className="  rounded-full border-none bg-amber-600  text-amber-50 h-10   cursor-pointer  text-amber-950 items-center-safe w-30  "
        >
          add+
        </button>
      </div>

      {/* --------todo list --------*/}
      <div>
        {todolist.map((item, index) => {
          return (
            <Todoitems
              key={index}
              Text={item.Text}
              id={item.id}
              iscomplete={item.iscomplete}
              deletetodo={deletetodo}
              toggle={toggle}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
