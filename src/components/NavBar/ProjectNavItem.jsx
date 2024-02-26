import propTypes from 'prop-types';
import { useEffect, useState } from 'react';

export default function ProjectNavItem({
  projectIndex,
  todoList,
  setTodoList,
  renameOpen,
  setRenameOpen,
  setSelectedProjectIndex,
  selectedProjectIndex,
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
    const handleExitClick = (e) => {
      if (e.target.className !== 'nav-name-input' && e.target.id !== 'project-name') {
        setRenameOpen({
          isOpen: false,
          projectIndex: null,
        });
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('click', handleExitClick);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('click', handleExitClick);
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

  const handleClick = (e) => {
    if (e.target.id === 'remove-project') {
      removeProject();
    } else if (e.target.id === 'project-name') {
      openRename();
    } else {
      setSelectedProjectIndex(projectIndex);
    }
  };

  const removeProject = () => {
    const updatedList = todoList.filter((project) => {
      return project.projectName !== name;
    });
    setSelectedProjectIndex(
      projectIndex == selectedProjectIndex ? projectIndex - 1 : 0
    );
    setTodoList(updatedList);
  };

  return (
    <div className="project-nav-item" onClick={handleClick}>
      {renameOpen.isOpen && renameOpen.projectIndex === projectIndex ? (
        <>
          <input
            name="navName"
            type="text"
            className="nav-name-input"
            placeholder={name}
            onChange={handleInput}
          />
          <button className="save-project-name" onClick={editName}>
            save
          </button>
        </>
      ) : (
        <>
          <p className="project-nav-name" id="project-name">
            {name}
          </p>
          {!todoList[projectIndex].default && (
            <button className="remove-project" id="remove-project">
              remove
            </button>
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
  setSelectedProjectIndex: propTypes.func,
  selectedProjectIndex: propTypes.number,
};
