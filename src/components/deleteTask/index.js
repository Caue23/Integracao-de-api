import React, { useEffect, useState } from "react";
import "./tarefa.css";
import axios from "axios";

export default function ListaDeTarefas() {
  const dataInfo = JSON.parse(sessionStorage.getItem("userData"));
  const [searchData, setSearchData] = useState([]);

  function handleCheckbox(itemId) {
    setSearchData((prevData) => {
      return prevData.map((item) => {
        if (item.id === itemId) {
          const updatedItem = {
            ...item,
            realized: item.realized === 1 ? 0 : 1,
          };

          const payload = {
            id: updatedItem.id,
            name: updatedItem.name,
            realized: updatedItem.realized,
          };

          const headers = {
            "Content-type": "application/json",
            Authorization: dataInfo.token,
          };

          axios
            .put(
              "https://todolist-api.edsonmelo.com.br/api/task/update/",
              payload,
              { headers: headers }
            )
            .then((response) => {
              console.log(response);
            })
            .catch((error) => {
              console.log(error);
            });

          return updatedItem;
        }
        return item;
      });
    });
  }

  useEffect(() => {
    const carregarInfo = async () => {
      const payload = {
        name: "",
      };
      const headers = {
        "Content-type": "application/json",
        Authorization: dataInfo.token,
      };

      try {
        const response = await axios.post(
          "https://todolist-api.edsonmelo.com.br/api/task/search/",
          payload,
          { headers: headers }
        );
        if (response) {
          sessionStorage.setItem("search", JSON.stringify(response.data));
          setSearchData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    // Carregar dados inicialmente
    carregarInfo();
  }, []);

  const [tarefas, setTarefas] = useState([]);

  function adicionarTarefa(textoDaTarefa) {
    const novaTarefa = { id: Date.now(), texto: textoDaTarefa };
    setTarefas([...tarefas, novaTarefa]);
  }

  function handleDelete(itemId) {
    const url = `https://todolist-api.edsonmelo.com.br/api/task/delete/`;
    const payload = { id: itemId };
    const headers = {
      "Content-type": "application/json",
      Authorization: dataInfo.token,
    };

    axios
      .delete(url, { data: payload, headers: headers })
      .then((response) => {
        console.log(response.data);
        // Realize as operações necessárias após a exclusão do item
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const handleUpdateData = async () => {
    const payload = {
      name: "",
    };
    const headers = {
      "Content-type": "application/json",
      Authorization: dataInfo.token,
    };

    try {
      const response = await axios.post(
        "https://todolist-api.edsonmelo.com.br/api/task/search/",
        payload,
        { headers: headers }
      );
      if (response) {
        sessionStorage.setItem("search", JSON.stringify(response.data));
        setSearchData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderData = searchData && searchData.map(item => (
    <div id="tarefas" key={item.id}>
      {item.name}
      <input
        type="checkbox"
        checked={item.realized === 1}
        onChange={() => handleCheckbox(item.id)}
      />
      <button className="buttonDelete" onClick={() => handleDelete(item.id)}>Delete</button>
    </div>
  ));

  return (
    <div>
      <section id="minhasTarefas">
        <h2>Minhas Tarefas</h2>
        <button className="buttonAtualizar" onClick={handleUpdateData}>Atualizar Lista</button> {/* Botão para atualizar a API */}
        <FormularioDeTarefas onAdicionarTarefa={adicionarTarefa} />
      </section>
      <div>
        <ul data-type="groupNormal">
          <li>{renderData}</li>
        </ul>
      </div>
    </div>
  );
}

function FormularioDeTarefas() {
  const [textoDaTarefa, setTextoDaTarefa] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dataInfo = JSON.parse(sessionStorage.getItem("userData"));

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const payload = {
      name: textoDaTarefa,
    };
    const headers = {
      "Content-type": "application/json",
      Authorization: dataInfo.token,
    };
    axios
      .post(
        "https://todolist-api.edsonmelo.com.br/api/task/new/",
        payload,
        { headers: headers }
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <button className='buttonAtualizar' onClick={openModal}>Adicionar Tarefa</button>
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>
              &times;
            </span>
            <form id="formTarefa" onSubmit={handleSubmit}>
              <input
                type="text"
                id="formInput"
                placeholder="Digite uma nova tarefa"
                value={textoDaTarefa}
                onChange={(event) => setTextoDaTarefa(event.target.value)}
              />
              <button id="formButton" type="submit">
                Adicionar
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </div>
  );
}
