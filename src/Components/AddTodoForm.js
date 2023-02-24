import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';
import PropTypes from 'prop-types';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState('');

  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    onAddTodo({ title: todoTitle, id: Date.now(), isCompleted: false });
    setTodoTitle('');
  }

  return (
    <form className={style.loginForm} onSubmit={handleAddTodo}>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        label="Title"
      >
        Things to do
      </InputWithLabel>
      <button className={style.Btn}>Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func,
};

export default AddTodoForm;
