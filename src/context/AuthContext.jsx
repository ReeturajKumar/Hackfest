import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import authAPI from '../api/auth';

const AuthContext = createContext(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  // Check for existing session on mount
  useEffect(() => {
    const initAuth = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const storedUser = sessionStorage.getItem('user');

        if (token && storedUser) {
          try {
            // Verify token is still valid by fetching profile
            const response = await authAPI.getProfile();
            if (response.data) {
              setUser(response.data);
              setIsAuthenticated(true);
              sessionStorage.setItem('user', JSON.stringify(response.data));
            }
          } catch (error) {
            // Token invalid, clear everything
            console.error('Token validation failed:', error);
            localStorage.removeItem('token');
            sessionStorage.removeItem('token');
            sessionStorage.removeItem('user');
            setUser(null);
            setIsAuthenticated(false);
          }
        } else if (storedUser) {
          // User data exists but no token
          try {
            const parsedUser = JSON.parse(storedUser);
            setUser(parsedUser);
            setIsAuthenticated(true);
          } catch (error) {
            sessionStorage.removeItem('user');
          }
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
      } finally {
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  // Listen for storage changes (cross-tab sync)
  useEffect(() => {
    const handleStorageChange = (e) => {
      // Only handle storage events from other tabs (not same tab)
      if (e.key === 'user' || e.key === null) {
        const storedUser = sessionStorage.getItem('user');
        if (storedUser) {
          try {
            const parsedUser = JSON.parse(storedUser);
            // Only update if user data actually changed
            setUser(prevUser => {
              if (JSON.stringify(prevUser) === JSON.stringify(parsedUser)) {
                return prevUser; // No change, return previous to prevent re-render
              }
              return parsedUser;
            });
            setIsAuthenticated(true);
          } catch (error) {
            setUser(null);
            setIsAuthenticated(false);
          }
        } else {
          setUser(null);
          setIsAuthenticated(false);
        }
      }
    };

    // Only listen to storage events (cross-tab), not custom events that might cause loops
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);

  const login = async (email, password) => {
    try {
      setLoading(true);
      const response = await authAPI.login(email, password);
      
      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('userLogin'));
        return { success: true, data: response.data };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Login error:', error);
      return { 
        success: false, 
        error: error.message || 'Login failed. Please check your credentials.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const register = async (userData) => {
    try {
      setLoading(true);
      const response = await authAPI.register(userData);
      
      if (response.data?.user) {
        setUser(response.data.user);
        setIsAuthenticated(true);
        sessionStorage.setItem('user', JSON.stringify(response.data.user));
        window.dispatchEvent(new Event('userLogin'));
        return { success: true, data: response.data };
      }
      
      throw new Error('Invalid response format');
    } catch (error) {
      console.error('Registration error:', error);
      return { 
        success: false, 
        error: error.message || 'Registration failed. Please try again.' 
      };
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setUser(null);
      setIsAuthenticated(false);
      sessionStorage.removeItem('user');
      navigate('/');
    }
  };

  const refreshUser = useCallback(async () => {
    try {
      const response = await authAPI.getProfile();
      if (response.data) {
        setUser(response.data);
        sessionStorage.setItem('user', JSON.stringify(response.data));
        return response.data;
      }
    } catch (error) {
      console.error('Refresh user error:', error);
    }
  }, []);

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    setUser,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

