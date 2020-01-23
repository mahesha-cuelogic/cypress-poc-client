import React, { useState, useEffect } from "react";
import ReactLogo from "../Assets/react.png";
import TestingLibraryLogo from "../Assets/cypress.png";
import ToDoItem from "./ToDoItem";
import restApi from "../api/restApi";

const ToDo = () => {
    const [list, setList] = useState([]);
    const [isEditing, setEditMode] = useState(false);
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
    const createNewToDoItem = async (update = false) => {
        //validate todo
        if (!toDo.title) {
            alert("Please enter a todo!");
            return;
        }
        if (update) {
            console.log('in update');
            await restApi.put(`notes/${update._id}`, { title: toDo.title, text: toDo.text })
            fetchNotes()
            setEditMode(false);
            setToDo({ title: '', text: '' });
            return;
        }
        const newId = Math.max(...list.map((t) => t.id)) + 1;
        const newToDo = { id: newId, ...toDo };
        setList([...list, newToDo]);
        restApi.post('notes', toDo);
        setToDo({ title: '', text: '' });
    };

    const editItem = (item) => {
        const itemIndex = list.findIndex(i => i._id === item._id);
        list[itemIndex].editing = true;
        setList([...list]);
        setToDo({ title: item.title, text: item.text });
        setEditMode(true);
    }

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            createNewToDoItem();
        }
    };

    const handleInput = (e) => {
        const oldState = { ...toDo };
        oldState[e.target.name] = e.target.value;
        setToDo(oldState);
    };

    const deleteItem = (todo) => {
        setList(list.filter((item) => item !== todo));
        restApi.delete(`notes/${todo._id}`);
    };

    const saveitem = (item) => {
        createNewToDoItem(item);
    }

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
                        return <ToDoItem
                            index={index}
                            key={item.id}
                            item={item}
                            deleteItem={deleteItem}
                            editItem={editItem}
                            toDo={toDo}
                            handleKeyPress={handleKeyPress}
                            handleInput={handleInput}
                            isEditing={isEditing}
                            saveitem={saveitem}
                        />;
                    })}
                </div>
                <div className="ToDoInput">
                    <input
                        data-testid="todo-input"
                        type="text"
                        name="title"
                        placeholder="title here"
                        onChange={handleInput}
                        onKeyPress={handleKeyPress}
                        className="ToDoItem-Text"
                        style={{ width: '22%' }}
                        value={!isEditing ? toDo.title : ''}
                    />
                    <input
                        data-testid="todo-input"
                        type="text"
                        name="text"
                        placeholder="discription here"
                        onChange={handleInput}
                        onKeyPress={handleKeyPress}
                        className="ToDoItem-Text"
                        value={!isEditing ? toDo.text : ''}
                        style={{ width: '60%' }}
                    />
                    <button data-testid="add" className="ToDoItem-plus" onClick={() => createNewToDoItem()}>
                        +
          </button>
                </div>
            </div>
        </div>
    );
};

export default ToDo;
