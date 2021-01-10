import { Component } from "react";
import { createPortal } from "react-dom";
import s from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

class Modal extends Component {
  componentDidMount() {
    window.addEventListener("keydown", this.onEscape);
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.onEscape);
  }

  onEscape = (e) => {
    if (e.code === "Escape") {
      this.props.onClose();
    }
  };

  onBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.src} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

export default Modal;
