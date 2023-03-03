import React, { useState, useRef } from "react";
import { v4 as uuidv4 } from "uuid";


export default function App() {
  const [todos, setTodos] = useState([]);
  const todoNameRef = useRef();

  function handleAddTodo(e: Event) {
    const name = todoNameRef.current.value;
    if (name === "") return;
    setTodos((prevTodos) => {
      let myuuid = uuidv4();
      return [...prevTodos, { id: myuuid, name: name, Complete: false }];
    });
    todoNameRef.current.value = null;
  }
  return (
    <>
      <h1>Welcome to my app</h1>
      <MyButton />
      <TodoList todoList={todos} />
      <input type="text" ref={todoNameRef} />
      <button onClick={handleAddTodo}>Add Todo</button>
      <button>Clear Completed Todos</button>
      <div>0 left to do</div>
    </>
  );
}

function MyButton() {
  return (
    <button>'>>>>>>>>'
    </button>
  );
}

function TodoList({ todoList }) {
  return todoList.map((todo) => {
    return <Todo key={todo.id} todoList={todo} />;
  });
}

function Todo({ todoList }) {
  return (
    <div>
      <label>
        <input type="checkbox" name="1" id="in1" checked={todoList.complete} />
        {todoList.name}
      </label>
    </div>
  );
}
