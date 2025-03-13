import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";

import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import UsersList from "./components/UsersList";

const Users: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho
            title="Usuários"
            subTitle="Lista de usuários cadastrados"
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/users/register")}
            >
              Cadastrar Usuário
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela de usuários */}
          <section className="table-container">
            <UsersList />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Users;