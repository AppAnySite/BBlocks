import React, { useState } from 'react';

const Todo = ({ todo, onDelete, onUpdate }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  const handleDelete = () => {
    onDelete(todo._id);
  };

  const handleToggle = () => {
    onUpdate(todo._id, { title: todo.title, completed: !todo.completed });
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleTitleChange = (e) => {
    setUpdatedTitle(e.target.value);
  };

  const handleUpdate = () => {
    onUpdate(todo._id, { title: updatedTitle, completed: todo.completed });
    setEditing(false);
  };

  return (
    <div className={`todo ${todo.completed ? 'completed' : ''}`}>
      <input type="checkbox" checked={todo.completed} onChange={handleToggle} />
      {editing ? (
        <input type="text" value={updatedTitle} onChange={handleTitleChange} />
      ) : (
        <p>{todo.title}</p>
      )}
      {editing ? (
        <button onClick={handleUpdate}>Update</button>
      ) : (
        <>
          <button onClick={handleEdit}>Edit</button>
          <button onClick={handleDelete}>Delete</button>
        </>
      )}
    </div>
  );
};

export default Todo;
