// src/pages/home/components/dashboard/MonitoringSelector.tsx
import React, { useEffect } from "react";
import { Card, Select } from "antd";
import { useMonitoringStore } from "@/store/monitoringStore";
import { MonitoringItem } from "@/types/monitoringTypes";

const { Option } = Select;

export interface MonitoringSelectorProps {
  value?: number | null;
  onChange: (value: number | null) => void;
}

const MonitoringSelector: React.FC<MonitoringSelectorProps> = ({
  value,
  onChange,
}) => {
  const { monitorings, fetchMonitorings } = useMonitoringStore();

  useEffect(() => {
    fetchMonitorings();
  }, []);

  return (
    <Card
      size="small"
      title="Selecionar Monitoramento"
      bodyStyle={{ padding: 4 }}
    >
      <Select
        value={value ?? undefined}
        onChange={(v: number) => onChange(v)}
        placeholder="Selecione o monitoramento"
        style={{ width: "100%" }}
        size="small"
      >
        {monitorings.map((m: MonitoringItem) => (
          <Option key={m.id} value={m.id}>
            {m.name}
          </Option>
        ))}
      </Select>
    </Card>
  );
};

export default MonitoringSelector;
