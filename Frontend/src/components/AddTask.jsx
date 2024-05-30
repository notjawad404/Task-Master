import { useState } from "react";
import axios from "axios"; 

export default function AddTask() {
    const [taskName, setTaskName] = useState(""); 
    const [taskDescription, setTaskDescription] = useState(""); 

    const handleAddTask = () => {
        axios.post("http://localhost:5000/tasks", {
            name: taskName,
            description: taskDescription,
        })
        .then((response) => {
            console.log(response);
            // Optionally, clear the input fields after a successful response
            setTaskName("");
            setTaskDescription("");
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <div>
            <input 
                type="text" 
                placeholder="Task Name" 
                value={taskName} 
                onChange={(e) => setTaskName(e.target.value)}
            />
            <input 
                type="text" 
                placeholder="Task Description" 
                value={taskDescription} 
                onChange={(e) => setTaskDescription(e.target.value)}
            />
            <button type="button" onClick={handleAddTask}>Add Task</button>
        </div>
    );
}
