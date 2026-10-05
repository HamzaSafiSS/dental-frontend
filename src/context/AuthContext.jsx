import { createContext, useState, useEffect, useContext } from 'react';
import { login as apiLogin, logout as apiLogout, getCurrentUser } from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const res = await getCurrentUser();
          setUser(res.data);
        } catch (error) {
          console.error("Failed to fetch user data on load", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  const login = async (email, password) => {
    const res = await apiLogin(email, password);
    const { accessToken, refreshToken, user: userData } = res.data;
    
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    
    // Some backends might not return full user object on login, so we might need to fetch it.
    // If your token response contains the user object (like id, email, role), use it directly.
    let loggedInUser = userData;
    if (userData && userData.role) {
       setUser(userData);
    } else {
       const userRes = await getCurrentUser();
       loggedInUser = userRes.data;
       setUser(loggedInUser);
    }
    return loggedInUser;
  };

  const logout = async () => {
    try {
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        await apiLogout(refreshToken);
      }
    } catch (e) {
      console.error("Logout failed on server, continuing local logout.", e);
    } finally {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
