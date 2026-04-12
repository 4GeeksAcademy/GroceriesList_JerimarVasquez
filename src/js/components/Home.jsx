import React, { useState } from "react";

const API = "https://playground.4geeks.com/todo/todos/alesanchezr"

//create your first component
const Home = () => {

	const GetProducts = () => {
		fetch('${API/USER}', {
			method: "GET",
			body: JSON.stringify(task),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(resp => {
				if(!resp.ok) throw Error('Ha ocuerrido algun error')
				return resp.json(); // Intentará parsear el resultado a JSON y retornará una promesa donde puedes usar .then para seguir con la lógica
			})
			.then(respJson => {
				// Aquí es donde debe comenzar tu código después de que finalice la búsqueda
				console.log(respJson); // Esto imprimirá en la consola el objeto exacto recibido del servidor
			})
			.catch(error => {
				// Manejo de errores
				console.log(error);
			});
	}

	//let nuevoTodo="";
	const [nuevoTodo, setNuevoTodo] = useState("Tarea nueva");
	const [todos, setTodos] = useState(["Una tarea", "Dos tarea", "tres tareas"])

	const handleClick = () => {
		console.log("Nueva tarea", nuevoTodo);
		setTodos([...todos, nuevoTodo])
	}

	const deleteTodo = (indice) => {
		console.log(indice);
		const listNueva = todos.filter((todo, i) => i !== indice)
		setTodos(listNueva);
	}

	const handleChange = (event) => {
		setNuevoTodo(event.target.value);

		//console.log(event.target.value);
		//setNuevoTodo (event.target.value);
		//console.log("Saludo desde el evento de cambio")
	}

	return (
		<div className="text-center">

			<h1 className="text-center mt-5">Shopping List</h1>
			<div>
				<input type="text" onChange={handleChange} />
				<button onClick={handleClick}>Add task</button>
			</div>
			<p>New Task: {nuevoTodo}</p>
			<ul>
				{todos.map((todos, indice) => {
					return (
						<li>
							{todos} <button onClick={() => deleteTodo(indice)}>Borrar</button>
						</li>
					)
				})}
			</ul>
		</div>
	);
};

export default Home;