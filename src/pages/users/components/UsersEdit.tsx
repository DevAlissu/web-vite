import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Select,
  Switch,
  Button,
  Card,
  Row,
  Col,
  message,
} from "antd";
import { useNavigate, useParams } from "react-router-dom";
import dayjs, { Dayjs } from "dayjs";
import { useUsersStore } from "../../../store/users";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";

const { Option } = Select;

const UsersEdit: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { users, fetchUsers, updateUser } = useUsersStore();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    const uid = Number(id);
    const u = users.find((x) => x.id === uid);
    if (u) {
      form.setFieldsValue({
        username: u.username,
        name: u.name,
        email: u.email,
        role: u.role,
      });
    }
  }, [users]);

  const onFinish = async (vals: any) => {
    setLoading(true);
    try {
      await updateUser(Number(id), {
        name: vals.name,
        role: vals.role,
      });
      message.success("Usuário atualizado!");
      navigate("/users");
    } catch {
      message.error("Erro ao atualizar!");
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
            title="Editar Usuário"
            subTitle="Atualize os dados"
          />
          <Card>
            <Form form={form} layout="vertical" onFinish={onFinish}>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Username" name="username">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true, message: "Informe o nome" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item label="Email" name="email">
                    <Input disabled />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="role"
                    label="Permissão"
                    rules={[
                      { required: true, message: "Selecione a permissão" },
                    ]}
                  >
                    <Select>
                      <Option value="ADMIN">Admin</Option>
                      <Option value="LIDER">Líder</Option>
                      <Option value="GAME">Game</Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
                <Button
                  onClick={() => navigate("/users")}
                  style={{ marginRight: 8 }}
                >
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default UsersEdit;
