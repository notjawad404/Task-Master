import AddTask from "./AddTask";
import { useState } from "react";

export default function TaskMaster() {
  const [tasks] = useState([]);
  return (
    <div>
      <h1>Task Master</h1>
      <AddTask />
      {tasks.length === 0 ? (
        <div>
          <p>No tasks available</p>
        </div>
      ) : (
        tasks.map((task, index) => (
          <div key={index}>
            <h3>{task.name}</h3>
            <p>{task.description}</p>
          </div>
        ))
      )}
    </div>
  );
}
