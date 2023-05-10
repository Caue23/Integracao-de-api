import React, { useState } from "react";
import axios from "axios";

const sessionStorage = window.sessionStorage;

export default function UpdatePassword() {
  const [ user, setUser] = useState('')
  const [password, setPassword] = useState("");
  const storedData1 = sessionStorage.getItem('user');
  const storedData2 = sessionStorage.getItem('password');
  const dataInfo = JSON.parse(sessionStorage.getItem("userData"));

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
        username: storedData1,
        password: storedData2,
        new_username: user,
        new_password: password,

      };
      const headers = {
        'Content-type': 'application/json', 
        'Authorization': dataInfo.token,
      };
    axios
      .put("https://todolist-api.edsonmelo.com.br/api/user/updateuserpass/", payload,{ headers: headers }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="container">
      <h1>Alterar senha e usuario</h1>
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
      <button type="submit" className="form-button">
        Enviar
      </button>
    </form>
    </div>
  )
}