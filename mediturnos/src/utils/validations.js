export function getLocalDateString(date = new Date()) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export function validateLogin(email, password) {
  if (!email.trim() || !password) return "Todos los campos son obligatorios.";
  if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    return "El correo no tiene un formato válido.";
  }
  if (password.length < 6) return "La contraseña debe tener al menos 6 caracteres.";
  return "";
}

export function validateReschedule(date, time) {
  if (!date || !time) return "Selecciona una fecha y una hora.";
  if (date < getLocalDateString()) return "No puedes elegir una fecha pasada.";
  if (time < "07:00" || time > "18:00") {
    return "El horario de atención es de 7:00 a 18:00.";
  }
  return "";
}
