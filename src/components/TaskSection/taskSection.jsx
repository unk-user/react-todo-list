import { v4 } from 'uuid';
import { useState } from 'react';
import propTypes from 'prop-types';
import Task from './task';
import CreateTaskForm from './createTaskform';

export default function TaskSection({ todoList, setTodoList, projectIndex }) {
  const tasks = todoList[projectIndex].tasks;

  const [openForm, setOpenForm] = useState({
    isOpen: false,
    taskIndex: 0,
  });

  const openAddTask = () => {
    setOpenForm({
      isOpen: true,
      taskIndex: null,
    });
  };

  return (
    <div className="tasks">
      {tasks.map((task, index) => {
        return (
          <>
            {!openForm.isOpen || openForm.taskIndex !== index ? (
              <Task
                task={task}
                setOpenForm={setOpenForm}
                taskIndex={index}
                key={v4}
              />
            ) : (
              <CreateTaskForm
                todoList={todoList}
                setTodoList={setTodoList}
                projectIndex={projectIndex}
                taskIndex={index}
                setOpenForm={setOpenForm}
              />
            )}
          </>
        );
      })}
      {openForm.isOpen && openForm.taskIndex === null ? (
        <>
          <CreateTaskForm
            todoList={todoList}
            setTodoList={setTodoList}
            projectIndex={projectIndex}
            taskIndex={null}
            setOpenForm={setOpenForm}
          />
        </>
      ) : (
        <div className="add-task" onClick={openAddTask}>
          Add task
        </div>
      )}
    </div>
  );
}

TaskSection.propTypes = {
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  projectIndex: propTypes.number,
};
