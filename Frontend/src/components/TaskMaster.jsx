import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskMaster() {
  const [tasks, setTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [editFormData, setEditFormData] = useState({ name: '', description: '' });

  useEffect(() => {
    axios.get("http://localhost:5000/tasks").then((response) => {
      console.log(response.data);
      setTask(response.data);
    });
  }, []);

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
    setEditFormData({ name: task.name, description: task.description });
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

  return (
    <div className="bg-red-600 h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-center py-4 text-3xl">Task Master</h1>

      <div className="bg-green-400 w-3/4 m-auto px-4 py-2 rounded-xl">
      {tasks.length === 0 ? (
        <div className="bg-green-400 w-3/4 m-auto px-4 py-2">
          <p className="text-lg text-center">No tasks available</p>
        </div>
      ) : (
        tasks.map((task, index) => (
            <div key={index}  className="bg-white w-full mx-auto my-3 rounded-xl px-3">
              <div className="flex flex-row py-2">
                <div className="w-4/5">
                  <h3>{index + 1}{")"} <span className="text-lg font-semibold text-red-600">{task.name}</span></h3>
                  <p>{task.description}</p>
                </div>
                <div className="flex flex-row">
                  <button
                    className="bg-red-600 text-white p-2 mx-2 rounded-full w-20 h-10"
                    onClick={() => startEditingTask(task)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 mx-2 lg:my-0 my-1 rounded-full w-20 h-10"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              {editingTask === task._id && (
                <div className="bg-white p-4 m-4 rounded shadow-md">
                  <h2 className="text-xl font-bold mb-2">Edit Task</h2>
                  <input
                    type="text"
                    name="name"
                    value={editFormData.name}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded"
                    placeholder="Task Name"
                  />
                  <textarea
                    name="description"
                    value={editFormData.description}
                    onChange={handleEditChange}
                    className="block w-full p-2 mb-2 border rounded"
                    placeholder="Task Description"
                  ></textarea>
                  <button
                    className="bg-green-600 text-white p-2 rounded"
                    onClick={() => submitEditTask(task._id)}
                  >
                    Save
                  </button>
                  <button
                    className="bg-red-600 text-white p-2 rounded ml-2"
                    onClick={() => setEditingTask(null)}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
        ))
      )}
      </div>
    </div>
  );
}
