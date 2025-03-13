import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useMonitoringTable } from "./hooks/useMonitoringTable";

const Monitoring: React.FC = () => {
  const navigate = useNavigate();
  const { columns, monitorings, loading } = useMonitoringTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho 
            title="Monitoramento de Energia" 
            subTitle="Lista de Monitoramento de Energia já cadastrados" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/monitoring/register")}
            >
              Cadastrar Monitoramento
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela de monitoramentos */}
          <section className="table-container">
            <CustomTable columns={columns} data={monitorings} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Monitoring;
