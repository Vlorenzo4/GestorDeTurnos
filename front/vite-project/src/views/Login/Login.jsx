import { useFormik } from "formik";
import { formValidates } from "../../utils/validates";
import Swal from "sweetalert2";
import styles from "./Login.module.css";
import logo from "../../assets/logo-maso.png";
import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Login() {
  const { loginUser } = useContext(UsersContext);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    initialErrors: {
      username: "Nombre de usuario es requerido",
      password: "contraseña es requerida",
    },
    validate: formValidates,
    onSubmit: (values) => {
      loginUser(values)
        .then((response) => {
          if (response.status === 200) {
            Swal.fire({
              icon: "success",
              title: "Usuario logeado con exito",
            });
          }
          navigate("/");
        })
        .catch((errors) => {
          Swal.fire({
            icon: "error",
            title: `${errors.response.data.msg}`,
            text: "Intente de nuevo",
          });
        });
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.loginContainer} onSubmit={formik.handleSubmit}>
        <div className={styles.logoContainer}>
          <img src={logo} alt="Logo masoterapia" className={styles.logo} />
        </div>
        <h2 className={styles.loginTitle}>Formulario de login</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre de usuario:</label>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="Tu nombre de usuario"
            onChange={formik.handleChange}
          />
          {formik.errors.username && formik.errors.username ? (
            <label className={styles.errorLabel}>
              {formik.errors.username}
            </label>
          ) : null}
        </div>
        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Contraseña:</label>
          <input
            className={styles.formInput}
            type="password"
            name="password"
            placeholder="⚫⚫⚫⚫⚫"
            onChange={formik.handleChange}
          />
          {formik.errors.password && formik.errors.password ? (
            <label className={styles.errorLabel}>
              {formik.errors.password}
            </label>
          ) : null}
        </div>
        <button
          className={styles.formButton}
          type="submit"
          disabled={
            Object.keys(formik.errors).length > 0 ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Submit
        </button>
        <br />
        <label className={styles.formLabel}>
          No tiene una cuenta? <Link to="/register">Registrate</Link>
        </label>
      </form>
    </div>
  );
}

export default Login;
