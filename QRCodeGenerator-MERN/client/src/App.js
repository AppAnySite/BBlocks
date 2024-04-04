import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoLists';
import TodoForm from './components/TodoForm';
import './App.css'

const App = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('http://localhost:5050/todos');
      console.log(response.data);
      setTodos(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddTodo = async title => {
    try {
      const response = await axios.post('http://localhost:5050/todos', { title, completed: false });
      console.log(response.data);
      setTodos([...todos, response.data]);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteTodo = async id => {
    try {
      await axios.delete(`http://localhost:5050/todos/${id}`);
      setTodos(todos.filter(todo => todo._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    try {
      const response = await axios.put(`http://localhost:5050/todos/${id}`, updatedTodo);
      console.log(response.data);
      setTodos(todos.map(todo => (todo._id === id ? response.data : todo)));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <TodoForm onAdd={handleAddTodo} />
      <TodoList todos={todos} onDelete={handleDeleteTodo} onUpdate={handleUpdateTodo} />
    </div>
  );
};

export default App;
