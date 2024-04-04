import React from 'react';
import Todo from './Todo';

const TodoList = ({ todos, onDelete, onUpdate }) => {
  return (
    <div className="todo-list">
      {todos.map(todo => (
        <Todo key={todo._id} todo={todo} onDelete={onDelete} onUpdate={onUpdate} />
      ))}
    </div>
  );
};

export default TodoList;
