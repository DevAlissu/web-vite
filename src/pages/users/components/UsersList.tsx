// src/pages/users/components/UsersList.tsx
import React, { useEffect, useState } from "react";
import { Table, Input, Button, Avatar, Popconfirm, message, Tag } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useUsers } from "../hooks/useUsers";
import { useUserDetails } from "../../../hooks/useUserDetails";
import { useNavigate } from "react-router-dom";

const { Search } = Input;

const UsersList: React.FC = () => {
  const { users, fetchUsers, deleteUser } = useUsers();
  const { cache, load } = useUserDetails();
  const [filtered, setFiltered] = useState(users);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);
  useEffect(() => {
    setFiltered(users);
  }, [users]);

  const onSearch = (q: string) => {
    const low = q.toLowerCase();
    setFiltered(
      users.filter((u) =>
        [u.username, u.name || "", u.email, u.role].some((f) =>
          f.toLowerCase().includes(low)
        )
      )
    );
  };

  const handleDelete = async (id: number) => {
    await deleteUser(id);
    message.success("Usuário excluído!");
  };

  const columns = [
    {
      title: "Avatar",
      dataIndex: "avatar_url",
      key: "avatar",
      render: (url: string) => <Avatar src={url} />,
    },
    { title: "Username", dataIndex: "username", key: "username" },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (name: string, rec: any) => name || rec.username,
    },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Permissão", dataIndex: "role", key: "role" },

    {
      title: "Conquistas",
      key: "achievements",
      render: (_: any, rec: any) => {
        const d = cache[rec.id];
        if (d) return d.achievements.length;
        return <a onClick={() => load(rec.id)}>Carregar</a>;
      },
    },
    {
      title: "Recompensas",
      key: "rewards",
      render: (_: any, rec: any) => {
        const d = cache[rec.id];
        if (d) return d.rewards.length;
        return <a onClick={() => load(rec.id)}>Carregar</a>;
      },
    },

    {
      title: "Ações",
      key: "actions",
      render: (_: any, rec: any) => (
        <>
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/users/edit/${rec.id}`)}
            style={{ marginRight: 8 }}
          />
          <Popconfirm
            title="Confirma exclusão?"
            onConfirm={() => handleDelete(rec.id)}
          >
            <Button danger icon={<DeleteOutlined />} />
          </Popconfirm>
        </>
      ),
    },
  ];

  return (
    <>
      <Search
        placeholder="Buscar usuário..."
        onSearch={onSearch}
        enterButton
        style={{ marginBottom: 16, width: 300 }}
      />

      <Table
        dataSource={filtered}
        columns={columns}
        rowKey="id"
        pagination={{ pageSize: 5 }}
        expandable={{
          expandedRowRender: (rec) => {
            const d = cache[rec.id];
            if (!d) return <p>Carregando…</p>;
            return (
              <div style={{ padding: 16 }}>
                <h4>Conquistas</h4>
                {d.achievements.map((a) => (
                  <Tag key={a.id}>
                    {a.description} (+{a.nansen_coins} coins, +{a.quantity_xp}{" "}
                    XP)
                  </Tag>
                ))}
                <h4 style={{ marginTop: 16 }}>Recompensas</h4>
                {d.rewards.map((r) => (
                  <Tag key={r.id}>
                    {r.description} ({r.points} pts)
                  </Tag>
                ))}
              </div>
            );
          },
          onExpand: (_expanded, rec) => load(rec.id),
        }}
      />
    </>
  );
};

export default UsersList;
