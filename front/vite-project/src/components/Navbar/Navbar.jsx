import { Link, useNavigate } from "react-router-dom";
import styles from "../Navbar/Navbar.module.css";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

const Navbar = () => {
  const { logOutUser } = useContext(UsersContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    localStorage.removeItem("user");
    navigate("/login");
    logOutUser();
  };
  return (
    <div className={styles.navbarContainer}>
      <nav className={styles.navbar}>
        <li className={styles.navItem}>
          <Link
            to="/"
            className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
          >
            Home
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/agendarturno"
            className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
          >
            Agendar turno
          </Link>
        </li>
        <li className={styles.navItem}>
          <Link
            to="/misturnos"
            className={`${styles.navLink} ${location.pathname === "/" ? styles.active : ""}`}
          >
            Mis turnos
          </Link>
        </li>
        <li className={styles.navLink} onClick={handleLogOut}>
          LogOut
        </li>
      </nav>
    </div>
  );
};

export default Navbar;
