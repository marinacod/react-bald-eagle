import React, { useEffect } from 'react';
import TodoList from './Components/TodoList';
import AddTodoForm from './Components/AddTodoForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './Components/Footer';

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

  /*const addTodo = (newTodo) => {
    setTodoList([...todoList, newTodo]);
  }; */

  const addTodo = (newTodo) => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-type': 'application/json',
        },
        body: `{"records": [{"fields": {"Title":"${newTodo.title}"}}]}`,
        //JSON.stringify(newTodo),
      }
    )
      .then((res) => res.json())
      .then((result) => {
        setTodoList([...todoList, ...result.records]);
      })
      .catch((error) => {
        console.error('Error has occured:', error);
        return error;
      });
  };

  //const removeTodo = (item) => {
  // const modifiedArray = todoList.filter((todo) => item.id !== todo.id);
  // setTodoList(modifiedArray);
  //};

  const removeTodo = (id) => {
    fetch(
      `https://api.airtable.com/v0/${process.env.REACT_APP_AIRTABLE_BASE_ID}/Default/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${process.env.REACT_APP_AIRTABLE_API_KEY}`,
          'Content-type': 'application/json',
        },
      }
    )
      .then((res) => res.json())
      .then(() => {
        const newTodoList = todoList.filter((listItem) => id !== listItem.id);
        setTodoList(newTodoList);
      })
      .catch((error) => {
        console.error('Error has occured:', error);
        return error;
      });
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
              <Footer />
            </div>
          }
        ></Route>
        <Route exact path="/new" element={<h1>New Todo List</h1>}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
