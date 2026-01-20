import styles from "./Loader.module.css";
import { Radio } from "react-loader-spinner";
export default function Loader() {
  return (
    <div className={styles.backdrop}>
      <Radio />
    </div>
  );
}
