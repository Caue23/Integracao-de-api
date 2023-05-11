import React, { useState} from "react";
import './home.css'
import { Navigate } from "react-router-dom";
import ListaDeTarefas from "../../components/deleteTask";
import CadastroUpdate from "../../components/update";
import UpdatePassword from "../../components/updatePassword";



export function HamburgerMenu() {
  const [menuOpen, setMenuOpen] = useState(false);
  const userData = JSON.parse(sessionStorage.getItem("userData"));
  const [showModal, setShowModal] = useState(false);
  const [showModal2, setShowModal2] = useState(false);

  function openModal() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  function openModal2() {
    setShowModal2(true);
  }

  function closeModal2() {
    setShowModal2(false);
  }

  function singOut() {
    sessionStorage.clear();
    window.location.reload();
    return <Navigate to="/" />
  }

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
          <h1 id="tarefasHome"> Tarefas </h1>
          <section className='dropdown'>
            <a>
              <img src='../../images/down.svg' />
            </a>
            <article className='menu'>
              <button onClick={openModal}>Alterar senha e usuario</button>
              {showModal ? (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal}>&times;</span>
                    <UpdatePassword />
                  </div>
                </div>
              ) : null}
              <button onClick={openModal2}>Alterar Nome e Email</button>
              {showModal2 ? (
                <div className="modal">
                  <div className="modal-content">
                    <span className="close" onClick={closeModal2}>&times;</span>
                    <CadastroUpdate />
                  </div>
                </div>
              ) : null}
              <button onClick={() => singOut()}>Sair</button>
            </article>
          </section>
        </label>
        <ul >

        </ul>
      </nav>
      <ListaDeTarefas />
    </div>
  );
}
