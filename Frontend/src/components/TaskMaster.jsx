import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskMaster() {
  const [tasks, setTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', description: '', priority: '', dueDate: '' });

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      const userTasks = response.data.filter(task => task.username === 'admin');
      console.log(userTasks);
      setTask(userTasks);
      // console.log(response.data);
      // setTask(response.data);
    });
  }, ["admin"]);

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${id}`);
      setTask(tasks.filter(task => task._id !== id));
      console.log("Task deleted successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const startEditingTask = (task) => {
    setEditingTask(task._id);
    setEditFormData({ name: task.name, description: task.description, priority: task.priority, dueDate: task.dueDate });
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const submitEditTask = async (id) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, editFormData);
      setTask(tasks.map(task => (task._id === id ? response.data : task)));
      setEditingTask(null);
      console.log("Task updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  const updateTaskStatus = async (task) => {
    try {
      const updatedTask = { ...task, status1: task.status1 === 'done' ? 'pending' : 'done' };
      const response = await axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask);
      setTask(tasks.map(t => (t._id === task._id ? response.data : t)));
      console.log("Task status updated");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-8">
      <h1 className="text-4xl font-bold text-center text-red-600 mb-8">Task Master</h1>

      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md">
        {tasks.length === 0 ? (
          <div className="text-center">
            <p className="text-lg text-gray-700">No tasks available</p>
          </div>
        ) : (
          tasks.map((task, index) => (
            <div key={task._id} className={`bg-gray-50 p-4 mb-4 rounded-lg ${task.status1 === 'done' ? 'line-through' : ''}`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <input type="checkbox" checked={task.status1 === 'done'} onChange={() => updateTaskStatus(task)} className="h-5 w-5 text-green-600" />
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{index + 1}. {task.name}</h3>
                    <p className="text-gray-600">{task.description}</p>
                    <p className="text-sm text-gray-500">Status: {task.status1}</p>
                    <p className="text-sm text-gray-500">Priority: {task.priority}</p>
                    <p className="text-sm text-gray-500">Due Date: {new Date(task.dueDate).toLocaleDateString()}</p>
                  </div>
                </div>
                <div className="space-x-2">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    onClick={() => startEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editingTask === task._id && (
                <div className="mt-4 bg-white p-4 rounded-lg shadow-inner">
                  <h2 className="text-xl font-bold mb-2">Edit Task</h2>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded-lg"
                    placeholder="Task Name"
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded-lg"
                    placeholder="Task Description"
                  ></textarea>
                  <input
                    type="text"
                    name="priority"
                    value={editFormData.priority}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded-lg"
                    placeholder="Task Priority"
                  />
                  <input
                    type="date"
                    name="dueDate"
                    value={editFormData.dueDate.split('T')[0]}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded-lg"
                    placeholder="Due Date"
                  />
                  <div className="flex space-x-2">
                    <button
                      className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                      onClick={() => submitEditTask(task._id)}
                    >
                      Save
                    </button>
                    <button
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                      onClick={() => setEditingTask(null)}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
