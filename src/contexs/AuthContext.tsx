import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type AuthContextType = {
  payload: LoginPayload | null;
  login: (payload: LoginPayload) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [data, setData] = useState<LoginPayload | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('user_auth');
    if (stored) setData(JSON.parse(stored));
  }, []);

  const login = (p: LoginPayload) => {
    setData(p);
    localStorage.setItem('user_auth', JSON.stringify(p));
  };

  const logout = () => {
    setData(null);
    localStorage.removeItem('user_auth');
  };

  return (
    <AuthContext.Provider value={{ payload: data, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
