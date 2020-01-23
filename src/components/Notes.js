import React, { useState, useEffect } from "react";
import ReactLogo from "../Assets/react.png";
import TestingLibraryLogo from "../Assets/cypress.png";
import ToDoItem from "./ToDoItem";
import restApi from "../api/restApi";

const ToDo = () => {
  const [list, setList] = useState([]);
  const [toDo, setToDo] = useState({ title: '', text: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
      try {
          const res = await restApi.get('notes');
          setList(res);
          console.log(res);
      } catch (error) {
        console.log(error);
      }

  }
  const createNewToDoItem = () => {
    //validate todo
    if (!toDo.title) {
      alert("Please enter a todo!");
      return;
    }
    const newId = Math.max(...list.map((t) => t.id)) + 1;
    const newToDo = { id: newId, ...toDo };
    setList([...list, newToDo]);
    setToDo({ title: '', text: '' });
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      createNewToDoItem();
    }
  };

  const handleInput = (e) => {
    const oldState = {...toDo};
    oldState[e.target.name] = e.target.value;
    setToDo(oldState);
  };

  const deleteItem = (todo) => {
    setList(list.filter((item) => item !== todo));
  };

  return (
    <div className="ToDo">
      <img className="Logo" src={ReactLogo} alt="logo" />
      <img className="Logo" src={TestingLibraryLogo} alt="logo" />
      <h1 data-testid="header" className="ToDo-Header">
        React Notes App
      </h1>
      <div className="ToDo-Container">
        <div className="ToDo-Content">
          {list.map((item, index) => {
            return <ToDoItem index={index} key={item.id} item={item} deleteItem={deleteItem} />;
          })}
        </div>
        <div  className="ToDoInput">
          <input
            data-testid="todo-input"
            type="text"
            name="title"
            placeholder="title here"
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="ToDoItem-Text"
            style={{ width: '30%' }}
            value={toDo.title}
          />
          <input
            data-testid="todo-input"
            type="text"
            name="text"
            placeholder="discription here"
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="ToDoItem-Text"
            value={toDo.text}
            style={{ width: '30%' }}
          />
          <button data-testid="add" className="ToDo-Add" onClick={createNewToDoItem}>
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ToDo;
