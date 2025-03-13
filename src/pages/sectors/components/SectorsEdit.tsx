import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Input, Row, Col, message, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import ProductionLinesTransfer from "../../../components/productionLinesTransfer/ProductionLinesTransfer";
import { useSectorsStore } from "../../../store/sectors";
import { useProductionLinesStore } from "../../../store/ProductionLinesStore";
import { getSectorById, updateSector } from "../../../services/SectorsService";
import { updateProductionLine } from "../../../services/ProductionLinesService";
import { Sector } from "../../../types/sectors";

const SectorsEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchSectors } = useSectorsStore();
  const { productionLines, fetchProductionLines } = useProductionLinesStore();
  
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [selectedLines, setSelectedLines] = useState<number[]>([]);
  const [estimatedConsumption, setEstimatedConsumption] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (id) {
          const sectorData = await getSectorById(Number(id));
          form.setFieldsValue({
            name: sectorData.name,
            description: sectorData.description,
            estimated_consumption: sectorData.estimated_consumption,
          });

          const associatedLines = productionLines
            .filter((line) => line.setor === Number(id))
            .map((line) => line.id);

          setSelectedLines(associatedLines);
          setEstimatedConsumption(sectorData.estimated_consumption);
        }
      } catch (error) {
        message.error("Erro ao carregar os dados do setor!");
        console.error(error);
      }
    };

    fetchData();
    fetchProductionLines();
  }, [id]);

  useEffect(() => {
    const totalConsumption = selectedLines.reduce((sum, lineId) => {
      const line = productionLines.find((l) => l.id === lineId);
      return sum + (line?.value_mensuration_estimated ?? 0);
    }, 0);

    setEstimatedConsumption(totalConsumption);
    form.setFieldsValue({ estimated_consumption: totalConsumption });
  }, [selectedLines, productionLines, form]);

  const handleSubmit = async (values: Omit<Sector, "id" | "created_at">) => {
    try {
      setLoading(true);

      await updateSector(Number(id), {
        ...values,
        estimated_consumption: estimatedConsumption,
      });

      await Promise.all(
        selectedLines.map(async (lineId) => {
          const line = productionLines.find((l) => l.id === lineId);
          if (line) {
            await updateProductionLine(lineId, {
              ...line,
              setor: Number(id),
            });
          }
        })
      );

      message.success("Setor atualizado com sucesso!");

      await fetchSectors();
      await fetchProductionLines();
      navigate("/sectors");
    } catch (error) {
      console.error("Erro ao atualizar setor:", error);
      message.error("Erro ao atualizar setor!");
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
          <ItemHeaderCabecalho 
            title="Editar Setor"
            subTitle="Altere os dados do setor abaixo"
          />

          <Form form={form} layout="vertical" onFinish={handleSubmit}>
            <Row gutter={24}>
              <Col span={12}>
                <Form.Item
                  name="name"
                  label="Nome do Setor"
                  rules={[{ required: true, message: "Obrigatório" }]}
                >
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
              availableLines={productionLines}
              selectedKeys={selectedLines.map(String)}
              onChange={(keys) => setSelectedLines(keys.map(Number))}
            />

            <div className="button-group">
              <Button danger onClick={() => navigate("/sectors")}>
                Cancelar
              </Button>
              <Button type="primary" icon={<PlusOutlined />} htmlType="submit" loading={loading}>
                Atualizar
              </Button>
            </div>
          </Form>
        </main>
      </div>
    </div>
  );
};

export default SectorsEdit;