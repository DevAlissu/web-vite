import React, { useEffect, useState } from "react";
import { Form, Input, Select, Button, Card, message } from "antd";
import { useNavigate } from "react-router-dom";
import { useUsersStore } from "../../../store/users";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import { UserRegister } from "../../../types/users";

const { Option } = Select;

const UsersRegister: React.FC = () => {
  const [form] = Form.useForm<UserRegister>();
  const navigate = useNavigate();
  const { addUser } = useUsersStore();
  const [loading, setLoading] = useState(false);

  const onFinish = async (vals: UserRegister) => {
    setLoading(true);
    try {
      await addUser(vals);
      message.success("Usuário cadastrado!");
      navigate("/users");
    } catch {
      message.error("Erro ao cadastrar!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Cadastro de Usuário"
            subTitle="Preencha os dados"
          />
          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ role: "ADMIN" }}
            >
              <Form.Item
                name="username"
                label="Username"
                rules={[{ required: true, message: "Informe o username" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="name"
                label="Nome"
                rules={[{ required: true, message: "Informe o nome" }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="email"
                label="Email"
                rules={[
                  { required: true, message: "Informe o email" },
                  { type: "email", message: "Email inválido" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="password"
                label="Senha"
                rules={[{ required: true, message: "Informe a senha" }]}
              >
                <Input.Password />
              </Form.Item>
              <Form.Item
                name="role"
                label="Permissão"
                rules={[{ required: true, message: "Selecione a permissão" }]}
              >
                <Select>
                  <Option value="ADMIN">Admin</Option>
                  <Option value="LIDER">Líder</Option>
                  <Option value="GAME">Game</Option>
                </Select>
              </Form.Item>
              <Form.Item style={{ textAlign: "right" }}>
                <Button
                  onClick={() => navigate("/users")}
                  style={{ marginRight: 8 }}
                >
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Cadastrar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UsersRegister;
