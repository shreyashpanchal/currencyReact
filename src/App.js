import React, { useState, useEffect } from "react";

const App = () => {
  const [newTodo, setNewTodo] = useState({name:"",age:0});
  const [todos, setTodos] = useState([]);
  useEffect(() => {
    getTodos();
   // console.log(todos);
  }, []);
  const getTodos = () => {
    fetch("http://localhost:5000/todos")
      .then((res) => res.json())
      .then((data) => {
       // console.log(data);
        setTodos(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const DeleteTodo = (id) => {
    console.log(id)
    fetch(`http://localhost:5000/todo/delete/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getTodos();
      })
      .catch((err) => {
        console.log(err);
      });
  }
  const submitHandler = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/todo/new", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(newTodo)
  }).then((res) => res.json()).then((data)=>{
    console.log(data)
    getTodos();
  }).catch((err)=>{ 
    console.log(err)
  })}
  return (
    <>
      <h1>Todo App</h1>
      <form onSubmit={submitHandler}>
        <input
          type="text"
          required
          placeholder="Enter name"
          onChange={(e) => {
            setNewTodo({ ...newTodo, name: e.target.value });
          }}
        />
         <input
          type="number"
          required
          placeholder="Enter age"
          onChange={(e) => {
            setNewTodo({ ...newTodo, age: e.target.value });
          }}
        />
        <button>Add Todo</button>
      </form>
      <div style={{border:todos.length===0?"0px solid black":"1px solid black",width:todos.length===0?"0px":"200px"}}>
        {todos.map((data,index)=>{
         // console.log(data._id)
          return (<div key={data._id} onClick={()=>DeleteTodo(data._id)} >
          <span>{data.name}   </span>
          <span>{data.age}</span>
          </div>)
        })}
        </div>
    </>
  );
};

export default App;
