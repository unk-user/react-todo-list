import propTypes from 'prop-types';
import { useEffect, useState } from 'react';
import './taskForm.scss';

export default function CreateTaskForm({
  todoList,
  setTodoList,
  projectIndex,
  taskIndex,
  setOpenForm,
}) {
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === 'Enter') {
        handleSubmit(e);
      } else if (e.key === 'Escape') {
        closeForm();
      }
    };

    document.addEventListener('keydown', handleKeyPress);

    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  });

  const [task, setTask] = useState(
    taskIndex !== null
      ? todoList[projectIndex].tasks[taskIndex]
      : {
          title: '',
          description: '',
          date: '',
          priority: 'low',
          done: false,
        }
  );

  const handleInput = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  const closeForm = () => {
    setOpenForm({
      isOpen: false,
      taskIndex: 0,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...todoList];
    const updatedTask = { ...task };
    if (taskIndex !== null) {
      updatedList[projectIndex].tasks[taskIndex] = updatedTask;
    } else {
      updatedList[projectIndex].tasks.push(updatedTask);
    }
    setTodoList(updatedList);
    closeForm();
  };

  return (
    <form className="task-form" name="task-form" onSubmit={handleSubmit}>
      <fieldset>
        <input
          type="text"
          id="task-title"
          name="title"
          className='task-form-title'
          placeholder="Task title"
          value={task.title}
          onChange={handleInput}
          required
          minLength={0}
          maxLength={15}
        />
        <input
          minLength={0}
          maxLength={250}
          type="text"
          id="task-description"
          name="description"
          placeholder="Description"
          value={task.description}
          onChange={handleInput}
          required
        />
        <div className="optional-input">
          <label htmlFor="task-date">Deadline</label>
          <input
            type="date"
            id="task-date"
            name="date"
            placeholder="new Task"
            value={task.date}
            onChange={handleInput}
          />
          <label htmlFor="task-priority">Priority</label>
          <select
            name="priority"
            id="task-priority"
            value={task.priority}
            onChange={handleInput}
            required
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
            <option value="urgent">urgent</option>
          </select>
        </div>
        <div className="action-buttons">
          <button onClick={closeForm} className='cancel-button'>Cancel</button>
          <button type="submit" className='submit-button'>Save</button>
        </div>
      </fieldset>
    </form>
  );
}

CreateTaskForm.propTypes = {
  taskIndex: propTypes.number,
  projectIndex: propTypes.number,
  todoList: propTypes.array,
  setTodoList: propTypes.func,
  setOpenForm: propTypes.func,
};
