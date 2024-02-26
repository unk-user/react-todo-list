import propTypes from 'prop-types';
import { useState } from 'react';
import editIcon from '../../assets/edit.svg';
import removeIcon from '../../assets/trash.svg';

export default function Task({
  task,
  setOpenForm,
  taskIndex,
  projectIndex,
  todoList,
  setTodoList,
}) {
  const [completionChecked, setCompletionChecked] = useState(task.done);

  const setTaskComplete = (e) => {
    const updatedList = [...todoList];
    const updatedTask = { ...task };
    updatedTask.done = e.target.checked;
    updatedList[projectIndex].tasks[taskIndex] = updatedTask;
    setTodoList(updatedList);
    setCompletionChecked(e.target.checked);
  };

  const handleRemove = () => {
    const updatedList = [...todoList];
    const updatedProject = todoList[projectIndex];
    updatedProject.tasks = updatedProject.tasks.filter((_, index) => {
      return index != taskIndex;
    });
    updatedList[projectIndex] = updatedProject;
    setTodoList(updatedList);
  };

  return (
    <div className="task-item">
      <input
        type="checkbox"
        name="task-completed"
        checked={completionChecked}
        onChange={setTaskComplete}
      />
      <p className="task-title">{task.title}</p>
      <p className="task-description">{task.description}</p>
      <p className="task-date">{task.date}</p>
      <div className="task-priority-color"></div>
      <button
        className="edit-task"
        onClick={() => setOpenForm({ isOpen: true, taskIndex: taskIndex })}
      >
        <img src={editIcon} />
      </button>
      <button className="remove-task" onClick={handleRemove}>
        <img src={removeIcon} />
      </button>
    </div>
  );
}

Task.propTypes = {
  task: propTypes.object,
  setOpenForm: propTypes.func,
  taskIndex: propTypes.number,
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  projectIndex: propTypes.number,
};
