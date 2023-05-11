import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


export default function CadastroUpdate() {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const storedData1 = sessionStorage.getItem('user');
  const storedData2 = sessionStorage.getItem('password');
  const dataInfo = JSON.parse(sessionStorage.getItem("userData"));

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: name,
      email: email,
      username: storedData1,
      password: storedData2,
      "picture": null,
    };
    const headers = {
      'Content-type': 'application/json',
      'Authorization': dataInfo.token,
    };
    axios
      .put("https://todolist-api.edsonmelo.com.br/api/user/update/", payload, { headers: headers })
      .then((response) => {
        console.log(response);
        toast.success('Nome e email alterados com sucesso!');
      })
      .catch((error) => {
        console.log(error);
        toast.error('Erro ao alterar nome e email. Por favor, tente novamente.');
      });
  };

  return (
    <div className="container">
      <h1 className="form-labelModal">Alterar Nome e Email</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email" className="form-labelModal">
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
          <label htmlFor="name" className="form-labelModal">
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
      <ToastContainer />
    </div>
  );
}
