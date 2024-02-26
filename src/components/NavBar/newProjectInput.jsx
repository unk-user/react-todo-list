import { useEffect, useState } from 'react';
import propTypes from 'prop-types';

export default function NewProjectInput({
  todoList,
  setTodoList,
  setOpenInput,
}) {
  const [name, setName] = useState('');

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSave();
      } else if (e.key === 'Escape') {
        setOpenInput(false);
        setName('');
      }
    };
    const handleExitClick = (e) => {
      if(e.target.name !== 'project-name' && e.target.id !== 'addProject') {
        setOpenInput(false);
        setName('');
      }
    }

    document.addEventListener('keydown', handleKeyPress);
    document.addEventListener('click', handleExitClick);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
      document.removeEventListener('click', handleExitClick);
    };
  });

  const handleInput = (e) => {
    setName(e.target.value);
  };
  const handleSave = () => {
    if (name.trim() === '') {
      return;
    }

    const updatedList = [
      ...todoList,
      { projectName: name, default: false, tasks: [] },
    ];
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
        name="project-name"
        value={name}
        placeholder="New project"
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
