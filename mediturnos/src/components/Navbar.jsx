import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();

  return (
    <header className="navbar">
      <div>
        <strong>🏥 MediTurnos</strong>
      </div>

      <div className="navbar-user">
        <span>Hola, {user?.name}</span>

        <button onClick={logout}>
          Cerrar sesión
        </button>
      </div>
    </header>
  );
}
