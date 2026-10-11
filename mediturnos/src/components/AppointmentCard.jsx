import { useState } from "react";
import { useAppointments } from "../context/AppointmentContext";
import { getLocalDateString, validateReschedule } from "../utils/validations";

export default function AppointmentCard({ appointment }) {
  const { cancelAppointment, rescheduleAppointment } = useAppointments();

  const [showForm, setShowForm] = useState(false);
  const [newDate, setNewDate] = useState(appointment.date);
  const [newTime, setNewTime] = useState(appointment.time);
  const [formError, setFormError] = useState("");
  const [saving, setSaving] = useState(false);

  const handleCancel = async () => {
    const confirmCancel = window.confirm("¿Deseas cancelar esta cita?");

    if (confirmCancel) {
      setSaving(true);
      try {
        await cancelAppointment(appointment.id);
      } finally {
        setSaving(false);
      }
    }
  };

  const handleReschedule = async (e) => {
    e.preventDefault();
    setFormError("");

    const validationError = validateReschedule(newDate, newTime);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    try {
      const ok = await rescheduleAppointment(appointment.id, newDate, newTime);
      if (ok) setShowForm(false);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="appointment-card">
      <div className="appointment-header">
        <div className="doctor-icon">👨‍⚕️</div>

        <div>
          <h3>{appointment.doctor}</h3>
          <p>{appointment.specialty}</p>
        </div>

        <span
          className={`status ${appointment.status
            .toLowerCase()
            .replace(" ", "-")}`}
        >
          {appointment.status}
        </span>
      </div>

      <div className="appointment-info">
        <div>
          <strong>📅 Fecha</strong>
          <span>{appointment.date}</span>
        </div>

        <div>
          <strong>🕐 Hora</strong>
          <span>{appointment.time}</span>
        </div>
      </div>

      {appointment.status !== "Cancelada" && (
        <div className="appointment-actions">
          <button
            className="secondary-button"
            onClick={() => { setShowForm(!showForm); setFormError(""); }}
            disabled={saving}
          >
            Reagendar
          </button>

          <button
            className="danger-button"
            onClick={handleCancel}
            disabled={saving}
          >
            Cancelar
          </button>
        </div>
      )}

      {showForm && (
        <form
          className="reschedule-form"
          onSubmit={handleReschedule}
          noValidate
        >
          <label>Nueva fecha</label>

          <input
            type="date"
            min={getLocalDateString()}
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />

          <label>Nueva hora</label>

          <input
            type="time"
            min="07:00"
            max="18:00"
            value={newTime}
            onChange={(e) => setNewTime(e.target.value)}
          />

          {formError && (
            <p className="error-message" role="alert">{formError}</p>
          )}

          <button type="submit" disabled={saving}>
            {saving ? "Guardando..." : "Guardar cambios"}
          </button>
        </form>
      )}
    </div>
  );
}
