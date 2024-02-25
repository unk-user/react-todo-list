import propTypes from 'prop-types';
import ProjectNavItem from './ProjectNavItem';
import { useState } from 'react';

export default function ProjectNav({
  todoList,
  setTodoList,
  setSelectedProjectIndex,
}) {
  const [renameOpen, setRenameOpen] = useState({
    isOpen: false,
    projectIndex: null,
  });

  return (
    <div className="project-list">
      {todoList.map((_, projectIndex) => {
        return (
          <ProjectNavItem
            key={projectIndex}
            projectIndex={projectIndex}
            todoList={todoList}
            setTodoList={setTodoList}
            setSelectedProjectIndex={setSelectedProjectIndex}
            renameOpen={renameOpen}
            setRenameOpen={setRenameOpen}
          />
        );
      })}
    </div>
  );
}

ProjectNav.propTypes = {
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  setSelectedProjectIndex: propTypes.func,
};
