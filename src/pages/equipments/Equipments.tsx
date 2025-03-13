// src/pages/equipments/Equipments.tsx
import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useEquipamentsTable } from "./hooks/useEquipamentsTable";

const Equipments: React.FC = () => {
  const navigate = useNavigate();
  const { columns, equipaments, loading } = useEquipamentsTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho 
            title="Equipamentos" 
            subTitle="Lista de equipamentos já cadastrados" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/equipments/register")}
            >
              Cadastrar equipamento
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela utilizando o hook de Equipamentos */}
          <section className="table-container">
            <CustomTable columns={columns} data={equipaments} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Equipments;