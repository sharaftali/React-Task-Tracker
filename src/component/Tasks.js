import Task from './Task'

const Tasks = propes => {
    const { taskPro, onDelete, onToggle } = propes;
    // const { id, text } = taskPro;
    
    console.log("TASKS", propes.taskPro.id);
    // debugger;
  return (
    <>
      {taskPro.map((task, index) => <Task
        key={index}
        {...task}
        onDelete={onDelete}
        onToggle={onToggle}
      />)}
    </>
  )
}

export default Tasks;