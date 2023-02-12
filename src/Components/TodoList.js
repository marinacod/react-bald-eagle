import * as React from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';

function TodoList({ todoList, onRemoveTodo }) {
  return (
    <ul>
      {todoList.map((todo) => {
        return (
          <React.Fragment key={todo.id}>
            <TodoListItem todo={todo} onRemoveTodo={onRemoveTodo} />
          </React.Fragment>
        );
      })}
    </ul>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
};
export default TodoList;
