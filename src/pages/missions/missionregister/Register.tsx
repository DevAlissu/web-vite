import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { message, Card, Input, Select, DatePicker, Button, Row, Col, Switch } from "antd";
import { useMissionStore } from "../../../store/missions";
import { useMonitoringStore } from "../../../store/monitoringStore";
import { useQuizStore } from "../../../store/quizzes";
import { useProductsStore } from "../../../store/products";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import dayjs, { Dayjs } from "dayjs";

const { Option } = Select;

const MissionRegister: React.FC = () => {
  const navigate = useNavigate();
  const { createMission } = useMissionStore();
  const { monitorings, fetchMonitorings } = useMonitoringStore();
  const { quizzes, fetchQuizzes } = useQuizStore();
  const { products, fetchProducts } = useProductsStore();
  const [loading, setLoading] = useState(false);

  // Estado do formulário unificado
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    energy_meta: "" as string | number,
    quantity_xp: "" as string | number,
    status: "",
    date_start: null as Dayjs | null,
    date_end: null as Dayjs | null,
    monitoring: null as number | null,
    quiz: null as number | null,
    isProductionLine: false,
    product: null as number | null,
  });

  useEffect(() => {
    fetchMonitorings();
    fetchQuizzes();
    fetchProducts();
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.description.trim() || !formValues.status) {
      message.error("Todos os campos obrigatórios devem ser preenchidos!");
      return;
    }

    setLoading(true);
    try {
      await createMission({
        ...formValues,
        energy_meta: Number(formValues.energy_meta),
        quantity_xp: Number(formValues.quantity_xp),
        date_start: formValues.date_start ? formValues.date_start.format("YYYY-MM-DD") : null,
        date_end: formValues.date_end ? formValues.date_end.format("YYYY-MM-DD") : null,
      });
      message.success("Missão cadastrada com sucesso!");
      navigate("/missions");
    } catch (error) {
      message.error("Erro ao cadastrar missão.");
      console.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho 
            title="Cadastro de Missão" 
            subTitle="Preencha os campos abaixo para cadastrar uma missão" 
          />

          <Card>
            <Row gutter={16}>
              <Col span={12}>
                <label>Nome</label>
                <Input 
                  placeholder="Digite o nome da missão" 
                  value={formValues.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                />
              </Col>

              <Col span={12}>
                <label>Descrição</label>
                <Input.TextArea 
                  placeholder="Digite a descrição"
                  value={formValues.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={8}>
                <label>Meta de Energia</label>
                <Input 
                  placeholder="Digite a meta de energia" 
                  type="number"
                  value={formValues.energy_meta}
                  onChange={(e) => handleChange("energy_meta", e.target.value)}
                />
              </Col>

              <Col span={8}>
                <label>Quantidade XP</label>
                <Input 
                  placeholder="Digite a quantidade de XP" 
                  type="number"
                  value={formValues.quantity_xp}
                  onChange={(e) => handleChange("quantity_xp", e.target.value)}
                />
              </Col>

              <Col span={8}>
                <label>Status</label>
                <Select 
                  placeholder="Selecione o status" 
                  value={formValues.status}
                  onChange={(value) => handleChange("status", value)}
                  style={{ width: "100%" }}
                >
                  <Option value="pendente">Pendente</Option>
                  <Option value="em andamento">Em andamento</Option>
                  <Option value="finalizada">Finalizada</Option>
                </Select>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <label>Data de Início</label>
                <DatePicker 
                  style={{ width: "100%" }} 
                  value={formValues.date_start}
                  onChange={(date) => handleChange("date_start", date)}
                />
              </Col>

              <Col span={12}>
                <label>Data de Fim</label>
                <DatePicker 
                  style={{ width: "100%" }} 
                  value={formValues.date_end}
                  onChange={(date) => handleChange("date_end", date)}
                />
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <label>Associar Monitoramento</label>
                <Select
                  placeholder="Selecione um monitoramento"
                  value={formValues.monitoring}
                  onChange={(value) => handleChange("monitoring", value)}
                  style={{ width: "100%" }}
                >
                  {monitorings.map((monitoring) => (
                    <Option key={monitoring.id} value={monitoring.id}>
                      {monitoring.name}
                    </Option>
                  ))}
                </Select>
              </Col>

              <Col span={12}>
                <label>Associar Quiz</label>
                <Select
                  placeholder="Selecione um quiz"
                  value={formValues.quiz}
                  onChange={(value) => handleChange("quiz", value)}
                  style={{ width: "100%" }}
                >
                  {quizzes.map((quiz) => (
                    <Option key={quiz.id} value={quiz.id}>
                      {quiz.name}
                    </Option>
                  ))}
                </Select>
              </Col>
            </Row>

            <Row gutter={16} style={{ marginTop: 16 }}>
              <Col span={12}>
                <label>É Ordem de Produção?</label>
                <Switch 
                  checked={formValues.isProductionLine}
                  onChange={(checked) => handleChange("isProductionLine", checked)}
                />
              </Col>

              {formValues.isProductionLine && (
                <Col span={12}>
                  <label>Associar Produto</label>
                  <Select
                    placeholder="Selecione um produto"
                    value={formValues.product}
                    onChange={(value) => handleChange("product", value)}
                    style={{ width: "100%" }}
                  >
                    {products.map((product) => (
                      <Option key={product.id} value={product.id}>
                        {product.name}
                      </Option>
                    ))}
                  </Select>
                </Col>
              )}
            </Row>

            <div style={{ marginTop: 16, textAlign: "right" }}>
              <Button onClick={() => navigate("/missions")} style={{ marginRight: 8 }}>Cancelar</Button>
              <Button type="primary" onClick={handleSubmit} loading={loading}>Cadastrar</Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default MissionRegister;