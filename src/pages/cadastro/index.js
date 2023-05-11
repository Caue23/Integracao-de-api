import React, { useState } from "react";
import axios from "axios";
import "./CadastroForm.css";
import { useNavigate } from 'react-router';
import { FaArrowLeft } from "react-icons/fa";


export  function CadastroForm() {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleBack = () => {
    navigate('/');
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("https://todolist-api.edsonmelo.com.br/api/user/new/", 
      {
        "name": name,
        "email": email,
        "username": user,
        "password": password
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <a className="backButton" onClick={handleBack}><FaArrowLeft/></a>
      <h1>Cadastro</h1>
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="user" className="form-label">
          Usuário:
        </label>
        <input
          type="text"
          id="user"
          className="form-input"
          value={user}
          onChange={(event) => setUser(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          E-mail:
        </label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Senha:
        </label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div className="form-group">
        <label htmlFor="name" className="form-label">
          Nome:
        </label>
        <input
          type="text"
          id="name"
          className="form-input"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </div>
      <button type="submit" className="form-button">
        Enviar
      </button>
    </form>
    </div>
  )
}