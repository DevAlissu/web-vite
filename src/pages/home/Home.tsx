import React, { useState } from "react";
import { Layout, Select, DatePicker, Checkbox, Row, Col, Card } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";

const { Content } = Layout;
const { Option } = Select;

const mockData = [
  { name: "10h", value: 6 },
  { name: "11h", value: 7 },
  { name: "12h", value: 9 },
  { name: "13h", value: 7 },
  { name: "14h", value: 8 },
];

const HomePage: React.FC = () => {
  const [selectedMonitoramento, setSelectedMonitoramento] = useState<string[]>([]);

  const handleMonitoramentoChange = (checkedValues: any) => {
    setSelectedMonitoramento(checkedValues);
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <ItemSideBar />
      <Layout>
        <ItemHeader />
        <Content style={{ padding: "20px" }}>
          <Row gutter={16} style={{ marginBottom: "20px" }}>
            <Col span={8}>
              <Card title="Selecione o monitoramento:">
                <Checkbox.Group onChange={handleMonitoramentoChange}>
                  <Row>
                    <Col span={24}><Checkbox value="Monitoramento 1">Monitoramento 1</Checkbox></Col>
                    <Col span={24}><Checkbox value="Linha 3 PTH">Linha 3 PTH</Checkbox></Col>
                    <Col span={24}><Checkbox value="OP 15400">OP 15400</Checkbox></Col>
                    <Col span={24}><Checkbox value="Monitoramento 2">Monitoramento 2</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </Card>
            </Col>
            <Col span={8}>
              <Card title="Filtrar:">
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Card>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={8}>
              <Card title="OP 15400" style={{ marginBottom: "20px" }}>
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

            <Col span={8}>
              <Card title="SMD - Linha 02">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#8884d8" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>

            <Col span={8}>
              <Card title="PTH - Linha 01">
                <ResponsiveContainer width="100%" height={200}>
                  <LineChart data={mockData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="value" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default HomePage;