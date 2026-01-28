import { Link } from "react-router-dom";
import styles from "./NotFound.module.css";

function NotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}> 404 </h1>
      <p className={styles.message}>Oops! la pagina que buscas no existe 🔎 </p>
      <Link to="/" className={styles.homeButton}>
        Volver al Home
      </Link>
    </div>
  );
}

export default NotFound;
