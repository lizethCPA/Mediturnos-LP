import { createContext, useContext, useEffect, useState } from "react";

import {
  getAppointments,
  cancelAppointmentAPI,
  rescheduleAppointmentAPI
} from "../services/appointmentService";

const AppointmentContext = createContext();

export function AppointmentProvider({ children }) {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  /** Cargar las citas desde la API */
  const loadAppointments = async () => {
    try {
      setLoading(true);
      setError("");
      setAppointments(await getAppointments());
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Se ejecuta una vez al iniciar la aplicación
  useEffect(() => {
    loadAppointments();
  }, []);

  /** Cancelar cita. Devuelve true si salió bien. */
  const cancelAppointment = async (id) => {
    try {
      setError("");
      setNotice("");
      await cancelAppointmentAPI(id);

      setAppointments((current) =>
        current.map((a) => (a.id === id ? { ...a, status: "Cancelada" } : a))
      );
      setNotice("La cita fue cancelada.");
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    }
  };

  /** Reagendar cita. Devuelve true si salió bien. */
  const rescheduleAppointment = async (id, newDate, newTime) => {
    try {
      setError("");
      setNotice("");
      await rescheduleAppointmentAPI(id, newDate, newTime);

      setAppointments((current) =>
        current.map((a) =>
          a.id === id
            ? { ...a, date: newDate, time: newTime, status: "Reagendada" }
            : a
        )
      );
      setNotice("La cita fue reagendada correctamente.");
      return true;
    } catch (err) {
      console.error(err);
      setError(err.message);
      return false;
    }
  };

  return (
    <AppointmentContext.Provider
      value={{
        appointments,
        loading,
        error,
        notice,
        loadAppointments,
        cancelAppointment,
        rescheduleAppointment
      }}
    >
      {children}
    </AppointmentContext.Provider>
  );
}

export function useAppointments() {
  return useContext(AppointmentContext);
}
