import React, { useState } from "react";
import axios from "axios";

export  function AddTask() {
  const [title, setTitle] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await axios.post("https://todolist-api.edsonmelo.com.br/api/task/new/", 
    {
        "name": "Task name"
    })
    .then((response) => {
        console.log(response.data.token)
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter a new task"
      />
      <button type="submit">Add</button>
    </form>
  );
}

export default AddTask;