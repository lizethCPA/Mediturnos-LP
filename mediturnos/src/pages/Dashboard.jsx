import Navbar from "../components/Navbar";
import AppointmentCard from "../components/AppointmentCard";
import { useAppointments } from "../context/AppointmentContext";

export default function Dashboard() {
  const { appointments, loading, error, notice, loadAppointments } =
    useAppointments();

  const activeAppointments = appointments.filter(
    (appointment) => appointment.status !== "Cancelada"
  );

  const cancelledAppointments = appointments.filter(
    (appointment) => appointment.status === "Cancelada"
  );

  return (
    <div className="dashboard">
      <Navbar />

      <main className="dashboard-content">
        <section className="welcome">
          <h1>Mis citas médicas</h1>
          <p>Consulta y administra tus próximas citas.</p>
        </section>

        {error && (
          <div className="api-error" role="alert">
            <strong>⚠️ Error</strong>
            <p>{error}</p>
            <button onClick={loadAppointments}>Intentar nuevamente</button>
          </div>
        )}

        {notice && !error && (
          <p className="notice" role="status">{notice}</p>
        )}

        <section className="statistics">
          <div className="stat-card">
            <span>📅</span>
            <div>
              <strong>{activeAppointments.length}</strong>
              <p>Citas activas</p>
            </div>
          </div>

          <div className="stat-card">
            <span>❌</span>
            <div>
              <strong>{cancelledAppointments.length}</strong>
              <p>Citas canceladas</p>
            </div>
          </div>
        </section>

        <section>
          <h2>Próximas citas</h2>

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Cargando citas médicas...</p>
            </div>
          ) : appointments.length === 0 ? (
            !error && (
              <div className="empty">
                <p>No tienes citas registradas.</p>
              </div>
            )
          ) : (
            <div className="appointments-list">
              {appointments.map((appointment) => (
                <AppointmentCard
                  key={appointment.id}
                  appointment={appointment}
                />
              ))}
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
