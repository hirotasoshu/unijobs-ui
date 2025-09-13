import { createContext, useContext, useEffect, useState } from "react";
import { IdentityProvider } from "./idp";
import { UserId } from "../../domain/valueObjects/id";

export interface AuthContextType {
  isAuthenticated: boolean;
  username: string | null;
  userId: UserId | null;
  roles: string[];
  login: () => Promise<void>;
  logout: () => Promise<void>;
  getToken: () => Promise<string | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({
  children,
  provider,
}: {
  children: React.ReactNode;
  provider: IdentityProvider;
}) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<UserId | null>(null);
  const [roles, setRoles] = useState<string[]>([]);

  useEffect(() => {
    const init = async () => {
      await provider.init();
      setIsAuthenticated(provider.isAuthenticated());
      setUsername(provider.getUsername());
      setUserId(provider.getUserId());
      setRoles(provider.getRoles());
    };
    init();
  }, [provider]);

  const login = async () => {
    await provider.login();
    setIsAuthenticated(provider.isAuthenticated());
    setUsername(provider.getUsername());
    setUserId(provider.getUserId());
    setRoles(provider.getRoles());
  };

  const logout = async () => {
    await provider.logout();
    setIsAuthenticated(false);
    setUsername(null);
    setUserId(null);
    setRoles([]);
  };

  const getToken = async () => {
    return provider.getToken();
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        username,
        userId,
        roles,
        login,
        logout,
        getToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
