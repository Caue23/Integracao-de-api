import React, { useState, useEffect } from "react";
import axios from "axios";
import "./LogarForm.css";
import { useNavigate } from 'react-router';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function Logar() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [inputError, setInputError] = useState(false); // Novo estado para controle de erro
  const navigate = useNavigate();

  useEffect(() => {
    sessionStorage.setItem('user', user);
    sessionStorage.setItem('password', password);
  }, [user, password]);

  const handleLoginSuccess = () => {
    toast.success('Login realizado com sucesso!');
    navigate('/home');
  };

  const handleLoginFailure = () => {
    toast.error('Falha no login. Verifique suas credenciais.');
    setInputError(true); // Define o estado de erro como verdadeiro ao falhar o login
    setUser(""); // Redefine o valor do estado "user" para uma string vazia
    setPassword(""); // Redefine o valor do estado "password" para uma string vazia
  };

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://todolist-api.edsonmelo.com.br/api/user/login/", {
        "username": user,
        "password": password
      })
      .then((response) => {
        if (response.data.token) {
          sessionStorage.setItem("userData", JSON.stringify(response.data));
          handleLoginSuccess();
        } else {
          handleLoginFailure();
        }
      })
      .catch((error) => {
        console.log(error);
        handleLoginFailure();
      });
  }

  return (
    <div className="containerLogin">
      <h1 id='login'>Login</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="user" className="form-label">
            Usuário:
          </label>
          <input
            type="text"
            id="user"
            className={`form-input ${inputError ? 'input-error' : ''}`} // Adiciona uma classe CSS para indicar erro
            value={user}
            onChange={(event) => setUser(event.target.value)}
          />
        </div>
        <div>
          <label className="form-label" htmlFor="password">Senha:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <button className="buttonLogin" type="submit">Entrar</button>
      </form>
      <section>

      <a href='/cadastro'><b> Cadastre-se</b></a>
      </section>
      <ToastContainer />
    </div>
  );
}
