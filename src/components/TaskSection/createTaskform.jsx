import propTypes from 'prop-types';
import { useState } from 'react';

export default function CreateTaskForm({
  todoList,
  setTodoList,
  projectIndex,
  taskIndex,
  setOpenForm,
}) {
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedList = [...todoList];
    const updatedTask = { ...task };
    if(taskIndex !== null) {
      updatedList[projectIndex].tasks[taskIndex] = updatedTask;
    } else {
      updatedList[projectIndex].tasks.push(updatedTask)
    }
    setTodoList(updatedList);
    setOpenForm({
      isOpen: false,
      taskIndex: 0,
    });
  };

  return (
    <form className="task-form" name='task-form' onSubmit={handleSubmit}>
      <fieldset>
        <legend>Edit task</legend>
        <label htmlFor="task-title">Title</label>
        <input
          type="text"
          id="task-title"
          name="title"
          placeholder="Enter task tile"
          value={task.title}
          onChange={handleInput}
          required
          minLength={0}
          maxLength={15}
        />
        <label htmlFor="task-description">Description</label>
        <input
          minLength={0}
          maxLength={250}
          type="text"
          id="task-description"
          name="description"
          placeholder="Add task details"
          value={task.description}
          onChange={handleInput}
          required
        />
        <label htmlFor="task-date">Due date</label>
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
        <button type="submit">Save</button>
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
