import React, { useState,useEffect } from "react";
import './home.css'
import axios from "axios";
import AddTask from "../../components/addTask";
import ListaDeTarefas from "../../components/deleteTask";



export function HamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const [title, setTitle] = useState("");

    const handleSubmit = async (event) => {
      event.preventDefault();
      await axios.post("https://todolist-api.edsonmelo.com.br/api/tasks", {
        title,
        completed: false
      });
      setTitle("");
    };

    return (
        <div>
      <nav className="hamburger-menu">
        <input
          id="menu-toggle"
          type="checkbox"
          checked={menuOpen}
          onChange={() => setMenuOpen(!menuOpen)}
        />
        <label className="menu-btn" htmlFor="menu-toggle">
            <section>
          <span></span>
          <span></span>
          <span></span>
            </section>
          <h1 id="tarefasHome"> Tarefas </h1>
        </label>
        <ul className="menu-items">
          <li><a href="#">Home</a></li>
          <li>{userData.name}</li>
          <li>{userData.email}</li>
        </ul>
      </nav>
<ListaDeTarefas/>
        </div>
    );
  }