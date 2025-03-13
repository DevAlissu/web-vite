import api from "./api";
import { UserItem, UserRegister } from "../types/users";

// 🔹 Obtém a lista de usuários
export const getUsers = async () => {
  const response = await api.get<UserItem[]>("/users/");
  return response.data;
};

// 🔹 Obtém um usuário específico pelo ID
export const getUserById = async (id: number) => {
  const response = await api.get<UserItem>(`/users/${id}/`);
  return response.data;
};

// 🔹 Cadastra um novo usuário (usa UserRegister pois inclui senha)
export const createUser = async (data: UserRegister) => {
  const response = await api.post("/register/", {
    username: data.username, 
    name: data.name,
    email: data.email,
    password: data.password, // 🔹 Agora password é permitido
    role: data.role,
  });
  return response.data;
};

// 🔹 Atualiza um usuário existente (usa UserItem pois NÃO inclui senha)
export const updateUser = async (id: number, data: UserItem) => {
  const response = await api.put(`/users/${id}/`, {
    username: data.username,
    name: data.name,
    email: data.email,
    role: data.role,
  });
  return response.data;
};

// 🔹 Exclui um usuário pelo ID
export const deleteUser = async (id: number) => {
  await api.delete(`/users/${id}/`);
};