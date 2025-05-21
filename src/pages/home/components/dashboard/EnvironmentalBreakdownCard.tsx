// src/pages/home/components/dashboard/EnvironmentalBreakdownCard.tsx
import React from "react";
import { Card, Spin } from "antd";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

export interface EnvironmentalBreakdownCardProps {
  title: string;
  data: { name: string; value: number }[];
  colors: string[];
  loading?: boolean;
}

const EnvironmentalBreakdownCard: React.FC<EnvironmentalBreakdownCardProps> = ({
  title,
  data,
  colors,
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
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={15}
            outerRadius={40}
            label={false}
          >
            {data.map((_, idx) => (
              <Cell key={idx} fill={colors[idx % colors.length]} />
            ))}
          </Pie>
          <Tooltip formatter={(value: number) => `${value}`} />
        </PieChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default EnvironmentalBreakdownCard;
