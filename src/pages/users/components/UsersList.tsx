import React, { useEffect, useState } from "react";
import { Table, Input } from "antd";
import { useUsers } from "../hooks/useUsers";

const UsersList: React.FC = () => {
  const { users, fetchUsers } = useUsers();
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    const filtered = users.filter((user) =>
      user.name.toLowerCase().includes(searchText.toLowerCase()) ||
      user.email.toLowerCase().includes(searchText.toLowerCase()) ||
      user.role.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchText, users]);

  const columns = [
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Permissão", dataIndex: "role", key: "role" },
  ];

  return (
    <div className="table-wrapper">
      <Input
        placeholder="Buscar usuário..."
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        className="search-input"
      />
      <Table 
        dataSource={filteredUsers} 
        columns={columns} 
        rowKey="id" 
        pagination={{ pageSize: 5 }} 
      />
    </div>
  );
};

export default UsersList;