// API externa de demostración: JSONPlaceholder (https://jsonplaceholder.typicode.com)
// Acepta GET, PATCH y DELETE y responde como una API real,
// pero NO guarda los cambios de forma permanente.
const API_URL = "https://jsonplaceholder.typicode.com";

const DOCTORS = ["Dra. María González", "Dr. Carlos Rodríguez", "Dra. Laura Martínez"];
const SPECIALTIES = ["Medicina General", "Cardiología", "Dermatología"];
const DATES = ["2026-10-15", "2026-10-20", "2026-10-25"];
const TIMES = ["09:30", "14:00", "11:00"];

// Hace la petición y convierte los fallos en errores con un mensaje claro
async function request(url, options, errorMessage) {
  let response;

  try {
    response = await fetch(url, options);
  } catch {
    // fetch falla (no lanza respuesta) cuando no hay internet
    throw new Error("Sin conexión con el servidor. Revisa tu internet.");
  }

  if (!response.ok) {
    throw new Error(`${errorMessage} (Error HTTP ${response.status})`);
  }

  return response;
}

/** Obtener citas desde la API (GET) */
export const getAppointments = async () => {
  const response = await request(
    `${API_URL}/posts?_limit=3`,
    undefined,
    "No fue posible cargar las citas médicas"
  );
  const data = await response.json();

  // Se adaptan los datos de la API al formato de la aplicación
  return data.map((item, index) => ({
    id: item.id,
    doctor: DOCTORS[index],
    specialty: SPECIALTIES[index],
    date: DATES[index],
    time: TIMES[index],
    status: "Confirmada"
  }));
};

/** Cancelar una cita (DELETE) */
export const cancelAppointmentAPI = async (id) => {
  await request(
    `${API_URL}/posts/${id}`,
    { method: "DELETE" },
    "No fue posible cancelar la cita"
  );
  return true;
};

/** Reagendar una cita (PATCH) */
export const rescheduleAppointmentAPI = async (id, date, time) => {
  const response = await request(
    `${API_URL}/posts/${id}`,
    {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ date, time })
    },
    "No fue posible reagendar la cita"
  );
  return response.json();
};
