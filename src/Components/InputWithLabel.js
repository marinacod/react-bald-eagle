import { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

function InputWithLabel({ todoTitle, handleTitleChange, children }) {
  const inputRef = useRef(null);
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <label htmlFor="todoTitle">{children}</label>

      <input
        name="title"
        type="text"
        id="todoTitle"
        value={todoTitle}
        onChange={handleTitleChange}
        ref={inputRef}
      />
    </>
  );
}

InputWithLabel.propTypes = {
  handleTitleChange: PropTypes.func,
  todoTitle: PropTypes.node,
  children: PropTypes.string,
};

export default InputWithLabel;
