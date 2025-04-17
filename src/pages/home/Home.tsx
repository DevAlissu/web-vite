import React, { useState } from "react";
import { Layout, Select, DatePicker, Checkbox, Row, Col, Card, Divider } from "antd";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";

import '../../styles/custom/custom.css';
import { DashboardOutlined, HddOutlined, HomeOutlined, NodeExpandOutlined, PartitionOutlined, ProductOutlined } from "@ant-design/icons";



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

      <Layout style={{border:"none"}}>
        <ItemHeader />

        <Content style={{ padding: "20px" }}>


          <Row gutter={[16, 16]} style={{ marginBottom: "5px" }}>
            {/* Cada Col terá span={24} (full width) em telas pequenas (xs) e span={6} em telas médias/grandes (md) */}
            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card className="card_style">
                <div className="card_content_style">
                  <div>

                    <DashboardOutlined style={{ color: "rgb(0, 66, 129)", fontSize: "24px" }} />
                    <h1 className="card_content_title">Monitoramentos Em Andamento</h1>
                  </div>
                  <span className="card_conten_value">5</span>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card className="card_style">
                <div className="card_content_style">
                  <div>
                    <PartitionOutlined style={{ color: "rgb(0, 66, 129)", fontSize: "24px" }} />
                    <h1 className="card_content_title">Seções Ativas</h1>
                  </div>
                  <span className="card_conten_value">10</span>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card className="card_style">
                <div className="card_content_style">
                  <div>
                    <HddOutlined style={{ color: "rgb(0, 66, 129)", fontSize: "24px" }} />

                    <h1 className="card_content_title">Setores Monitorados</h1>
                  </div>
                  <span className="card_conten_value">100</span>
                </div>
              </Card>
            </Col>

            <Col xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card className="card_style">
                <div className="card_content_style">
                  <div>
                    <NodeExpandOutlined style={{ color: "rgb(0, 66, 129)", fontSize: "24px" }} />
                    <h1 className="card_content_title">Equipamentos Monitorados</h1>
                  </div>
                  <span className="card_conten_value">100</span>
                </div>
              </Card>
            </Col>
          </Row>

          <Row gutter={[16, 16]}>
            <Col span={24}>
              <Divider
                style={{
                  height: "3px",
                  backgroundColor: "rgb(0, 66, 129)", // Azul do Ant Design
                  margin: "20px 0",
                  border: "none" // Remove a borda padrão (se necessário)
                }}
              />
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginBottom: "5px" }}>
            <Col span={6} xs={24} sm={12} md={6} lg={6} xl={6}>
              <Card title="Selecione o monitoramento:" style={{ marginBottom: "5px" }}>
                <Checkbox.Group onChange={handleMonitoramentoChange}>
                  <Row>
                    <Col span={24}><Checkbox value="Monitoramento 1">Monitoramento 1</Checkbox></Col>
                    <Col span={24}><Checkbox value="Linha 3 PTH">Linha 3 PTH</Checkbox></Col>
                    <Col span={24}><Checkbox value="OP 15400">OP 15400</Checkbox></Col>
                    <Col span={24}><Checkbox value="Monitoramento 2">Monitoramento 2</Checkbox></Col>
                  </Row>
                </Checkbox.Group>
              </Card>

              <Card title="Filtrar:" style={{ marginBottom: '5px' }}>
                <DatePicker.RangePicker style={{ width: "100%" }} />
              </Card>

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

            <Col span={9} xs={24} sm={12} md={9} lg={9} xl={9}>
              <Card title="SMD - Linha 02" style={{ marginBottom: "20px" }}>
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

            <Col span={9} xs={24} sm={12} md={9} lg={9} xl={9}>
              <Card title="SMD - Linha 02" style={{ marginBottom: "20px" }}>
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