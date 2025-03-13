import { create } from "zustand";
import { getUsers, createUser } from "../services/UsersService";
import { UserItem, UserRegister } from "../types/users";

interface UsersStore {
  users: UserItem[];
  fetchUsers: () => Promise<void>;
  addUser: (data: UserRegister) => Promise<void>;
}

export const useUsersStore = create<UsersStore>((set) => ({
  users: [],

  fetchUsers: async () => {
    try {
      const users = await getUsers();
      set({ users });
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  },

  addUser: async (data) => {
    try {
      await createUser(data);
      const users = await getUsers(); // Atualiza a lista após cadastro
      set({ users });
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  },
}));