import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { validateLogin } from "../utils/validations";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    const validationError = validateLogin(email, password);
    if (validationError) {
      setError(validationError);
      return;
    }

    if (login(email, password)) {
      navigate("/dashboard");
    } else {
      setError("Correo o contraseña incorrectos.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">🏥</div>

        <h1>MediTurnos</h1>

        <p className="subtitle">
          Gestión de citas médicas
        </p>

        <form onSubmit={handleSubmit} noValidate>
          <label htmlFor="email">Correo electrónico</label>

          <input
            id="email"
            name="email"
            type="email"
            autoComplete="username"
            required
            placeholder="usuario@mediturnos.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <label htmlFor="password">Contraseña</label>

          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            placeholder="••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <p className="error-message" role="alert">
              {error}
            </p>
          )}

          <button type="submit">
            Iniciar sesión
          </button>
        </form>

        <p className="demo">
          Demo: usuario@mediturnos.com / 123456
        </p>
      </div>
    </div>
  );
}
