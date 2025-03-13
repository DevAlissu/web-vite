import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Select, message, Row, Col } from "antd";
import { SaveOutlined } from "@ant-design/icons";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import api from "../../../services/api";
import "../../../styles/register.css";

const UsersEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    role: "",
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(`/users/${id}`);
        setUserData(response.data);
      } catch (error) {
        message.error("Erro ao buscar usuário.");
      }
    };
    fetchUser();
  }, [id]);

  const handleSubmit = async () => {
    if (!userData.name || !userData.role) {
      message.error("Preencha todos os campos obrigatórios!");
      return;
    }

    try {
      setLoading(true);
      await api.put(`/users/${id}`, userData);
      message.success("Usuário atualizado com sucesso!");
      navigate("/users");
    } catch (error) {
      message.error("Erro ao atualizar usuário.");
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
          <header className="register-header">
            <h1 className="title">Editar Usuário</h1>
            <p className="subtitle">Formulário para edição de usuários</p>
          </header>

          <div className="form-container">
            <Row gutter={24}>
              <Col span={12}>
                <label>Nome <span style={{ color: "red" }}>*</span></label>
                <Input
                  placeholder="Digite o nome"
                  value={userData.name}
                  onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
              </Col>
              <Col span={12}>
                <label>Email</label>
                <Input value={userData.email} disabled />
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <label>Permissão <span style={{ color: "red" }}>*</span></label>
                <Select
                  placeholder="Selecione a permissão"
                  value={userData.role}
                  onChange={(value) => setUserData({ ...userData, role: value })}
                  style={{ width: "100%" }}
                >
                  <Select.Option value="ADMIN">Admin</Select.Option>
                  <Select.Option value="GAME">Game</Select.Option>
                </Select>
              </Col>
            </Row>

            <div className="button-group">
              <Button danger type="primary" onClick={() => navigate("/users")}>
                Cancelar
              </Button>
              <Button
                type="primary"
                icon={<SaveOutlined />}
                onClick={handleSubmit}
                loading={loading}
              >
                Atualizar Usuário
              </Button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default UsersEdit;