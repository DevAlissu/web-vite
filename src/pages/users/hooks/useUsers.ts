import { useUsersStore } from "../../../store/users";

export const useUsers = () => {
  const { users, fetchUsers, addUser, updateUser, deleteUser } =
    useUsersStore();
  return { users, fetchUsers, addUser, updateUser, deleteUser };
};
