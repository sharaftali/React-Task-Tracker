import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import AddTask from './component/AddTask';
import Footer from './component/Footer';
import Header from "./component/Header";
import Tasks from './component/Tasks'
import About from './component/About'


function App() {
  const [showAddTask, setShowAddTask] = useState(false);
  const [tasksState, setTasksState] = useState([]);

  useEffect(() => {
    fetchTasks();
  }, []);



  const fetchTasks = async () => {

    const result = await fetch('http://localhost:5000/tasks')
    const data = await result.json();
    setTasksState(data);
    // return data;

  }

  const fetchTask = async (id) => {
    const result = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await result.json();
    return data;
  }



  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder }

    const result = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    })

    const data = await result.json()
    

    setTasksState(
      tasksState.map((task) =>
        task.id === id ? { ...task, reminder: data.reminder } : task
      )
    )
  }

  const deleteTask = async (id) => {

    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    } );
    setTasksState(tasksState.filter(task => task.id !== id));
  }

  const addTask = async (task) => {
    const result = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type' : 'application/json'
      },
      body: JSON.stringify(task)
    });

    const newTask = await result.json();
    setTasksState([...tasksState, newTask]);

    showEnventHandler();

  }

  const showEnventHandler = () => {
    setShowAddTask(!showAddTask);
  }

  
  return (
    <Router>
      <div className="container">
        <Header showEvent={showEnventHandler} showAdd={showAddTask} />
        <Route
          path="/"
          exact
          render={(propes) => (
          <>
            { showAddTask && <AddTask onAdd={addTask} />}
        
            {tasksState.length > 0 ? (
              <Tasks
                taskPro={tasksState}
                onDelete={deleteTask}
                onToggle={toggleReminder}
              />
            ) : (
              "No Tasks To Show"
            )}
          </>
        )} />
          <Route path="/about" component={About} />
        <Footer />
      
      </div>
    </Router>
  );
}

export default App;
