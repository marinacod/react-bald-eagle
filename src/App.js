import React, { useEffect } from 'react';
import TodoList from './TodoList';
import AddTodoForm from './AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [todoList, setTodoList] = React.useState([]);

  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        setTodoList(result.records);
        setIsLoading(false);
      });
  }, []);

  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem('savedTodoList', JSON.stringify(todoList));
    }
  }, [todoList, isLoading]);

  const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (item) => {
    const modifiedArray = todoList.filter((todo) => item.id !== todo.id);
    setTodoList(modifiedArray);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          exact
          path="/"
          element={
            <div>
              <h1> Weekly planner</h1>
              <AddTodoForm onAddTodo={addTodo} />
              {isLoading ? (
                <p>Loading...</p>
              ) : (
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
              )}
            </div>
          }
        ></Route>
        <Route exact path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
