// src/pages/home/components/dashboard/BarBySectionCard.tsx
import React from "react";
import { Card, Spin } from "antd";
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export interface BarBySectionCardProps {
  title: string;
  data: { section: string; load: number }[];
  loading?: boolean;
}

const BarBySectionCard: React.FC<BarBySectionCardProps> = ({
  title,
  data,
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

  return (
    <Card size="small" title={title} bodyStyle={{ padding: 4 }}>
      <ResponsiveContainer width="100%" height={100}>
        <BarChart data={data}>
          <XAxis dataKey="section" tick={{ fontSize: 10 }} />
          <YAxis hide unit="%" />
          <Tooltip formatter={(value: number) => `${value}%`} />
          <Bar dataKey="load" barSize={12} fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default BarBySectionCard;
