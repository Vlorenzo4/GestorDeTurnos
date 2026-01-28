import styles from "./AgendarTurno.module.css";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { dateTimeValidates } from "../../utils/validates";
import { UsersContext } from "../../context/UsersContext";
import { useContext } from "react";

function AgendarTurno() {
  const { scheduleAppointment } = useContext(UsersContext);
  const formik = useFormik({
    initialValues: {
      date: "",
      time: "",
    },
    initialErrors: {
      date: "Es requeria una fecha",
      time: "Es requerido un horario",
    },
    validate: dateTimeValidates,
    onSubmit: (values) => {
      scheduleAppointment(values)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Turno agendado con exito",
          });
        })
        .catch((error) => {
          Swal.fire({
            icon: "error",
            title: "No se pudo agendar el turno",
            text: error.data,
          });
        });
    },
  });

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Agendar Turno</h1>
      <form className={styles.form} onSubmit={formik.handleSubmit}>
        <div className={styles.formGroup}>
          <label htmlFor="date">Fecha</label>
          <input
            id="date"
            name="date"
            type="date"
            min={new Date().toISOString().split("T")[0]}
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.date}
            className={
              formik.touched.date && formik.errors.date
                ? styles.errorInput
                : styles.input
            }
          />
          {formik.errors.date ? (
            <>
              <div className={styles.error}>{formik.errors.date}</div>
            </>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label htmlFor="time">Hora</label>
          <input
            id="time"
            name="time"
            type="time"
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.time}
            className={
              formik.touched.time && formik.errors.time
                ? styles.errorInput
                : styles.input
            }
          />
          {formik.errors.time ? (
            <>
              <div className={styles.error}>{formik.errors.time}</div>
            </>
          ) : null}
        </div>

        <button
          type="submit"
          className={styles.submitButton}
          disabled={Object.keys(formik.errors).length > 0}
        >
          Agendar
        </button>
      </form>
    </div>
  );
}

export default AgendarTurno;
