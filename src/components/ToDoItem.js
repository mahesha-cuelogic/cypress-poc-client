import React from "react";
import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { item, deleteItem, index } = props;

  return (
    <div data-testid="todo-item" className="ToDoItem">
       <p data-testid="todo-text"  style={{ width: '10%' }}>
        <b>{index +1}.</b>
      </p>
      <p data-testid="todo-text" className="ToDoItem-Text" style={{ width: '30%' }}>
        <b>{item.title || '-'}</b>
      </p>
      <p data-testid="todo-text" className="ToDoItem-Text">
        {item.text || '-'}
      </p>
      <button data-testid="delete" className="ToDoItem-Delete" onClick={() => deleteItem(item)}>
        -
      </button>
    </div>
  );
};

export default ToDoItem;
