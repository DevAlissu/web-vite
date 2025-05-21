// src/pages/missions/Missions.tsx
import React, { useEffect } from "react";
import { Table, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMissionStore } from "../../store/missions";
import { useMonitoringStore } from "../../store/monitoringStore";
import { useMissionsTable } from "./hooks/useMissionsTable";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";

const Missions: React.FC = () => {
  const navigate = useNavigate();
  const { fetchMissions } = useMissionStore();
  const { fetchMonitorings } = useMonitoringStore();
  const { columns, missions, loading } = useMissionsTable();

  useEffect(() => {
    (async () => {
      await fetchMissions();
      await fetchMonitorings();
    })();
  }, [fetchMissions, fetchMonitorings]);

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Missões"
            subTitle="Lista de missões existentes"
          />

          <section className="actions-section" style={{ marginBottom: 16 }}>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/missions/register")}
            >
              Criar Missão
            </Button>
          </section>

          <section className="table-container">
            <Table
              columns={columns}
              dataSource={missions}
              loading={loading}
              rowKey="id"
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Missions;
