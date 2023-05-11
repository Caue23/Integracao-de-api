import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './updatePassword.css';

const sessionStorage = window.sessionStorage;

export default function UpdatePassword() {
  const [user, setUser] = useState("");
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
      .put("https://todolist-api.edsonmelo.com.br/api/user/updateuserpass/", payload, { headers: headers })
      .then((response) => {
        console.log(response);
        toast.success('Senha e usuário alterados com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao alterar senha e usuário. Por favor, tente novamente.');
      });
  };

  return (
    <div className="container">
      <h1 className="form-labelModal" >Alterar senha e usuário</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="user" className="form-labelModal">
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
          <label htmlFor="password" className="form-labelModal">
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
      <ToastContainer />
    </div>
  );
}
