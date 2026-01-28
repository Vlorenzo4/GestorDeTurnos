import { useFormik } from "formik";
import { registerFormValidates } from "../../utils/validates";
import Swal from "sweetalert2";
import styles from "./Register.module.css";
import logo from "../../assets/logo-maso.png";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { UsersContext } from "../../context/UsersContext";

function Register() {
  const { registerUser } = useContext(UsersContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      birthdate: "",
      nDni: "",
      username: "",
      password: "",
    },
    initialErrors: {
      name: "Nombre es requerido",
      email: "Email es requerido",
      birthdate: "es requerido",
      nDni: "Dni es requerido",
      username: "Nombre de usuario es requerido",
      password: "Contrasena es requerida",
    },
    validate: registerFormValidates,
    onSubmit: (values) => {
      registerUser(values)
        .then(() => {
          Swal.fire({
            icon: "success",
            title: "Usuario registrado con exito",
          });
          formik.resetForm();
        })
        .catch((err) => {
          if (err.response.data.msg.includes("username")) {
            Swal.fire({
              icon: "error",
              title: `${err.response.data.msg}`,
            });
          }
          if (err.response.data.msg.includes("email")) {
            Swal.fire({
              icon: "error",
              title: `Ya existe un usuario con el correo ${formik.values.email}`,
            });
          }
          if (err.response.data.msg.includes("nDni")) {
            Swal.fire({
              icon: "error",
              title: `Ya  existe un usuario con el DNI ${formik.values.nDni}`,
            });
          }
        });
    },
  });

  return (
    <div className={styles.pageWrapper}>
      <form className={styles.formContainer} onSubmit={formik.handleSubmit}>
        <img src={logo} alt="G.A Masoterapia" className={styles.logo} />
        <h2>Formulario de Registro</h2>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre:</label>
          <input
            className={styles.formInput}
            type="text"
            name="name"
            placeholder="Tu nombre"
            onChange={formik.handleChange}
            onBlur={formik.onBlur}
            value={formik.values.name}
          />
          {formik.errors.name && formik.errors.name ? (
            <label className={styles.errorLabel}>{formik.errors.name}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Email:</label>
          <input
            className={styles.formInput}
            type="text"
            name="email"
            placeholder="mail@mail.com"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
          />
          {formik.errors.email && formik.errors.email ? (
            <label className={styles.errorLabel}>{formik.errors.email}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Fecha de nacimiento:</label>
          <input
            className={styles.formInput}
            type="date"
            name="birthdate"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.birthdate}
          />
          {formik.errors.birthdate && formik.errors.birthdate ? (
            <label className={styles.errorLabel}>
              {formik.errors.birthdate}
            </label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>nDni:</label>
          <input
            className={styles.formInput}
            type="text"
            name="nDni"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.nDni}
          />
          {formik.errors.nDni && formik.errors.nDni ? (
            <label className={styles.errorLabel}>{formik.errors.nDni}</label>
          ) : null}
        </div>

        <div className={styles.formGroup}>
          <label className={styles.formLabel}>Nombre de usuario:</label>
          <input
            className={styles.formInput}
            type="text"
            name="username"
            placeholder="Tu nombre de usuario"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.username}
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
            onBlur={formik.handleBlur}
            value={formik.values.password}
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
            !formik.values.name ||
            !formik.values.email ||
            !formik.values.birthdate ||
            !formik.values.nDni ||
            !formik.values.username ||
            !formik.values.password
          }
        >
          Submit
        </button>
        <br />
        <label className={styles.formLabel}>
          Ya tienes una cuenta? <Link to="/login">Login</Link>
        </label>
      </form>
    </div>
  );
}

export default Register;
