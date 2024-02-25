import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ProjectNavItem({
  projectIndex,
  todoList,
  setTodoList,
  renameOpen,
  setRenameOpen,
  setSelectedProjectIndex
}) {
  const name = todoList[projectIndex].projectName;
  const [newName, setNewName] = useState(name);

  const handleInput = (e) => {
    setNewName(e.target.value);
  };

  const editName = () => {
    if (renameOpen.isOpen && newName !== '') {
      const updatedList = [...todoList];
      updatedList[projectIndex].projectName = newName !== name ? newName : name;
      setTodoList(updatedList);
    }
    setRenameOpen({
      isOpen: false,
      projectIndex: null,
    });
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (renameOpen.isOpen && renameOpen.projectIndex === projectIndex) {
        if (e.key === 'Enter') {
          editName();
        } else if (e.key === 'Escape') {
          setRenameOpen({
            isOpen: false,
            projectIndex: null,
          });
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [renameOpen, newName]);

  const openRename = () => {
    if (todoList[projectIndex].default) {
      return;
    }
    setRenameOpen({
      isOpen: true,
      projectIndex: projectIndex,
    });
  };
  
  const handleClick = () => {
    console.log(projectIndex);
    setSelectedProjectIndex(projectIndex);
  };

  const removeProject = () => {
    const updatedList = todoList.filter((project) => {
      return project.projectName !== name;
    });
    setTodoList(updatedList);
  };

  return (
    <div className="project-nav-item" onClick={handleClick}>
      {renameOpen.isOpen && renameOpen.projectIndex === projectIndex ? (
        <>
          <input
            type="text"
            className="nav-name-input"
            placeholder={name}
            onChange={handleInput}
          />
          <button className="save-project-name" onClick={editName}></button>
        </>
      ) : (
        <>
          <p className="project-nav-name" onClick={openRename}>
            {name}
          </p>
          {!todoList[projectIndex].default && (
            <div className="remove-project" onClick={removeProject}>
              remove
            </div>
          )}
        </>
      )}
    </div>
  );
}

ProjectNavItem.propTypes = {
  projectIndex: propTypes.number,
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  renameOpen: propTypes.object,
  setRenameOpen: propTypes.func,
  setSelectedProjectIndex: propTypes.func
};
