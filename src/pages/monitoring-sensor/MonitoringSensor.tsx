// src/pages/monitoring-sensor/MonitoringSensor.tsx

import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useSensorTable } from "./hooks/useSensorTable";

const MonitoringSensorPage: React.FC = () => {
  const navigate = useNavigate();
  const { columns, monitorings, loading } = useSensorTable();

  return (
    <div className="layout-container">
      <ItemSideBar />

      <div className="content-container">
        <ItemHeader />

        <main className="content">
          <ItemHeaderCabecalho
            title="NANSENsor"
            subTitle="Lista de monitoramentos do tipo NANSENsor"
          />

          <section className="actions-section">
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/sensor-monitoring/register")}
            >
              Novo Monitoramento Sensor
            </Button>
            <Button type="link" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          <section className="table-container">
            <CustomTable
              columns={columns}
              data={monitorings}
              loading={loading}
            />
          </section>
        </main>
      </div>
    </div>
  );
};

export default MonitoringSensorPage;
