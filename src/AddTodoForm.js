import React from 'react';
import InputWithLabel from './InputWithLabel';
import style from './AddTodoForm.module.css';

function AddTodoForm({ onAddTodo }) {
  const [todoTitle, setTodoTitle] = React.useState('');

  function handleTitleChange(event) {
    let newTodoTitle = event.target.value;
    setTodoTitle(newTodoTitle);
  }

  function handleAddTodo(event) {
    event.preventDefault();
    const todoTitle = event.target.title.value;
    onAddTodo({ title: todoTitle, id: Date.now() });
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

export default AddTodoForm;
