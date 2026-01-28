import { useContext } from "react";
import styles from "./Turno.module.css";
import { UsersContext } from "../../context/UsersContext";
import Swal from "sweetalert2";

function Turno({ id, date, time, status }) {
  const { cancelAppointment } = useContext(UsersContext);

  const handleCancel = () => {
    cancelAppointment(id)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Turno cancelado con éxito",
        });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Error al cancelar el turno",
          text: error.data,
        });
      });
  };

  return (
    <div className={styles.card}>
      <div>
        <h3 className={styles.title}>Turno #{id}</h3>
        <span
          className={
            status === "Active" ? styles.statusActive : styles.statusInactive
          }
        >
          {status}
        </span>
      </div>

      <div className={styles.info}>
        <p>
          <strong>Fecha:</strong> <span>{date}</span>
        </p>
        <p>
          <strong>Hora:</strong> <span>{time}</span>
        </p>
      </div>
      <button
        className={`${styles.cancelButton} ${status === "Cancelled" ? styles.disabled : ""}`}
        onClick={handleCancel}
        disabled={status === "Cancelled"}
      >
        Cancelar turno
      </button>
    </div>
  );
}

export default Turno;
