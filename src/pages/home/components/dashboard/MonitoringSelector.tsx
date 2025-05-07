import React, { useEffect } from "react";
import { Card, Col, Radio, RadioChangeEvent, Select, DatePicker } from "antd";
import { useMonitoringStore } from "@/store/monitoringStore";

const { Option } = Select;

interface MonitoringSelectorProps {
  selectedId?: number | null;
  onChange: (id: number | null) => void;
}

const MonitoringSelector: React.FC<MonitoringSelectorProps> = ({
  selectedId,
  onChange,
}) => {
  const { monitorings, fetchMonitorings } = useMonitoringStore();

  useEffect(() => {
    fetchMonitorings();
  }, []);

  const handleChange = (e: RadioChangeEvent) => {
    const selectedValue = e.target.value;
    onChange(selectedValue ?? null);
  };

  return (
    <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
      <Card title="Selecione o monitoramento:">
        <Radio.Group
          onChange={handleChange}
          value={selectedId ?? null}
          style={{ display: "flex", flexDirection: "column", gap: 8 }}
        >
          {monitorings.map((m) => (
            <Radio key={m.id} value={m.id}>
              {m.name}
            </Radio>
          ))}
        </Radio.Group>
      </Card>

      <Card title="Filtrar:">
        <DatePicker.RangePicker style={{ width: "100%" }} />
      </Card>

      <Card title="OP 15400">
        <p>Selecione a bandeira tarifária:</p>
        <Select defaultValue="Amarela" style={{ width: "100%" }}>
          <Option value="Amarela">Amarela</Option>
          <Option value="Verde">Verde</Option>
          <Option value="Vermelha">Vermelha</Option>
        </Select>
        <p>Produto: Lumen 3</p>
        <p>Quantidade: 100</p>
        <p>Valor estimado: R$ 0,50</p>
      </Card>
    </Col>
  );
};

export default MonitoringSelector;
