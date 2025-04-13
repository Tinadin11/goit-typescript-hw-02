import Modal from "react-modal";
import { useEffect, useState } from "react";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

const ImageModal = ({ src, alt, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (src) {
      setIsOpen(true); 
    } else {
      setIsOpen(false); 
    }
  }, [src]); 

  return (
    <Modal
      isOpen={isOpen} 
      onRequestClose={onClose}
      className={css.modal}
      overlayClassName={css.overlay}
      shouldCloseOnEsc={true}
      shouldCloseOnOverlayClick={true}
    >
      {src && (
        <div>
          <img src={src} alt={alt} />
          <p className={css.modalCardDescription}>{alt}</p>
        </div>
      )}
    </Modal>
  );
};

export default ImageModal;
