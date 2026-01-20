import { createPortal } from "react-dom";
import type { Photo } from "../../types/photo";

import styles from "./Modal.module.css";
import { useEffect } from "react";

interface ModalProps {
  onClose: () => void;
  photo: Photo;
}

export default function Modal({ onClose, photo }: ModalProps) {
   useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };
  return createPortal(
    <div onClick={handleBackdropClick} className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          aria-label="Close modal"
          onClick={onClose}
        >
          &times;
        </button>
        <img src={photo.src.large} alt={photo.alt} className={styles.image} />
      </div>
    </div>, document.body
  );
}
