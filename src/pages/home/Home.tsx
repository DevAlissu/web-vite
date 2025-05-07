import React, { useEffect, useMemo, useState } from "react";
import { Layout, Row, Col, Divider } from "antd";
import {
  DashboardOutlined,
  PartitionOutlined,
  HddOutlined,
  NodeExpandOutlined,
} from "@ant-design/icons";

import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import { useMonitoringStore } from "../../store/monitoringStore";
import { useMonitoringSections } from "./hooks/useMonitoringSections";
import MonitoringChart from "./components/dashboard/MonitoringChart";
import MonitoringSelector from "./components/dashboard/MonitoringSelector";
import MetricCard from "./components/dashboard/MetricCard";

import api from "@/services/api";

import "../../styles/custom/custom.css";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [selectedMonitoringId, setSelectedMonitoringId] = useState<
    number | null
  >(null);
  const [countMonitoring, setCountMonitoring] = useState(0);

  const { fetchCountMonitorings } = useMonitoringStore();
  const { monitoringSections } = useMonitoringSections(
    selectedMonitoringId || undefined
  );

  const iotSections = useMemo(
    () => monitoringSections.filter((s) => s.DeviceIot),
    [monitoringSections]
  );

  const [energyMap, setEnergyMap] = useState<
    Record<number, { name: string; value: number }[]>
  >({});

  useEffect(() => {
    fetchCountMonitorings().then((res) => setCountMonitoring(res));
  }, []);

  useEffect(() => {
    const fetchEnergy = async () => {
      const map: Record<number, { name: string; value: number }[]> = {};

      for (const section of iotSections) {
        try {
          const response = await api.get(
            `/section-measurements/?section_id=${section.id}`
          );
          map[section.id] = response.data.map((d: any) => ({
            name: `${d.interval}s`,
            value: d.energia_ativa_kWh,
          }));
        } catch (error) {
          console.error(`Erro ao buscar dados da seção ${section.id}:`, error);
        }
      }

      setEnergyMap(map);
    };

    if (selectedMonitoringId) {
      fetchEnergy();
    }
  }, [selectedMonitoringId, iotSections]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ItemSideBar />
      <Layout style={{ border: "none" }}>
        <ItemHeader />
        <Content style={{ padding: "20px" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <MetricCard
                icon={
                  <DashboardOutlined
                    style={{ color: "#004281", fontSize: 24 }}
                  />
                }
                title="Monitoramentos Ativos"
                value={countMonitoring}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <MetricCard
                icon={
                  <PartitionOutlined
                    style={{ color: "#004281", fontSize: 24 }}
                  />
                }
                title="Seções Ativas"
                value={10}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <MetricCard
                icon={
                  <HddOutlined style={{ color: "#004281", fontSize: 24 }} />
                }
                title="Setores Monitorados"
                value={100}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <MetricCard
                icon={
                  <NodeExpandOutlined
                    style={{ color: "#004281", fontSize: 24 }}
                  />
                }
                title="Equipamentos Monitorados"
                value={100}
              />
            </Col>
          </Row>

          <Divider
            style={{
              height: "3px",
              backgroundColor: "#004281",
              margin: "20px 0",
              border: "none",
            }}
          />

          <Row gutter={[16, 16]}>
            <MonitoringSelector
              selectedId={selectedMonitoringId}
              onChange={setSelectedMonitoringId}
            />

            {iotSections.map((section) => (
              <Col span={9} key={section.id}>
                <MonitoringChart
                  title={section.name}
                  data={energyMap[section.id] || []}
                />
              </Col>
            ))}
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;
