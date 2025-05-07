import { Card } from "antd";
import React from "react";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: number | string;
}

const MetricCard: React.FC<MetricCardProps> = ({ icon, title, value }) => (
  <Card className="card_style">
    <div className="card_content_style">
      <div>
        {icon}
        <h1 className="card_content_title">{title}</h1>
      </div>
      <span className="card_conten_value">{value}</span>
    </div>
  </Card>
);

export default MetricCard;
