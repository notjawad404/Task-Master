import { useState } from "react";
import axios from "axios"; 

export default function AddTask() {
    const [taskName, setTaskName] = useState(""); 
    const [taskDescription, setTaskDescription] = useState(""); 
    const [dueDate, setDueDate] = useState("");

    const handleAddTask = () => {
        axios.post("http://localhost:5000/tasks", {
            username: "admin",
            name: taskName,
            description: taskDescription,
            priority: "normal",
            status1: "pending",
            dueDate: dueDate,
            // createAt: new Date()
        })
        .then((response) => {
            console.log(response.data);
            setTaskName("");
            setTaskDescription("");
            setDueDate("");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div className="h-screen overflow-y-auto bg-red-600 text-white">
            <div className="flex justify-center flex-col mt-10">
                <h1 className="text-center font-bold text-3xl">Add Task</h1>
                <input 
                    type="text" 
                    placeholder="Task Name" 
                    value={taskName} 
                    onChange={(e) => setTaskName(e.target.value)}
                    className="w-1/2 m-auto rounded-xl my-4 p-4 text-lg text-black"
                />
                <textarea 
                    placeholder="Task Description" 
                    value={taskDescription} 
                    onChange={(e) => setTaskDescription(e.target.value)}
                    className="w-1/2 m-auto rounded-xl my-4 p-4 text-lg text-black"
                />
                <input
                    type="date"
                    placeholder="Due Date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-1/2 m-auto rounded-xl my-4 p-4 text-lg text-black"
                />
                <button type="button" onClick={handleAddTask} className="w-1/5 m-auto bg-green-400 text-black text-lg p-2 font-semibold rounded-full hover:bg-black hover:text-green-400">
                    Add Task
                </button>
            </div>
        </div>
    );
}
