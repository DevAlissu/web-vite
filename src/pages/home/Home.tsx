// src/pages/home/HomePage.tsx
import React, { useEffect, useState } from "react";
import { Layout, Row, Col, Spin } from "antd";
import {
  DashboardOutlined,
  PartitionOutlined,
  HddOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import { useMonitoringStore } from "@/store/monitoringStore";

import DashboardMetrics from "./components/dashboard/DashboardMetrics";
import MonitoringSelector from "./components/dashboard/MonitoringSelector";
import EnergyTrendCard from "./components/dashboard/EnergyTrendCard";
import BarBySectionCard from "./components/dashboard/BarBySectionCard";
import EnvironmentalBreakdownCard from "./components/dashboard/EnvironmentalBreakdownCard";
import TotalConsumptionOverview from "./components/dashboard/TotalConsumptionOverview";

import { useDashboardMetrics } from "./hooks/useDashboardMetrics";
import { useEnergyTrend } from "./hooks/useEnergyTrend";
import { useSectionLoads } from "./hooks/useSectionLoads";
import { useEnvironmentalData } from "./hooks/useEnvironmentalData";
import { useTotalConsumption } from "./hooks/useTotalConsumption";

const { Content } = Layout;

const HomePage: React.FC = () => {
  // selector for Monitoramentos dropdown
  const [selectedMonitoringId, setSelectedMonitoringId] = useState<
    number | null
  >(null);
  const { monitorings, fetchMonitorings } = useMonitoringStore();

  // fetch monitorings once
  useEffect(() => {
    fetchMonitorings();
  }, [fetchMonitorings]);

  // top metrics hook
  const {
    activeMonitoringCount,
    totalSectionsCount,
    totalSectorsCount,
    totalDevicesCount,
  } = useDashboardMetrics();

  // data hooks
  const { data: trendData, loading: trendLoading } = useEnergyTrend(
    selectedMonitoringId ?? undefined
  );
  const { data: barData, loading: barLoading } = useSectionLoads(
    selectedMonitoringId ?? undefined
  );
  const { data: envData, loading: envLoading } = useEnvironmentalData(
    selectedMonitoringId ?? undefined
  );
  const { data: totalData, loading: totalLoading } = useTotalConsumption(
    selectedMonitoringId ?? undefined
  );

  // assemble metrics items
  const metricsItems = [
    {
      icon: <DashboardOutlined style={{ fontSize: 16, color: "#004281" }} />,
      title: "Monitoramentos Ativos",
      value: activeMonitoringCount,
    },
    {
      icon: <PartitionOutlined style={{ fontSize: 16, color: "#004281" }} />,
      title: "Seções Ativas",
      value: totalSectionsCount,
    },
    {
      icon: <HddOutlined style={{ fontSize: 16, color: "#004281" }} />,
      title: "Setores Monitorados",
      value: totalSectorsCount,
    },
    {
      icon: <NodeExpandOutlined style={{ fontSize: 16, color: "#004281" }} />,
      title: "Dispositivos Monitorados",
      value: totalDevicesCount,
    },
  ];

  const loadingAny = trendLoading || barLoading || envLoading || totalLoading;

  return (
    <Layout style={{ height: "100vh", overflow: "hidden" }}>
      <ItemSideBar />
      <Layout>
        <ItemHeader />
        <Content style={{ padding: 8, height: "100%" }}>
          {/* métricas + selector */}
          <Row gutter={8} wrap={false} align="middle">
            <Col flex="auto">
              <DashboardMetrics items={metricsItems} />
            </Col>
            <Col flex="0 0 240px">
              <MonitoringSelector
                value={selectedMonitoringId}
                onChange={setSelectedMonitoringId}
              />
            </Col>
          </Row>

          {loadingAny ? (
            <div style={{ textAlign: "center", marginTop: 50 }}>
              <Spin size="large" />
            </div>
          ) : (
            <>
              {/* 2×2 mini-gráficos */}
              <Row gutter={[8, 8]} style={{ marginTop: 12 }}>
                <Col span={12}>
                  <EnergyTrendCard
                    title={`Tendência de Energia — ${
                      selectedMonitoringId ?? "Geral"
                    }`}
                    data={trendData}
                  />
                </Col>
                <Col span={12}>
                  <EnergyTrendCard
                    title="Tendência de Energia — Geral"
                    data={trendData}
                    stroke="#82ca9d"
                  />
                </Col>
                <Col span={12}>
                  <BarBySectionCard title="Carga por Seção" data={barData} />
                </Col>
                <Col span={12}>
                  <EnvironmentalBreakdownCard
                    title="Distribuição Ambiental"
                    data={envData}
                    colors={["#0088FE", "#00C49F", "#FFBB28"]}
                  />
                </Col>
              </Row>

              {/* visão geral full-width */}
              <Row style={{ marginTop: 12 }}>
                <Col span={24}>
                  <TotalConsumptionOverview
                    data={totalData.map((d) => ({
                      name: `${d.time}m`,
                      value: d.value,
                    }))}
                  />
                </Col>
              </Row>
            </>
          )}
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
