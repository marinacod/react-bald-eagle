import * as React from 'react';
import { useState } from 'react';
import TodoListItem from './TodoListItem';
import PropTypes from 'prop-types';
import { Toggle } from './ToggleSwitch';
import styles from './ToggleSwitch.module.css';
import { sortBy } from 'lodash';

const SORTS = {
  NONE: (todoList) => todoList,
  TITLE: (todoList) => sortBy(todoList, 'title').reverse(),
  ID: (todoList) => sortBy(todoList, 'id').reverse(),
};

function TodoList({ todoList, onRemoveTodo, onToggleTodo, sortByTitle }) {
  const [sort, setSort] = useState({
    sortKey: 'NONE',
    isReverse: false,
  });

  const handleSort = (sortKey) => {
    const isReverse = sort.sortKey === sortKey && !sort.isReverse;
    setSort({ sortKey: sortKey, isReverse: isReverse });
  };

  const sortFunction = SORTS[sort.sortKey];
  const sortedList = sort.isReverse
    ? sortFunction(todoList).reverse()
    : sortFunction(todoList);

  return (
    <>
      <div className={styles.switchSort}>
        <Toggle onChange={() => handleSort('TITLE')} />
        <button className={styles.sortButton} onClick={sortByTitle}>
          Sort
        </button>
      </div>

      <ul>
        {!todoList.length && <h2>The list is empty</h2>}
        {sortedList.map((todo) => {
          return (
            <React.Fragment key={todo.id}>
              <TodoListItem
                todo={todo}
                onRemoveTodo={onRemoveTodo}
                onToggleTodo={onToggleTodo}
              />
            </React.Fragment>
          );
        })}
      </ul>
    </>
  );
}

TodoList.propTypes = {
  todoList: PropTypes.array,
  onRemoveTodo: PropTypes.func,
  onToggleTodo: PropTypes.func,
  sortByTitle: PropTypes.func,
};
export default TodoList;
