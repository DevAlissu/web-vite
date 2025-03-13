import { useUsersStore } from "../../../store/users";

export const useUsers = () => {
  const { users, fetchUsers, addUser } = useUsersStore();

  return {
    users,
    fetchUsers,
    addUser,
  };
};