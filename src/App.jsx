import { useState } from 'react';
import { useEffect } from 'react';
import './App.css';
import ProjectNav from './components/NavBar/ProjectNav';
import TaskSection from './components/TaskSection/taskSection';

export default function App() {
  const [todoList, setTodoList] = useState(() => {
    const storedTodoList = JSON.parse(localStorage.getItem('todoList'));
    return (
      storedTodoList || [
        {
          projectName: 'Today',
          default: true,
          tasks: [],
        },
        {
          projectName: 'This week',
          default: true,
          tasks: [],
        },
      ]
    );
  });

  
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleNavBar = () => {
    setIsCollapsed(!isCollapsed);
  }
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);

  useEffect(() => {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  }, [todoList]);

  return (
    <>
      <ProjectNav
        todoList={todoList}
        setTodoList={setTodoList}
        setSelectedProjectIndex={setSelectedProjectIndex}
        selectedProjectIndex={selectedProjectIndex}
        handleNavBar={handleNavBar}
        isCollapsed={isCollapsed}
      />
      <main className={isCollapsed && 'form-collapsed-main'}>
        <header className="project-header">
          {todoList[selectedProjectIndex].projectName}
        </header>
        <TaskSection
          todoList={todoList}
          setTodoList={setTodoList}
          projectIndex={selectedProjectIndex}
        />
      </main>
    </>
  );
}
