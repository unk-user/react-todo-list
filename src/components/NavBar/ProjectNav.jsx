import propTypes from 'prop-types';
import ProjectNavItem from './ProjectNavItem';
import AddProject from './AddProject';
import { useState } from 'react';
import { v4 as uuidV4 } from 'uuid';
import menuIcon from '../../assets/compass.svg'
import './projectNav.scss'

export default function ProjectNav({
  todoList,
  setTodoList,
  setSelectedProjectIndex,
  selectedProjectIndex,
  handleNavBar,
  isCollapsed,
}) {
  const [renameOpen, setRenameOpen] = useState({
    isOpen: false,
    projectIndex: null,
  });

  return (
    <nav className={`nav-bar ${isCollapsed ? 'collapsed' : ''}`}>
      <header className='navHeader'><h1>DoList</h1><img src={menuIcon} alt="extend nav bar" className={!isCollapsed ? 'open' : 'closed'} onClick={handleNavBar}/></header>
      <AddProject todoList={todoList} setTodoList={setTodoList} />
      <div className="project-list">
        {todoList.map((_, projectIndex) => {
          return (
            <ProjectNavItem
              key={uuidV4()}
              projectIndex={projectIndex}
              todoList={todoList}
              setTodoList={setTodoList}
              setSelectedProjectIndex={setSelectedProjectIndex}
              selectedProjectIndex={selectedProjectIndex}
              renameOpen={renameOpen}
              setRenameOpen={setRenameOpen}
            />
          );
        })}
      </div>
    </nav>
  );
}

ProjectNav.propTypes = {
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  setSelectedProjectIndex: propTypes.func,
  selectedProjectIndex: propTypes.number,
  handleNavBar: propTypes.func,
  isCollapsed: propTypes.bool,
};
