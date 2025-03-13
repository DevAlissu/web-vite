import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import Button from "../../../components/Button/Button";
import MonitoringDetails from "./MonitoringDetails";
import { useMonitoringById } from "../hooks/useMonitoringById";
import SectionList from "./SectionList"; 

const MonitoringConfigure: React.FC = () => {
  const { monitoring, loading } = useMonitoringById();
  const navigate = useNavigate();

  if (loading) return <p>Carregando...</p>;
  if (!monitoring) return <p>Monitoramento não encontrado.</p>;

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Configurar Monitoramento de Energia"
            subTitle="Monitoramento de Energia"
          />

          {/* Informações do Monitoramento */}
          <MonitoringDetails monitoring={monitoring} />

          {/* Botão Adicionar Seção */}
          <section className="actions-section">
            <Button
              type="primary"
              className="add-section-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate(`/monitoring/add-section/${monitoring.id}`)}
            >
              Adicionar Seção
            </Button>
          </section>

          {/* Lista de Seções */}
          <section className="table-container">
            <p>Lista de Consumo (Seções associadas)</p>
            <SectionList /> {/* Adiciona o componente da lista de seções */}
          </section>
        </main>
      </div>
    </div>
  );
};

export default MonitoringConfigure;