import React, { useEffect, useState } from "react";

const API = "http://localhost:3001/todos";

function TodoList() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  const getTasks = () => {
    fetch(API)
      .then((resp) => resp.json())
      .then((data) => setTasks(data))
      .catch((err) => console.log("Error obteniendo tareas:", err));
  };

  const addTask = () => {
    if (task.trim() === "") return;

    fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        label: task,
        is_done: false
      })
    })
      .then(() => {
        setTask("");
        getTasks();
      })
      .catch((err) => console.log("Error agregando tarea:", err));
  };

  const handleDelete = (id) => {
    fetch(`${API}/${id}`, {
      method: "DELETE"
    })
      .then(() => getTasks())
      .catch((err) => console.log("Error eliminando tarea:", err));
  };

  const deleteAll = async () => {
    try {
      const resp = await fetch(API);
      const data = await resp.json();

      await Promise.all(
        data.map((t) =>
          fetch(`${API}/${t.id}`, { method: "DELETE" })
        )
      );

      setTasks([]);
    } catch (err) {
      console.log("Error eliminando todas:", err);
    }
  };

  useEffect(() => {
    getTasks();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") addTask();
  };

  return (
    <div className="todo-container">
      <h1>Lista de tareas</h1>

      <input
        type="text"
        placeholder="Añadir tarea"
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <button onClick={addTask}>Agregar</button>

      <button onClick={deleteAll} className="btn btn-danger ms-2">
        Borrar todas
      </button>

      <ul>
        {tasks.length === 0 ? (
          <li className="empty">No hay tareas, añadir tareas</li>
        ) : (
          tasks.map((t) => (
            <li key={t.id} className="task-item">
              <span
                style={{
                  textDecoration: t.is_done ? "line-through" : "none"
                }}
              >
                {t.label}
              </span>

              <button
                className="delete-btn"
                onClick={() => handleDelete(t.id)}
              >
                ✖
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default TodoList;