import axios from "axios";

//export const BASE_URL = `http://localhost:10000/api/`;
export const BASE_URL = `http://200.129.168.197:20163/api`;

const api = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Adicionar token automaticamente se existir
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("userToken"); // Use a chave correta onde o token é armazenado
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para lidar com erro 401 (não autorizado), e tentar renovar o token
api.interceptors.response.use(
  (response) => response, // Se a resposta for bem-sucedida, apenas retorna
  async (error) => {
    if (error.response?.status === 401) {
      // Se o erro for 401 (não autorizado)
      const refreshToken = localStorage.getItem("refreshToken"); // Pega o refresh_token
      if (refreshToken) {
        try {
          // Tente renovar o token
          const response = await axios.post(`${BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
          });
          const newAccessToken = response.data.access;

          // Atualize o localStorage com o novo token
          localStorage.setItem("userToken", newAccessToken);

          // Atualize a requisição original com o novo token
          error.config.headers["Authorization"] = `Bearer ${newAccessToken}`;

          // Repita a requisição original
          return axios(error.config);
        } catch (refreshError) {
          console.error("Erro ao renovar o token:", refreshError);
          localStorage.removeItem("userToken");
          localStorage.removeItem("refreshToken");
          window.location.href = "/login"; // Redireciona para login se não conseguir renovar
        }
      } else {
        localStorage.removeItem("userToken");
        localStorage.removeItem("refreshToken");
        window.location.href = "/login"; // Redireciona para login se não houver refresh token
      }
    }
    return Promise.reject(error);
  }
);

export default api;
