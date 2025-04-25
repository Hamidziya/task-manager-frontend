import React, { useEffect, useState } from 'react';
import ImportForm from './ImportForm';
import TaskForm from './TaskForm';
import TaskTable from './TaskTable';
import axios from 'axios'; // move this up here

const token = localStorage.getItem('token'); // move this below all imports

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);

  const fetchTasks = async () => {
    try {
      const res = await axios.get('https://taskmanager-ge9o.onrender.com/tasks', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(res.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const clearSelectedTask = () => setSelectedTask(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/login';
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>📝 Task Manager</h2>
      <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
      <ImportForm onImport={fetchTasks} />
      <TaskForm
        selectedTask={selectedTask}
        fetchTasks={fetchTasks}
        clearSelectedTask={clearSelectedTask}
      />
      <TaskTable
        tasks={tasks}
        onUpdate={fetchTasks}
        selectTask={setSelectedTask}
      />
    </div>
  );
}

export default Dashboard;
