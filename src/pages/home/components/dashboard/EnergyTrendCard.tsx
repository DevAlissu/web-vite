// src/pages/home/components/dashboard/EnergyTrendCard.tsx
import React from "react";
import { Card, Spin } from "antd";
import {
  ResponsiveContainer,
  AreaChart,
  XAxis,
  YAxis,
  Tooltip,
  Area,
} from "recharts";

export interface EnergyTrendCardProps {
  title: string;
  data: { time: number; kW: number }[];
  stroke?: string;
  loading?: boolean;
}

const EnergyTrendCard: React.FC<EnergyTrendCardProps> = ({
  title,
  data,
  stroke = "#8884d8",
  loading = false,
}) => {
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

  const fillColor = `${stroke}aa`;

  return (
    <Card size="small" title={title} bodyStyle={{ padding: 4 }}>
      <ResponsiveContainer width="100%" height={100}>
        <AreaChart data={data}>
          <XAxis
            dataKey="time"
            tickFormatter={(t) => `${t}m`}
            tick={{ fontSize: 10 }}
          />
          <YAxis unit="kW" tick={{ fontSize: 10 }} />
          <Tooltip formatter={(value: number) => `${value} kW`} />
          <Area type="monotone" dataKey="kW" stroke={stroke} fill={fillColor} />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EnergyTrendCard;
