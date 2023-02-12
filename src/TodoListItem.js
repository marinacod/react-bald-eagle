import React from 'react';
import style from './TodoListItem.module.css';

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li className={style.ListItem}>
      {todo.title || todo.fields.Title}
      <span></span>
      <button
        className={style.RemoveButton}
        type="button"
        onClick={() => onRemoveTodo(todo)}
      >
        Remove
      </button>
    </li>
  );
}

export default TodoListItem;
