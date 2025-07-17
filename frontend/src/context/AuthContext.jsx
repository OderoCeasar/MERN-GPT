import axios from "axios";
import {
  userLogin,
  getAuthStatus,
  logoutUser,
  userSignup
} from "../../services/api";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo
} from "react";

// 1. Create the context
const AuthContext = createContext(null);

// 2. Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check if the user is already authenticated
  useEffect(() => {
    const fetchAuthStatus = async () => {
      try {
        console.log("Fetching auth status from:", axios.defaults.baseURL + "/user/auth-status");
        const data = await getAuthStatus();
        if (data?.email && data?.name) {
          setUser({ email: data.email, name: data.name });
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error("Auth status check failed:", error.message);
      }
    };

    fetchAuthStatus();
  }, []);

  // Login Handler
  const login = useCallback(async (email, password) => {
    try {
      const data = await userLogin(email, password);
      if (data?.email && data?.name) {
        setUser({ email: data.email, name: data.name });
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Login failed:", error.message);
      throw error;
    }
  }, []);

  // Signup Handler
  const signup = useCallback(async (name, email, password) => {
    try {
      await userSignup(name, email, password);
    } catch (error) {
      console.error("Signup failed:", error.message);
      throw error;
    }
  }, []);

  // Logout Handler
  const logout = useCallback(async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout failed:", error.message);
    } finally {
      setUser(null);
      setIsLoggedIn(false);
    }
  }, []);

  // Memoize context value to avoid unnecessary re-renders
  const value = useMemo(
    () => ({
      user,
      isLoggedIn,
      login,
      signup,
      logout
    }),
    [user, isLoggedIn, login, signup, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// 3. Hook for consuming context
export const useAuth = () => useContext(AuthContext);
