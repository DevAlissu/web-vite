// src/pages/home/components/dashboard/DashboardMetrics.tsx
import React from "react";
import { Row, Col } from "antd";
import MetricCard, { MetricCardProps } from "./MetricCard";

export interface DashboardMetricsProps {
  items: MetricCardProps[];
}

const DashboardMetrics: React.FC<DashboardMetricsProps> = ({ items }) => (
  <Row gutter={8} wrap={false} align="middle">
    {items.map((item, idx) => (
      <Col flex="1 1 0" key={idx}>
        <MetricCard icon={item.icon} title={item.title} value={item.value} />
      </Col>
    ))}
  </Row>
);

export default DashboardMetrics;
