import React from 'react';
import style from './TodoListItem.module.css';
import PropTypes from 'prop-types';
import { FaCheck } from 'react-icons/fa';
import { RiDeleteBin2Line } from 'react-icons/ri';

function TodoListItem({ todo, onRemoveTodo, onToggleTodo }) {
  return (
    <li
      className={`${style.ListItem} ${
        todo.isCompleted ? style.completedTodo : ''
      }`}
    >
      <FaCheck
        className={style.checkIcon}
        onClick={() => onToggleTodo(todo.id)}
      />
      {todo.title || todo.fields.Title}
      <RiDeleteBin2Line
        className={style.deleteIcon}
        onClick={() => onRemoveTodo(todo.id)}
      />
    </li>
  );
}

TodoListItem.propTypes = {
  todo: PropTypes.object,
  onRemoveTodo: PropTypes.func,
  onToggleTodo: PropTypes.func,
};
export default TodoListItem;
