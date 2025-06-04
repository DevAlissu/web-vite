// src/pages/monitoring-sensor/components/MonitoringConfigure.tsx
import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import Button from "../../../components/Button/Button";
import MonitoringDetails from "./MonitoringDetails";
import { useSensorById } from "../hooks/useSensorById";
import SectionListSensor from "./SectionListSensor"; // IMPORT CORRETO

const MonitoringConfigure: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { monitoring, loading } = useSensorById();

  if (loading) return <p>Carregando...</p>;
  if (!monitoring) return <p>Monitoramento não encontrado.</p>;

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Configurar Monitoramento de Ambiente"
            subTitle="Monitoramento de Ambiente"
          />

          {/* 1) Detalhes básicos do monitoramento */}
          <MonitoringDetails monitoring={monitoring} />

          {/* 2) Botão “Adicionar Seção” */}
          <section className="actions-section">
            <Button
              type="primary"
              className="add-section-btn"
              icon={<PlusOutlined />}
              onClick={() =>
                navigate(`/sensor-monitoring/add-section/${monitoring.id}`)
              }
            >
              Adicionar Seção
            </Button>
          </section>

          {/* 3) Lista de Seções associadas a este monitoramento */}
          <section className="table-container" style={{ marginTop: 24 }}>
            <p style={{ fontWeight: "bold", marginBottom: 8 }}>
              Lista de Consumo (Seções associadas)
            </p>
            <SectionListSensor monitoringId={monitoring.id} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MonitoringConfigure;
