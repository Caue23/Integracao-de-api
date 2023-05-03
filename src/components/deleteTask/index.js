import React, { useState } from "react";
import './tarefa.css'
import axios from "axios";


export default function ListaDeTarefas() {

  function handleSubmit(event) {
    event.preventDefault();
    axios
      .post("https://todolist-api.edsonmelo.com.br/api/user/search/", {
        headers: {
          'Content-type': 'application/json', 
          "Authorization": "45AD79A5630994278BEF"
          }
      })
      .then((response) => {
        console.log(response.data.token)

      })
      .catch((error) => {
        console.log(error);
      });
  }
  const [tarefas, setTarefas] = useState([]);

  function adicionarTarefa(textoDaTarefa) {
    const novaTarefa = { id: Date.now(), texto: textoDaTarefa };
    setTarefas([...tarefas, novaTarefa]);
  }

  function excluirTarefa(idDaTarefa) {
    const novaListaDeTarefas = tarefas.filter((tarefa) => tarefa.id !== idDaTarefa);
    setTarefas(novaListaDeTarefas);
  }

  return (
    <div>
      <section id="minhasTarefas">
      <h2>Minhas Tarefas</h2>
        <FormularioDeTarefas onAdicionarTarefa={adicionarTarefa} />
      </section>
    <div >
      <ul data-type="groupNormal">
        {tarefas.map((tarefa) => (
          <li id="tarefas" key={tarefa.id}>
            {tarefa.texto}
            <button id='ButtonTarefas' onClick={() => excluirTarefa(tarefa.id)}>Excluir</button>
          </li>
        ))}
      </ul>
    </div>
    </div>
  );
}

function FormularioDeTarefas({ onAdicionarTarefa }) {
  const [textoDaTarefa, setTextoDaTarefa] = useState("");
  const [showModal, setShowModal] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!textoDaTarefa) return;
    onAdicionarTarefa(textoDaTarefa);
    setTextoDaTarefa("");
  }

  return (
    <div>
      <button onClick={openModal}>Adicionar Tarefa</button>
      {showModal ? (
        <div className="modal">
          <div className="modal-content">
            <span className="close" onClick={closeModal}>&times;</span>
              <form id="formTarefa" onSubmit={handleSubmit}>
              <input
                type="text"
                id="formInput"
                placeholder="Digite uma nova tarefa"
                value={textoDaTarefa}
                onChange={(event) => setTextoDaTarefa(event.target.value)}
              />
              <button id="formButton" type="submit">Adicionar</button>
            </form>
          </div>
        </div>
      ) : null}
    </div>

  );
}
