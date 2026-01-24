import { FiSearch } from "react-icons/fi";
import styles from "./Form.module.css";
import toast from "react-hot-toast";

interface FormProps {
  onSubmit: (query: string) => void;
}

export default function Form({ onSubmit }: FormProps) {
  const handleSubmit = (formData: FormData) => {
    const query = formData.get("search") as string;
    if (query.trim() === "") {
      toast.error("Please enter query");
      return;
    }
    onSubmit(query.trim());
  };

  return (
    <form className={styles.form} action={handleSubmit}>
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
