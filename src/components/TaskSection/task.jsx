import propTypes from 'prop-types';

export default function Task({
  task,
  setOpenForm,
  taskIndex,
  projectIndex,
  todoList,
  setTodoList,
}) {

  const handleRemove = () => {
    const updatedList = [...todoList];
    updatedList[projectIndex].tasks.filter((_, index) => {
      return index !== taskIndex;
    });
    setTodoList(updatedList);
  };

  return (
    <div className="task-item">
      <p className="task-title">{task.title}</p>
      <p className="task-description">{task.description}</p>
      <p className="task-date">{task.date}</p>
      <div className="task-priority-color"></div>
      <div
        className="edit-task"
        onClick={() => setOpenForm({ isOpen: true, taskIndex: taskIndex })}
      >
        edit
      </div>
      <div className="remove-task" onClick={handleRemove}>
        remove
      </div>
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
