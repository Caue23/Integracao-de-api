import React, { useState,useEffect } from "react";
import axios from "axios";
import "./LogarForm.css";
import { useNavigate } from 'react-router';



export  function Logar() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


    function handleSubmit(event) {
        event.preventDefault();
        axios
          .post("https://todolist-api.edsonmelo.com.br/api/user/login/", {
            "username": user,
            "password": password
          })
          .then((response) => {
            if(response.data.token){
              sessionStorage.setItem("userData", JSON.stringify(response.data))
              return navigate('/home');
            };
          })
          .catch((error) => {
            console.log(error);
          });
      }


    return (
<div className="containerLogin">
    <h1 id='login'>Login</h1>
<form onSubmit={handleSubmit}>
    <div >
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
    <div>
      <label htmlFor="password">Senha:</label>
      <input
        type="password"
        id="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
      />
    </div>
    <button type="submit">Entrar</button>
  </form>
    <a href='/cadastro'><b> Cadastre-se</b></a>
</div>
    )
}