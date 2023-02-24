import React, { useState } from 'react';
import { useEffect } from 'react';
import AddTodoForm from './AddTodoForm.js';
import TodoList from './TodoList';
import PropTypes from 'prop-types';

const TodoContainer = ({ tableName, myClass }) => {
  const [todoList, setTodoList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const sortedTitles = (a, b) => {
    const objectA = a.fields.Title.toLowerCase();
    const objectB = b.fields.Title.toLowerCase();
    if (objectA < objectB) {
      return -1;
    } else if (objectA === objectB) {
      return 0;
    } else {
      return 1;
    }
  };

  const sortByTitle = () => {
    setTodoList([...todoList.sort(sortedTitles)]);
  };

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
  }, [tableName]);

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

  const toggleTodoHandler = (id) => {
    setTodoList(
      todoList.map((todo) =>
        todo.id === id
          ? { ...todo, isCompleted: !todo.isCompleted }
          : { ...todo }
      )
    );
  };

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

  //const deleteCompletedTodos = () => {
  //  setTodoList(todoList.filter((todo) => !todo.isCompleted));
  // };
  // const resetTodosHandler = () => {
  //  setTodoList([]);
  // };

  const completedTodosCount = todoList.filter(
    (todo) => todo.isCompleted
  ).length;

  return (
    <div className={myClass}>
      <h1>{tableName}</h1>
      <AddTodoForm onAddTodo={addTodo} />
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <TodoList
          todoList={todoList}
          onRemoveTodo={removeTodo}
          onToggleTodo={toggleTodoHandler}
          sortByTitle={sortByTitle}
        />
      )}
      {completedTodosCount > 0 && (
        <h2>{`You have completed ${completedTodosCount} ${
          completedTodosCount > 1 ? 'todos!' : 'todo!'
        } `}</h2>
      )}
    </div>
  );
};

TodoContainer.propTypes = {
  tableName: PropTypes.string,
  myClass: PropTypes.string,
};

export default TodoContainer;
