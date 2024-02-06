import axios from "axios";

axios.defaults.withCredentials = true;

export const signup = async (userData) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/signup`,
    userData
  );
};

export const login = async (credentials) => {
  return axios.post(
    `${import.meta.env.VITE_API_URL}/api/users/login`,
    credentials
  );
};
export const logout = async () => {
  try {
    await axios.get(`${import.meta.env.VITE_API_URL}/api/users/logout`, {
      withCredentials: true,
    });
    console.log("Logged out successfully");
  } catch (error) {
    console.error("Error logging out:", error);
  }
};

export const authenticate = async () => {
  return axios.get(`${import.meta.env.VITE_API_URL}/api/users/authenticate`, {
    withCredentials: true,
  });
};
