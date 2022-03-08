import LoginPage from '../pages/LoginPage'
import React from "react";
import Modal from "react-modal";
import '../css/HomePage.css'
import { Close } from 'grommet-icons';

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    border: 'none'
  },
};

// Make sure to bind modal to your appElement 
Modal.setAppElement('#root');

function HomePage() {

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function afterOpenModal() {
    /* // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00'; */
  }

  function closeModal() {
    setIsOpen(false);
  }
  return (
    <div>
      <h1>Home Page</h1>
      <button onClick={openModal}>Login</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="modal-close-btn"><Close size='small'/></button>
        <LoginPage />
        {/* <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Hello</h2>
       
        <div>I am a modal</div>
        <form>
          <input />
          <button>tab navigation</button>
          <button>stays</button>
          <button>inside</button>
          <button>the modal</button>
        </form> */}
      </Modal>
    </div>
  );
}

export default HomePage;

