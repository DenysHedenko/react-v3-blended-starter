import { FiSearch } from "react-icons/fi";
import styles from "./Form.module.css";

export default function Form() {
  return (
    <form className={styles.form}>
      <input
        className={styles.input}
        placeholder="What do you want to write?"
        name="search"
        autoFocus
      />

      <button className={styles.button} type="submit">
        <FiSearch size="16px" />
      </button>
    </form>
  );
}
