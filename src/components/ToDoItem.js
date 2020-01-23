import React from "react";
import "./ToDoItem.css";

const ToDoItem = (props) => {
  const { item, deleteItem, editItem, handleInput, handleKeyPress, toDo, index, isEditing, saveitem } = props;

  return (
    <div data-testid="todo-item" className="ToDoItem">
      <p data-testid="todo-text" style={{ width: '10%' }}>
        <b>{index + 1}.</b>
      </p>
      {item.editing ?
        <>
          <input
            data-testid="todo-title-editing"
            type="text"
            name="title"
            placeholder="title here"
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="ToDoItem-Text"
            style={{ width: '22%' }}
            value={toDo.title}
          />
          <input
            data-testid="todo-text-editing"
            type="text"
            name="text"
            placeholder="discription here"
            onChange={handleInput}
            onKeyPress={handleKeyPress}
            className="ToDoItem-Text"
            value={toDo.text}
            style={{ width: '60%' }}
          />
        </> :
        <>
          <p data-testid="todo-text" className="ToDoItem-Text" style={{ width: '30%' }}>
            <b>{item.title || '-'}</b>
          </p>
          <p data-testid="todo-text" className="ToDoItem-Text">
            {item.text || '-'}
          </p>
        </>
      }
      {item.editing ?
        <button data-testid="save-item" className="ToDoItem-edit" onClick={() => saveitem(item)}>
          <span role="img" >✅</span>
        </button> :
        <button data-testid="edit-item" disabled={isEditing} className="ToDoItem-edit" onClick={() => editItem(item)}>
          <span role="img" >🖋️</span>
        </button>
      }
      <button data-testid="delete-item" className="ToDoItem-Delete" onClick={() => deleteItem(item)}>
        <span role="img" >❌</span>
      </button>
    </div>
  );
};

export default ToDoItem;
