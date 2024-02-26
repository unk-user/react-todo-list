import propTypes from 'prop-types';
import { useState } from 'react';
import NewProjectInput from './newProjectInput';

export default function AddProject({ todoList, setTodoList }) {
  const [openInput, setOpenInput] = useState(false);


  

  const handleClick = () => {
    setOpenInput(!openInput);
  };

  return (
    <div className="add-project">
      {!openInput ? (
        <>
          <p onClick={handleClick} id='addProject'>Add project</p>
        </>
      ) : (
        <NewProjectInput
          todoList={todoList}
          setTodoList={setTodoList}
          setOpenInput={setOpenInput}
        />
      )}
    </div>
  );
}

AddProject.propTypes = {
  todoList: propTypes.array,
  setTodoList: propTypes.func,
};
