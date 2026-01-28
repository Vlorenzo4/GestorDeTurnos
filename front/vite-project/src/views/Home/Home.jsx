import styles from "./Home.module.css";
import logo from "../../assets/logo-maso.png";

function Home() {
  return (
    <div className={styles.homeWrapper}>
      <img src={logo} alt="Logo Masoterapia" className={styles.logo} />

      <h1 className={styles.homeTitle}>Bienvenido</h1>

      <p className={styles.homeSubtitle}>
        Gestioná tus turnos de masoterapia de forma simple y relajada
      </p>
    </div>
  );
}

export default Home;
