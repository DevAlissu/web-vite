// src/pages/home/components/mission/MissionEdit.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Input,
  InputNumber,
  Select,
  DatePicker,
  Switch,
  Button,
  Row,
  Col,
  Card,
  message,
} from "antd";
import dayjs, { Dayjs } from "dayjs";
import { useMissionStore } from "../../../store/missions";
import { useMonitoringStore } from "../../../store/monitoringStore";
import { useProductsStore } from "../../../store/products";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";

const { Option } = Select;

const MissionEdit: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { missions, fetchMissions, updateMission } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const { products, fetchProducts } = useProductsStore();
  const [loading, setLoading] = useState(false);

  // carrega dados
  useEffect(() => {
    fetchMissions();
    fetchMonitorings();
    fetchProducts();
  }, []);

  // preenche o formulário quando missions estiver disponível
  useEffect(() => {
    const mid = Number(id);
    const mission = missions.find((m) => m.id === mid);
    if (mission) {
      form.setFieldsValue({
        name: mission.name,
        description: mission.description,
        energy_meta: mission.energy_meta,
        nansen_coins: mission.nansen_coins,
        quantity_xp: mission.quantity_xp,
        status: mission.status,
        date_start: mission.date_start ? dayjs(mission.date_start) : null,
        date_end: mission.date_end ? dayjs(mission.date_end) : null,
        monitoring: mission.monitoring ?? undefined,
        is_order_production: mission.is_order_production,
        product: mission.product ?? undefined,
        order_production: mission.order_production,
        quantity_product: mission.quantity_product,
      });
    }
  }, [missions, form, id]);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await updateMission(Number(id), {
        name: values.name,
        description: values.description,
        energy_meta: Number(values.energy_meta),
        nansen_coins: Number(values.nansen_coins),
        quantity_xp: Number(values.quantity_xp),
        status: values.status,
        date_start: values.date_start
          ? (values.date_start as Dayjs).toISOString()
          : null,
        date_end: values.date_end
          ? (values.date_end as Dayjs).toISOString()
          : null,
        is_order_production: values.is_order_production,
        product: values.is_order_production ? values.product : null,
        order_production: values.is_order_production
          ? Number(values.order_production)
          : 0,
        quantity_product: values.is_order_production
          ? Number(values.quantity_product)
          : 0,
        monitoring: values.monitoring ?? null,
      });
      message.success("Missão atualizada com sucesso!");
      navigate("/missions");
    } catch (err) {
      console.error(err);
      message.error("Erro ao atualizar missão.");
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
            title="Editar Missão"
            subTitle="Atualize os campos necessários"
          />

          <Card>
            <Form
              form={form}
              layout="vertical"
              onFinish={onFinish}
              initialValues={{ status: "Pendente", is_order_production: false }}
            >
              {/* Nome e Descrição */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="name"
                    label="Nome"
                    rules={[{ required: true, message: "Informe o nome" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    name="description"
                    label="Descrição"
                    rules={[{ required: true, message: "Informe a descrição" }]}
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Col>
              </Row>

              {/* Valores numéricos */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="energy_meta"
                    label="Meta de Energia"
                    rules={[
                      { required: true, message: "Informe a meta de energia" },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="nansen_coins"
                    label="Nansen Coins"
                    rules={[
                      { required: true, message: "Informe os Nansen Coins" },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    name="quantity_xp"
                    label="Quantidade XP"
                    rules={[
                      { required: true, message: "Informe a quantidade XP" },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
              </Row>

              {/* Status e Datas */}
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    name="status"
                    label="Status"
                    rules={[{ required: true, message: "Selecione o status" }]}
                  >
                    <Select>
                      <Option value="Pendente">Pendente</Option>
                      <Option value="Em Andamento">Em andamento</Option>
                      <Option value="Finalizada">Finalizada</Option>
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="date_start" label="Data de Início">
                    <DatePicker style={{ width: "100%" }} showTime />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item name="date_end" label="Data de Fim">
                    <DatePicker style={{ width: "100%" }} showTime />
                  </Form.Item>
                </Col>
              </Row>

              {/* Monitoramento */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item name="monitoring" label="Monitoramento">
                    <Select allowClear placeholder="Selecione">
                      {monitorings.map((m) => (
                        <Option key={m.id} value={m.id}>
                          {m.name}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              {/* É Ordem de Produção? */}
              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    name="is_order_production"
                    label="É Ordem de Produção?"
                    valuePropName="checked"
                  >
                    <Switch />
                  </Form.Item>
                </Col>
              </Row>

              {/* Campos extras OP */}
              <Form.Item noStyle shouldUpdate>
                {() =>
                  form.getFieldValue("is_order_production") && (
                    <Row gutter={16}>
                      <Col span={8}>
                        <Form.Item
                          name="product"
                          label="Produto"
                          rules={[
                            { required: true, message: "Selecione o produto" },
                          ]}
                        >
                          <Select allowClear placeholder="Selecione">
                            {products.map((p) => (
                              <Option key={p.id} value={p.id}>
                                {p.name}
                              </Option>
                            ))}
                          </Select>
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="order_production"
                          label="Nº da Ordem"
                          rules={[
                            {
                              required: true,
                              message: "Informe o nº da ordem",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </Col>
                      <Col span={8}>
                        <Form.Item
                          name="quantity_product"
                          label="Quantidade"
                          rules={[
                            {
                              required: true,
                              message: "Informe a quantidade",
                            },
                          ]}
                        >
                          <InputNumber style={{ width: "100%" }} />
                        </Form.Item>
                      </Col>
                    </Row>
                  )
                }
              </Form.Item>

              {/* Ações */}
              <Form.Item style={{ textAlign: "right", marginTop: 16 }}>
                <Button
                  style={{ marginRight: 8 }}
                  onClick={() => navigate("/missions")}
                >
                  Cancelar
                </Button>
                <Button type="primary" htmlType="submit" loading={loading}>
                  Salvar
                </Button>
              </Form.Item>
            </Form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default MissionEdit;
