import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Input, Row, Col, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ProductionLinesTransfer from "../../../components/productionLinesTransfer/ProductionLinesTransfer";
import { useSectorsStore } from "../../../store/sectors";
import { useProductionLinesStore } from "../../../store/ProductionLinesStore";
import { Sector } from "../../../types/sectors";
import { updateProductionLine } from "../../../services/ProductionLinesService";

const SectorsRegister: React.FC = () => {
  const navigate = useNavigate();
  const { createSector } = useSectorsStore();
  const { productionLines, fetchProductionLines } = useProductionLinesStore();

  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [estimatedConsumption, setEstimatedConsumption] = useState<number>(0);

  useEffect(() => {
    fetchProductionLines();
  }, []);

  useEffect(() => {
    const totalConsumption = selectedLines.reduce((sum, lineId) => {
      const numericId = Number(lineId);
      const line = productionLines.find((l) => l.id === numericId);
      return sum + (line?.value_mensuration_estimated ?? 0);
    }, 0);

    setEstimatedConsumption(totalConsumption);
    form.setFieldsValue({ estimated_consumption: totalConsumption });
  }, [selectedLines, productionLines, form]);

  const handleSubmit = async (values: Omit<Sector, "id" | "created_at">) => {
    try {
      setLoading(true);

      const newSector = await createSector({
        ...values,
        estimated_consumption: estimatedConsumption,
      });

      if (!newSector) throw new Error("Erro ao criar setor.");

      await Promise.all(
        selectedLines.map(async (lineId) => {
          const line = productionLines.find((l) => l.id === lineId);
          if (line) {
            await updateProductionLine(lineId, {
              ...line,
              setor: newSector.id,
            });
          }
        })
      );

      message.success("Setor cadastrado com sucesso!");
      await fetchProductionLines();
      navigate("/sectors");
    } catch (error) {
      console.error("Erro ao cadastrar setor:", error);
      message.error("Erro ao cadastrar setor!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <h1 className="title">Cadastro de Setor</h1>
          <p className="subtitle">Preencha os campos abaixo para cadastrar um setor</p>

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="name" label="Nome do Setor" rules={[{ required: true, message: "Obrigatório" }]}>
                  <Input placeholder="Digite nome do setor" />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item name="description" label="Descrição">
                  <Input.TextArea placeholder="Digite a descrição do setor" />
                </Form.Item>
              </Col>
            </Row>

            <Row gutter={24}>
              <Col span={12}>
                <Form.Item name="estimated_consumption" label="Consumo Estimado (kWh)">
                  <Input value={estimatedConsumption} disabled />
                </Form.Item>
              </Col>
            </Row>

            <h3>Linhas de Produção</h3>
            <ProductionLinesTransfer
              availableLines={productionLines.filter((line) => !line.setor)}
              selectedKeys={selectedLines.map(String)}
              onChange={(keys) => setSelectedLines(keys.map(Number))}
            />

            {/* ✅ Adicionando espaçamento entre os botões e o transfer */}
            <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
              <Button danger onClick={() => navigate("/sectors")}>
                Cancelar
              </Button>
              <Button type="primary" icon={<PlusOutlined />} htmlType="submit" loading={loading}>
                Enviar
              </Button>
            </div>
          </Form>
        </main>
      </div>
    </div>
  );
};

export default SectorsRegister;