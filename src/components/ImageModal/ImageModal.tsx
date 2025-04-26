import Modal from "react-modal"; 
//👆не забути інсталювати бібліотеку npm install --save-dev @types/react-modal

import { useEffect, useState } from "react";
import css from "./ImageModal.module.css";

Modal.setAppElement("#root");

//типізую своє щастя
type ImageModalProps = {
  src: string | null;
  alt: string;
  onClose: () => void;
}
const ImageModal: React.FC<ImageModalProps>  = ({ src, alt, onClose }) => {
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
