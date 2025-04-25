import React from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const TaskTable = ({ tasks, onUpdate, selectTask }) => {
 
  const handleDelete = async (id) => {
    await axios.delete(`https://taskmanager-ge9o.onrender.com/tasks/${id}`, config);
    onUpdate();
  };
  
  const toggleComplete = async (task) => {
    await axios.put(
      `https://taskmanager-ge9o.onrender.com/tasks/${task._id}`,
      { ...task, completed: !task.completed },
      config
    );
    onUpdate();
  };
  

  return (
    <table border="1" cellPadding="10" style={{ marginTop: '20px' }}>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Due Date</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {tasks.map((task) => (
          <tr key={task._id}>
            <td>{task.title}</td>
            <td>{task.description}</td>
            <td>{task.dueDate?.slice(0, 10)}</td>
            <td>{task.completed ? '✅ Done' : '❌ Pending'}</td>
            <td>
              <button onClick={() => toggleComplete(task)}>
                {task.completed ? 'Undo' : 'Complete'}
              </button>
              <button onClick={() => selectTask(task)}>Edit</button>
              <button onClick={() => handleDelete(task._id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default TaskTable;
