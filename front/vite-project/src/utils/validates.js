export const formValidates = (inputs) => {
  const errors = {};

  if (!inputs.username) errors.username = "el usuario es requerido";
  if (!inputs.password) errors.password = "la contrasena es requerida";

  if (!/[a-z-Z0-9]+$/.test(inputs.username))
    errors.username = "el username no puede contener caracteres especiales";

  if (inputs.password.length < 8)
    errors.password = "la contraseña debe contener al menos 8 caracteres";
  if (!/[A-Z]/.test(inputs.password))
    errors.password = "la contraseña debe contener al menos 1 letra mayuscula";
  if (!/[0-9]/.test(inputs.password))
    errors.password = "la contraseña debe contener al menos 1 numero";
  if (!/[^A-Za-z0-9]/.test(inputs.password))
    errors.password =
      "la contraseña debe contener al menos 1 caracter especial";

  return errors;
};

export const registerFormValidates = (input) => {
  const errors = {};
  if (!input.name.trim()) {
    errors.name = "El nombre es obligatorio";
  } else if (!/^[A-Za-záéíóúÁÉÍÓÚñÑ\s]+$/.test(input.name)) {
    errors.name = "El nombre debe ser válido";
  }

  if (!input.email.trim()) {
    errors.email = "El email es obligatorio";
  } else if (!/^\S+@\S+\.\S+$/.test(input.email)) {
    errors.email = "El email debe tener un formato válido";
  }

  if (!input.birthdate) {
    errors.birthdate = "La fecha de nacimiento es obligatoria";
  } else {
    const today = new Date();
    const birthdate = new Date(input.birthdate);
    const age = today.getFullYear() - birthdate.getFullYear();
    const monthDiff = today.getMonth() - birthdate.getMonth();
    const dayDiff = today.getDate() - birthdate.getDate();

    if (
      age < 18 ||
      (age === 18 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))
    ) {
      errors.birthdate = "El usuario debe ser mayor de 18 años";
    }
  }

  if (!input.nDni) {
    errors.nDni = "El DNI es obligatorio";
  } else if (!/^\d+$/.test(input.nDni)) {
    errors.nDni = "El DNI solo debe contener números";
  } else if (input.nDni.length < 7 || input.nDni.length > 8) {
    errors.nDni = "El DNI debe tener entre 7 y 8 dígitos";
  }

  if (!input.username.trim()) {
    errors.username = "El nombre de usuario es obligatorio";
  } else if (!/^[a-zA-Z0-9]+$/.test(input.username)) {
    errors.username =
      "El nombre de usuario solo puede contener letras y números";
  }

  if (!input.password.trim()) {
    errors.password = "La contraseña es obligatoria";
  } else if (input.password.length < 8) {
    errors.password = "La contraseña debe tener al menos 8 caracteres";
  } else if (!/[A-Z]/.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos una letra mayúscula";
  } else if (!/[0-9]/.test(input.password)) {
    errors.password = "La contraseña debe contener al menos un número";
  } else if (!/[^A-Za-z0-9]/.test(input.password)) {
    errors.password =
      "La contraseña debe contener al menos un carácter especial";
  }

  return errors;
};

const isTimeValid = (time) => {
  const [hour, minute] = time.split(":").map(Number);
  const totalMinutes = hour * 60 + minute;
  const startTime = 8 * 60;
  const endTime = 18 * 60;

  return totalMinutes >= startTime && totalMinutes < endTime;
};

export const dateTimeValidates = (inputs) => {
  const errors = {};
  const { date, time } = inputs;
  const selectedDateTime = new Date(`${date}T${time}`);
  const now = new Date();
  const twentyFourHoursLater = new Date(now.getTime() + 24 * 60 * 60 * 1000);

  if (!date) {
    errors.date = "La fecha es obligatoria";
  } else if (selectedDateTime < now) {
    errors.date = "No puedes seleccionar una fecha pasada";
  } else if (selectedDateTime < twentyFourHoursLater) {
    errors.date =
      "Debes seleccionar una fecha con al menos 24 horas de anticipación";
  } else if (
    selectedDateTime.getDay() === 0 ||
    selectedDateTime.getDay() === 6
  ) {
    errors.date = "No se pueden agendar turnos los fines de semana";
  }

  if (!time) {
    errors.time = "La hora es obligatoria";
  } else if (!isTimeValid(time)) {
    errors.time = "La hora debe estar entre las 8 AM y las 6 PM";
  }

  return errors;
};
