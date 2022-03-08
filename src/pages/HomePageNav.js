import LoginPage from "./LoginPage";
import React from "react";
import Modal from "react-modal";
import "../css/HomePage.css";
import { Close } from "grommet-icons";
import SignupPage from "./SignupPage";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: "none",
  },
};

// Make sure to bind modal to your appElement
Modal.setAppElement("#root");

function HomePage() {
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [modalTwoOpen, setModalTwoOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function openModalTwo() {
    setModalTwoOpen(true);
  }

  function afterOpenModal() {
    /* // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'; */
  }

  function closeModal() {
    setIsOpen(false);
  }

  function closeModalTwo() {
    setModalTwoOpen(false);
  }

  return (
    <div className="container">
      <div className="body">
        <button onClick={openModalTwo} className="nav-btn">
          CREATE ACCOUNT
        </button>

        <Modal
          isOpen={modalTwoOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={openModal}
          style={customStyles}
          contentLabel="signup"
        >
          <button onClick={closeModalTwo} className="modal-close-btn">
            <Close size="small" />
          </button>
          <SignupPage />
        </Modal>

        <button
          onClick={openModal}
          style={{ backgroundColor: "transparent", border: "none" }}
        >
          Already have an account? <span className="nav-link">Login</span>
        </button>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="login"
        >
          <button onClick={closeModal} className="modal-close-btn">
            <Close size="small" />
          </button>
          <LoginPage />
        </Modal>
      </div>
    </div>
  );
}

export default HomePage;
