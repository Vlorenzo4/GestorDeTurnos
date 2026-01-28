import { useContext, useEffect } from "react";
import Turno from "../../components/Turno/Turno";
import styles from "./MisTurnos.module.css";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";
import { useState } from "react";

function MisTurnos() {
  const { myApp, getUserAppointments } = useContext(UsersContext);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getUserAppointments()
      .then(() => setLoading(false))
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Ocurrió un error al pedir los turnos",
          text: error.msg,
        });
      });
  }, []);

  return (
    <div className={styles.turnosWrapper}>
      <h1 className={styles.turnosTitle}>Mis Turnos</h1>

      {loading ? (
        <h2 className={styles.infoText}>Cargando turnos...</h2>
      ) : myApp.length > 0 ? (
        <div className={styles.turnosGrid}>
          {myApp.map((app) => (
            <Turno
              key={app.id}
              id={app.id}
              date={app.date}
              time={app.time}
              status={app.status}
            />
          ))}
        </div>
      ) : (
        <h2 className={styles.infoText}>No tienes turnos agendados</h2>
      )}
    </div>
  );
}

export default MisTurnos;
