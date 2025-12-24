const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8080/api/v1';

// Helper function to get auth token from localStorage
const getToken = () => {
  return localStorage.getItem('token') || sessionStorage.getItem('token');
};

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { 'Authorization': `Bearer ${token}` })
  };
};

// API functions
export const authAPI = {
  // Register user
  register: async (userData) => {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Registration failed');
    }

    // Store token
    if (data.data?.token) {
      localStorage.setItem('token', data.data.token);
      sessionStorage.setItem('token', data.data.token);
    }

    return data;
  },

  // Login user
  login: async (email, password) => {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Login failed');
    }

    // Store token
    if (data.data?.token) {
      localStorage.setItem('token', data.data.token);
      sessionStorage.setItem('token', data.data.token);
    }

    return data;
  },

  // Logout user
  logout: async () => {
    const token = getToken();
    
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token && { 'Authorization': `Bearer ${token}` })
        },
        credentials: 'include',
      });
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear tokens and user data
      localStorage.removeItem('token');
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('user');
    }
  },

  // Get current user profile
  getProfile: async () => {
    const token = getToken();
    
    if (!token) {
      throw new Error('No token found');
    }

    const response = await fetch(`${API_URL}/auth/me`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      // If unauthorized, clear tokens
      if (response.status === 401) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
      throw new Error(data.message || 'Failed to fetch profile');
    }

    return data;
  },

  // Forgot password
  forgotPassword: async (email) => {
    const response = await fetch(`${API_URL}/auth/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to send reset email');
    }

    return data;
  },

  // Reset password
  resetPassword: async (token, password) => {
    const response = await fetch(`${API_URL}/auth/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ token, password }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Password reset failed');
    }

    return data;
  },

  // Update user profile
  updateProfile: async (profileData) => {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(profileData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Profile update failed', errors: data.errors };
      }
      throw new Error(data.message || 'Profile update failed');
    }

    return data;
  },
};

// Dashboard API
export const dashboardAPI = {
  // Get dashboard stats
  getStats: async () => {
    const response = await fetch(`${API_URL}/dashboard/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (response.status === 401) {
        localStorage.removeItem('token');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('user');
      }
      throw new Error(data.message || 'Failed to fetch dashboard stats');
    }

    return data;
  },
};

// Events API
export const eventsAPI = {
  // Get all events
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.mode) queryParams.append('mode', filters.mode);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/events${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch events');
    }

    return data;
  },

  // Get single event
  getById: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch event');
    }

    return data;
  },

  // Create event (Admin only)
  create: async (eventData) => {
    const response = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(eventData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Failed to create event', errors: data.errors };
      }
      throw new Error(data.message || 'Failed to create event');
    }

    return data;
  },

  // Update event (Admin only)
  update: async (id, eventData) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(eventData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Failed to update event', errors: data.errors };
      }
      throw new Error(data.message || 'Failed to update event');
    }

    return data;
  },

  // Delete event (Admin only)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete event');
    }

    return data;
  },

  // Enroll in event (User only)
  enroll: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}/enroll`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to enroll in event');
    }

    return data;
  },

  // Unenroll from event (User only)
  unenroll: async (id) => {
    const response = await fetch(`${API_URL}/events/${id}/unenroll`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to unenroll from event');
    }

    return data;
  },

  // Get my enrolled events
  getMyEvents: async () => {
    const response = await fetch(`${API_URL}/events/my/enrolled`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch enrolled events');
    }

    return data;
  },
};

// Admin API
export const adminAPI = {
  // Get admin dashboard stats
  getStats: async () => {
    const response = await fetch(`${API_URL}/admin/stats`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch admin stats');
    }

    return data;
  },

  // Get all users
  getUsers: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.page) queryParams.append('page', filters.page);
    if (filters.limit) queryParams.append('limit', filters.limit);
    if (filters.role) queryParams.append('role', filters.role);
    if (filters.mode) queryParams.append('mode', filters.mode);
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/admin/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch users');
    }

    return data;
  },

  // Get user by ID
  getUserById: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch user');
    }

    return data;
  },

  // Update user
  updateUser: async (id, userData) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(userData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Failed to update user', errors: data.errors };
      }
      throw new Error(data.message || 'Failed to update user');
    }

    return data;
  },

  // Delete user
  deleteUser: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete user');
    }

    return data;
  },

  // Promote user to admin
  promoteToAdmin: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/promote`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to promote user');
    }

    return data;
  },

  // Demote admin to user
  demoteAdmin: async (id) => {
    const response = await fetch(`${API_URL}/admin/users/${id}/demote`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to demote admin');
    }

    return data;
  },

  // Export users CSV
  exportUsersCSV: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.role) queryParams.append('role', filters.role);
    if (filters.mode) queryParams.append('mode', filters.mode);
    if (filters.category) queryParams.append('category', filters.category);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/admin/export/users${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to export users');
    }

    // Return blob for CSV download
    const blob = await response.blob();
    const url_blob = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `users_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url_blob);
    document.body.removeChild(a);

    return { success: true };
  },

  // Export events CSV
  exportEventsCSV: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.category) queryParams.append('category', filters.category);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/admin/export/events${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to export events');
    }

    // Return blob for CSV download
    const blob = await response.blob();
    const url_blob = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `events_export_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url_blob);
    document.body.removeChild(a);

    return { success: true };
  },

  // Export event participants CSV
  exportEventParticipantsCSV: async (eventId) => {
    const response = await fetch(`${API_URL}/admin/export/events/${eventId}/participants`, {
      method: 'GET',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    if (!response.ok) {
      const data = await response.json();
      throw new Error(data.message || 'Failed to export participants');
    }

    // Return blob for CSV download
    const blob = await response.blob();
    const url_blob = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url_blob;
    a.download = `event_${eventId}_participants_${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url_blob);
    document.body.removeChild(a);

    return { success: true };
  },
};

// Problem Statement API
export const problemStatementsAPI = {
  // Get all problem statements
  getAll: async (filters = {}) => {
    const queryParams = new URLSearchParams();
    if (filters.category) queryParams.append('category', filters.category);
    if (filters.difficulty) queryParams.append('difficulty', filters.difficulty);
    if (filters.status) queryParams.append('status', filters.status);
    if (filters.search) queryParams.append('search', filters.search);
    
    const queryString = queryParams.toString();
    const url = `${API_URL}/problem-statements${queryString ? `?${queryString}` : ''}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch problem statements');
    }

    return data;
  },

  // Get single problem statement
  getById: async (id) => {
    const response = await fetch(`${API_URL}/problem-statements/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to fetch problem statement');
    }

    return data;
  },

  // Create problem statement (Admin only)
  create: async (problemData) => {
    const response = await fetch(`${API_URL}/problem-statements`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(problemData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Failed to create problem statement', errors: data.errors };
      }
      throw new Error(data.message || 'Failed to create problem statement');
    }

    return data;
  },

  // Update problem statement (Admin only)
  update: async (id, problemData) => {
    const response = await fetch(`${API_URL}/problem-statements/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify(problemData),
    });

    const data = await response.json();
    
    if (!response.ok) {
      if (data.errors) {
        throw { message: data.message || 'Failed to update problem statement', errors: data.errors };
      }
      throw new Error(data.message || 'Failed to update problem statement');
    }

    return data;
  },

  // Delete problem statement (Admin only)
  delete: async (id) => {
    const response = await fetch(`${API_URL}/problem-statements/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
      credentials: 'include',
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to delete problem statement');
    }

    return data;
  },

  // Associate problem statement with event (Admin only)
  associateWithEvent: async (id, eventId) => {
    const response = await fetch(`${API_URL}/problem-statements/${id}/associate-event`, {
      method: 'POST',
      headers: getAuthHeaders(),
      credentials: 'include',
      body: JSON.stringify({ eventId }),
    });

    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || 'Failed to associate problem statement with event');
    }

    return data;
  },
};

export default authAPI;

