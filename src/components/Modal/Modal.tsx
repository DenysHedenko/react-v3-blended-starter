import styles from "./Modal.module.css";

export default function Modal() {
  return (
    <div className={styles.backdrop} role="dialog" aria-modal="true">
      <div className={styles.modal}>
        <button className={styles.closeButton} aria-label="Close modal">
          &times;
        </button>
      </div>
    </div>
  );
}
