import { createContext, useContext, useState, useEffect } from "react";
import { api } from "../lib/api";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On first load, if a token exists, try to restore the session.
  useEffect(() => {
    const token = localStorage.getItem("nova_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api.auth
      .me()
      .then((u) => setUser(u))
      .catch(() => {
        localStorage.removeItem("nova_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const { token, user } = await api.auth.login(email, password);
    localStorage.setItem("nova_token", token);
    setUser(user);
    return user;
  }

  async function signup(payload) {
    const { token, user } = await api.auth.signup(payload);
    localStorage.setItem("nova_token", token);
    setUser(user);
    return user;
  }

  function logout() {
    localStorage.removeItem("nova_token");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside an AuthProvider");
  return ctx;
}
