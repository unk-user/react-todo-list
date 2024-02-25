import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function NewProjectInput({todoList, setTodoList, setOpenInput}) {
  const [name, setName] = useState('');
  
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSave();
      }
    };

    window.addEventListener('keydown', handleKeyPress);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  });


  const handleInput = (e) => {
    setName(e.target.value);
  };
  const handleSave = () => {
    if (name.trim() === '') {
      return;
    }

    const updatedList = [...todoList, { projectName: name, default: false, tasks: [] }];
    setTodoList(updatedList);
    setOpenInput(false);
    setName('');
  };
  return (
    <>
      <input
        type="text"
        minLength={1}
        maxLength={20}
        value={name}
        onChange={handleInput}
        required
      />
    </>
  );
}

NewProjectInput.propTypes = {
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  setOpenInput: propTypes.func,
};
