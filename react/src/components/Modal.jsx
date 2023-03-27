import { useNavigate } from "react-router-dom";

import classes from "./Modal.module.css";

function Modal({ children, path, closeModal }) {
  const navigate = useNavigate();

  function closeHandler() {
    if (path) {
      return navigate(path);
    }
    if (closeModal) {
      return closeModal();
    }
    return navigate("../");
  }

  return (
    <>
      <div className={classes.backdrop} onClick={closeHandler} />
      <dialog open className={classes.modal}>
        {children}
      </dialog>
    </>
  );
}

export default Modal;
