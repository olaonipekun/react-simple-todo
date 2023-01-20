import React, { useState } from 'react';
import './style.css';

function TodoApp() {
  const [todoList, setTodoList] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [completedTodo, setCompletedTodo] = useState([]);
  const [editTodo, setEditTodo] = useState({});

  const addTodo = (event) => {
    event.preventDefault();
    setTodoList([...todoList, newTodo]);
    setNewTodo('');
  };

  const completeTodo = (index) => {
    setCompletedTodo([...completedTodo, todoList[index]]);
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const deleteTodo = (index) => {
    setTodoList(todoList.filter((_, i) => i !== index));
  };

  const editTodoItem = (index) => {
    setEditTodo({ index, value: todoList[index] });
  };

  const saveEdit = (index) => {
    let newTodoList = [...todoList];
    newTodoList[index] = editTodo.value;
    setTodoList(newTodoList);
    setEditTodo({});
  };
  const [loading, setLoading] = useState(false);

  return (
    <>
      <h1> Fancy Todos </h1>
      <div className="todo-app">
        <form onSubmit={addTodo}>
          <input
            type="text"
            placeholder="Add new todo"
            value={newTodo}
            onChange={(event) => setNewTodo(event.target.value)}
          />
          <button type="submit">Add</button>
        </form>
        <ul>
          {todoList.map((todo, index) => (
            <li key={index}>
              {editTodo.index === index ? (
                <>
                  <input
                    type="text"
                    value={editTodo.value}
                    onChange={(event) =>
                      setEditTodo({ ...editTodo, value: event.target.value })
                    }
                  />
                  <button onClick={() => saveEdit(index)}>Save</button>
                </>
              ) : (
                <>
                  {todo}
                  <input type="checkbox" onClick={() => completeTodo(index)} />
                  <button onClick={() => editTodoItem(index)}>Edit</button>
                  <button onClick={() => deleteTodo(index)}>Delete</button>
                </>
              )}
            </li>
          ))}
        </ul>
        <h3>Completed Todos</h3>
        <ul>
          {completedTodo.map((todo, index) => (
            <li key={index}>{todo}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default TodoApp;
