import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    // Si el almacenamiento está vacío o contiene JSON inválido, iniciar sin sesión.
    try {
      const savedUser = localStorage.getItem("mediturnos_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      localStorage.removeItem("mediturnos_user");
      return null;
    }
  });

  // Autenticación simulada (la API de demostración no tiene login)
  const login = (email, password) => {
    const normalizedEmail = email.trim().toLowerCase();

    // Credenciales de demostración; no es autenticación real de producción.
    if (normalizedEmail === "usuario@mediturnos.com" && password === "123456") {
      const userData = {
        name: "Lizeth Parroquiano",
        email: normalizedEmail
      };

      setUser(userData);
      try {
        localStorage.setItem("mediturnos_user", JSON.stringify(userData));
      } catch (error) {
        // La sesión seguirá activa mientras la aplicación permanezca abierta.
        console.warn("No fue posible guardar la sesión en este navegador.", error);
      }

      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem("mediturnos_user");
    } catch (error) {
      console.warn("No fue posible borrar la sesión guardada.", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
