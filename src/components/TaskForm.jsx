import React, { useState, useEffect } from 'react';
import axios from 'axios';
const token = localStorage.getItem('token');
const config = {
  headers: {
    Authorization: `Bearer ${token}`
  }
};

const TaskForm = ({ selectedTask, fetchTasks, clearSelectedTask }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dueDate: '',
  });

  useEffect(() => {
    if (selectedTask) {
      setFormData({
        title: selectedTask.title || '',
        description: selectedTask.description || '',
        dueDate: selectedTask.dueDate?.slice(0, 10) || '',
      });
    }
  }, [selectedTask]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await axios.put(`https://taskmanager-ge9o.onrender.com/tasks/${selectedTask._id}`, formData, config);
      } else {
        await axios.post('https://taskmanager-ge9o.onrender.com/tasks', formData, config);
      }
      fetchTasks();
      clearSelectedTask();
      setFormData({ title: '', description: '', dueDate: '' });
    } catch (err) {
      console.error('Error submitting task:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Title"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Description"
      />
      <input
        type="date"
        name="dueDate"
        value={formData.dueDate}
        onChange={handleChange}
      />
      <button type="submit">
        {selectedTask ? 'Update Task' : 'Add Task'}
      </button>
      {selectedTask && (
        <button type="button" onClick={clearSelectedTask} style={{ marginLeft: '10px' }}>
          Cancel Edit
        </button>
      )}
    </form>
  );
};

export default TaskForm;
