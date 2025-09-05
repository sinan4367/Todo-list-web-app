import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import todo from "../assets/todo_icon.png";
import Todoitems from "./Todoitems";

const API_URL = "http://localhost:5000/todos";

const Todo = () => {
  const [todolist, setTodolist] = useState([]);
  const inputref = useRef();

  // Fetch todos from backend
  useEffect(() => {
    axios.get(API_URL).then((res) => {
      setTodolist(res.data);
    });
  }, []);

  // Add todo
  const add = async () => {
    const inputtext = inputref.current.value.trim();
    if (inputtext === "") return;
    const newTodo = { Text: inputtext, iscomplete: false };

    const res = await axios.post(API_URL, newTodo);
    setTodolist((prev) => [...prev, res.data]);
    inputref.current.value = "";
  };

  // Delete todo
  const deletetodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodolist((prev) => prev.filter((todo) => todo._id !== id));
  };

  // Toggle complete
  const toggle = async (id, iscomplete) => {
    const res = await axios.patch(`${API_URL}/${id}`, {
      iscomplete: !iscomplete,
    });
    setTodolist((prev) =>
      prev.map((todo) => (todo._id === id ? res.data : todo))
    );
  };

  return (
    <div className="bg-white flex-item-center place-self-center w-80 flex flex-col p-7 min-h-90 rounded-2xl">
      <div className="flex items-center mt-6 gap-2.5">
        <img className="w-6" src={todo} alt="todo" />
        <h1 className="font-bold ">To-Do list</h1>
      </div>

      <div className="flex items-center bg-gray-400 rounded-full h-10">
        <input
          ref={inputref}
          className="focus:outline-0 pl-2"
          type="text"
          placeholder="add your task"
        />
        <button
          onClick={add}
          className="rounded-full border-none bg-amber-600 text-amber-50 h-10 cursor-pointer text-amber-950 items-center-safe w-30"
        >
          add+
        </button>
      </div>

      {/* --------todo list --------*/}
      <div>
        {todolist.map((item) => (
          <Todoitems
            key={item._id}
            Text={item.Text}
            id={item._id}
            iscomplete={item.iscomplete}
            deletetodo={deletetodo}
            toggle={toggle}
          />
        ))}
      </div>
    </div>
  );
};

export default Todo;
