import axios from "axios";
import { useEffect, useState } from "react";

export default function TaskMaster() {
  const [tasks, setTask] = useState([]);

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

  return (
    <div className="bg-red-600 h-screen overflow-y-auto">
      <h1 className="text-white font-bold text-center py-4 text-3xl">Task Master</h1>

      {tasks.length === 0 ? (
        <div className="bg-green-400 w-3/4 m-auto px-4 py-2">
          <p className="text-lg text-center">No tasks available</p>
        </div>
      ) : (
        tasks.map((task, index) => (
          <div key={index} className="bg-green-400 w-3/4 m-auto px-4 py-2">
            <div className="bg-white w-full m-auto">
              <div className="flex flex-row py-2">
                <div className="w-4/5">
                  <h3 className="">{index + 1}{")"} <span className="text-lg font-semibold text-red-600">{task.name}</span></h3>
                  <p className="">{task.description}</p>
                </div>
                <div className="">
                  <button className="bg-red-600 text-white p-2 mx-2 rounded-full w-20">Edit</button>
                  <button
                    className="bg-red-600 text-white p-2 mx-2 lg:my-1 my-1 rounded-full w-20"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
