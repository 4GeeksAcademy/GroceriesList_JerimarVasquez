import React, { useEffect, useState } from "react";

const API = "https://playground.4geeks.com/todo";
const USER = "JerimarV";

const Home = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const createUser = async () => {
    await fetch(`${API}/users/${USER}`, { method: "POST" })
      .catch(err => console.error(err));
  };

  const getTasks = async () => {
    const resp = await fetch(`${API}/users/${USER}`);
    const data = await resp.json();
    setTasks(data.todos || []);
  };

  const addTask = async () => {
    if (newTask.trim() === "") return;

    await fetch(`${API}/todos/${USER}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: newTask,
        is_done: false
      })
    });

    setNewTask("");
    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API}/todos/${id}`, { method: "DELETE" });
    getTasks();
  };

  useEffect(() => {
    const init = async () => {
      await createUser();
      await getTasks();
    };
    init();
  }, []);

  return (
    <div className="todo-box">
      <h1 className="text-center mb-4">List of {USER}</h1>

      <div className="input-group">
        <input
          type="text"
          className="form-control"
          placeholder="New product"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
        />
        <button className="btn btn-primary" onClick={addTask}>
          Add
        </button>
      </div>

      <ul className="mt-4">
        {tasks.length === 0 ? (
          <li className="text-center">No products yet</li>
        ) : (
          tasks.map((task) => (
            <li key={task.id} className="task-item">
              {task.label}
              <button onClick={() => deleteTask(task.id)}>X</button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default Home;
