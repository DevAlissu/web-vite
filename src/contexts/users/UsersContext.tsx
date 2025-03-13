import React, { createContext, useContext, useEffect, useState } from "react";
import { getUsers, deleteUser, createUser, updateUser } from "../../services/UsersService";
import { UserItem, UserRegister } from "../../types/users";

interface UsersContextProps {
  users: UserItem[];
  fetchUsers: () => void;
  addUser: (data: UserRegister) => Promise<void>;
  editUser: (id: number, data: UserItem) => Promise<void>;
  removeUser: (id: number) => void;
}

const UsersContext = createContext<UsersContextProps | undefined>(undefined);

export const UsersProvider = ({ children }: { children: React.ReactNode }) => {
  const [users, setUsers] = useState<UserItem[]>([]);

  // 🔹 Busca os usuários na API e atualiza o estado
  const fetchUsers = async () => {
    try {
      const data = await getUsers();
      setUsers(data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  // 🔹 Adiciona um novo usuário e atualiza a lista
  const addUser = async (data: UserRegister) => {
    try {
      await createUser(data);
      await fetchUsers(); // 🔹 Atualiza a lista de usuários imediatamente
    } catch (error) {
      console.error("Erro ao adicionar usuário:", error);
    }
  };

  // 🔹 Edita um usuário existente e atualiza a lista
  const editUser = async (id: number, data: UserItem) => {
    try {
      await updateUser(id, data);
      await fetchUsers(); // 🔹 Atualiza a lista de usuários imediatamente
    } catch (error) {
      console.error("Erro ao editar usuário:", error);
    }
  };

  // 🔹 Remove um usuário e atualiza a lista
  const removeUser = async (id: number) => {
    try {
      await deleteUser(id);
      await fetchUsers(); // 🔹 Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao excluir usuário:", error);
    }
  };

  // 🔹 Carrega os usuários ao iniciar o contexto
  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, fetchUsers, addUser, editUser, removeUser }}>
      {children}
    </UsersContext.Provider>
  );
};

// 🔹 Hook para facilitar o uso do contexto
export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error("useUsers deve ser usado dentro de um UsersProvider");
  }
  return context;
};