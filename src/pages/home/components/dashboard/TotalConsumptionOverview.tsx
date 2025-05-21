// src/pages/home/components/dashboard/TotalConsumptionOverview.tsx
import React from "react";
import { Card, Spin } from "antd";
import MonitoringChart from "./MonitoringChart";

export interface TotalConsumptionOverviewProps {
  data: { name: string; value: number }[];
  stroke?: string;
  loading?: boolean;
}

const TotalConsumptionOverview: React.FC<TotalConsumptionOverviewProps> = ({
  data,
  stroke = "#ffc658",
  loading = false,
}) => {
  const title = "Visão Geral do Consumo Total (kW ao longo do tempo)";

  if (loading) {
    return (
      <Card
        size="small"
        title={title}
        bodyStyle={{ padding: 24, textAlign: "center" }}
      >
        <Spin />
      </Card>
    );
  }

  if (!data || data.length === 0) {
    return (
      <Card
        size="small"
        title={title}
        bodyStyle={{ padding: 16, textAlign: "center" }}
      >
        Sem dados disponíveis
      </Card>
    );
  }

  return <MonitoringChart title={title} data={data} stroke={stroke} />;
};

export default TotalConsumptionOverview;
