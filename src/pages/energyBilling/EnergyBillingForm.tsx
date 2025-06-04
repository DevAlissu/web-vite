// src/pages/energyBilling/EnergyBillingForm.tsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Form,
  Row,
  Col,
  Input,
  InputNumber,
  Select,
  Upload,
  Button,
  message,
} from "antd";
import { UploadOutlined } from "@ant-design/icons";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { EnergyBillingItem } from "../../types/energyBilling";
import { useEnergyBillingStore } from "../../store/energyBillingStore";

type Mode = "create" | "edit" | "view";

interface Props {
  mode: Mode;
}

const { Option } = Select;

const EnergyBillingForm: React.FC<Props> = ({ mode }) => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const billingId = id ? Number(id) : null;

  const { fetchBillings, fetchBillingById, createBilling, updateBilling } =
    useEnergyBillingStore();

  const [form] = Form.useForm<any>();
  const [loading, setLoading] = useState(false);
  const [files, setFiles] = useState<{
    generator?: any[];
    distributor?: any[];
  }>({
    generator: [],
    distributor: [],
  });

  useEffect(() => {
    if (mode !== "create" && billingId != null) {
      setLoading(true);
      fetchBillings();
      const existing = fetchBillingById(billingId);
      if (existing) {
        form.setFieldsValue({
          ...existing,
        });
        if (existing.generatorInvoiceFileUrl) {
          setFiles((prev) => ({
            ...prev,
            generator: [
              {
                name: existing.generatorInvoiceFileUrl!.split("/").pop() || "",
                url: existing.generatorInvoiceFileUrl!,
                uid: "-1",
              },
            ],
          }));
        }
        if (existing.distributorInvoiceFileUrl) {
          setFiles((prev) => ({
            ...prev,
            distributor: [
              {
                name:
                  existing.distributorInvoiceFileUrl!.split("/").pop() || "",
                url: existing.distributorInvoiceFileUrl!,
                uid: "-1",
              },
            ],
          }));
        }
      }
      setLoading(false);
    } else if (mode === "create") {
      const today = new Date().toISOString().slice(0, 10);
      form.setFieldsValue({
        year: new Date().getFullYear(),
        month: "",
        generatorIssueDate: today,
        distributorIssueDate: today,
      });
    }
  }, [mode, billingId, fetchBillings, fetchBillingById, form]);

  const onFileChange = (type: "generator" | "distributor", info: any) => {
    const fileList = info.fileList.slice(-1);
    setFiles((prev) => ({ ...prev, [type]: fileList }));
  };

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formatted: EnergyBillingItem = {
        id: billingId ?? 0,
        year: values.year,
        month: values.month,
        generatorIssueDate: values.generatorIssueDate,
        generatorConsumed: values.generatorConsumed,
        generatorCost: values.generatorCost,
        generatorInvoiceFileUrl: files.generator?.[0]?.name || "",
        distributorIssueDate: values.distributorIssueDate,
        distributorConsumed: values.distributorConsumed,
        distributorCost: values.distributorCost,
        distributorInvoiceFileUrl: files.distributor?.[0]?.name || "",
        unitsProduced: values.unitsProduced,
        totalConsumed: values.generatorConsumed + values.distributorConsumed,
        totalCost: values.generatorCost + values.distributorCost,
        costPerUnit:
          values.unitsProduced > 0
            ? (values.generatorCost + values.distributorCost) /
              values.unitsProduced
            : 0,
        totalCarbonFootprint:
          (values.generatorConsumed + values.distributorConsumed) * 0.09,
        carbonPerUnit:
          values.unitsProduced > 0
            ? ((values.generatorConsumed + values.distributorConsumed) * 0.09) /
              values.unitsProduced
            : 0,
      };

      setLoading(true);
      if (mode === "create") {
        createBilling(formatted);
        message.success("Cadastrado com sucesso!");
      } else if (mode === "edit" && billingId != null) {
        updateBilling(billingId, formatted);
        message.success("Atualizado com sucesso!");
      }
      navigate("/energy-billing");
    } catch {
      message.error("Preencha todos os campos obrigatórios.");
    } finally {
      setLoading(false);
    }
  };

  const isView = mode === "view";

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title={
              mode === "create"
                ? "Novo Registro de Faturamento"
                : mode === "edit"
                ? "Editar Faturamento"
                : "Visualizar Faturamento"
            }
          />
          <Button
            style={{ marginBottom: 16 }}
            onClick={() => navigate("/energy-billing")}
          >
            &larr; Voltar
          </Button>
          <Form form={form} layout="vertical">
            {/* Ano / Mês */}
            <Row gutter={16}>
              <Col span={12}>
                <Form.Item
                  label="Ano"
                  name="year"
                  rules={[{ required: true, message: "Informe o ano" }]}
                >
                  <InputNumber disabled={isView} style={{ width: "100%" }} />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  label="Mês"
                  name="month"
                  rules={[{ required: true, message: "Informe o mês" }]}
                >
                  <Select disabled={isView} placeholder="Selecione">
                    <Option value="Janeiro">Janeiro</Option>
                    <Option value="Fevereiro">Fevereiro</Option>
                    <Option value="Março">Março</Option>
                    <Option value="Abril">Abril</Option>
                    <Option value="Maio">Maio</Option>
                    <Option value="Junho">Junho</Option>
                    <Option value="Julho">Julho</Option>
                    <Option value="Agosto">Agosto</Option>
                    <Option value="Setembro">Setembro</Option>
                    <Option value="Outubro">Outubro</Option>
                    <Option value="Novembro">Novembro</Option>
                    <Option value="Dezembro">Dezembro</Option>
                  </Select>
                </Form.Item>
              </Col>
            </Row>

            {/* Bloco Geradora */}
            <div className="heading-geradora">Geradora</div>
            <div className="block-geradora">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Data Emissão Fatura"
                    name="generatorIssueDate"
                    rules={[{ required: true, message: "Informe a data" }]}
                  >
                    <Input
                      type="date"
                      disabled={isView}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Energia Consumida (kWh)"
                    name="generatorConsumed"
                    rules={[{ required: true, message: "Informe o consumo" }]}
                  >
                    <InputNumber disabled={isView} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Custo Energia (R$)"
                    name="generatorCost"
                    rules={[{ required: true, message: "Informe o custo" }]}
                  >
                    <InputNumber
                      disabled={isView}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `R$ ${value?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`
                      }
                      parser={(value) => value?.replace(/R\$|\s|,/g, "") || ""}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Upload da Fatura (PDF)">
                {isView ? (
                  files.generator?.[0]?.url && (
                    <a
                      href={files.generator[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {files.generator[0].name}
                    </a>
                  )
                ) : (
                  <Upload
                    accept=".pdf"
                    beforeUpload={() => false}
                    fileList={files.generator}
                    onChange={(info) => onFileChange("generator", info)}
                  >
                    <Button icon={<UploadOutlined />}>Escolher arquivo</Button>
                  </Upload>
                )}
              </Form.Item>
            </div>

            {/* Bloco Distribuidora */}
            <div className="heading-distribuidora">Distribuidora</div>
            <div className="block-distribuidora">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item
                    label="Data Emissão Fatura"
                    name="distributorIssueDate"
                    rules={[{ required: true, message: "Informe a data" }]}
                  >
                    <Input
                      type="date"
                      disabled={isView}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Energia Consumida (kWh)"
                    name="distributorConsumed"
                    rules={[{ required: true, message: "Informe o consumo" }]}
                  >
                    <InputNumber disabled={isView} style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item
                    label="Custo Energia (R$)"
                    name="distributorCost"
                    rules={[{ required: true, message: "Informe o custo" }]}
                  >
                    <InputNumber
                      disabled={isView}
                      style={{ width: "100%" }}
                      formatter={(value) =>
                        `R$ ${value?.toLocaleString(undefined, {
                          minimumFractionDigits: 2,
                        })}`
                      }
                      parser={(value) => value?.replace(/R\$|\s|,/g, "") || ""}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Form.Item label="Upload da Fatura (PDF)">
                {isView ? (
                  files.distributor?.[0]?.url && (
                    <a
                      href={files.distributor[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {files.distributor[0].name}
                    </a>
                  )
                ) : (
                  <Upload
                    accept=".pdf"
                    beforeUpload={() => false}
                    fileList={files.distributor}
                    onChange={(info) => onFileChange("distributor", info)}
                  >
                    <Button icon={<UploadOutlined />}>Escolher arquivo</Button>
                  </Upload>
                )}
              </Form.Item>
            </div>

            {/* Bloco Produção */}
            <div className="heading-producao">Produção</div>
            <div className="block-producao">
              <Form.Item
                label="Unidades Produzidas"
                name="unitsProduced"
                rules={[{ required: true, message: "Informe a quantidade" }]}
              >
                <InputNumber disabled={isView} style={{ width: "100%" }} />
              </Form.Item>
            </div>

            {/* Bloco Resultados Calculados */}
            <div className="heading-resultados">Resultados Calculados</div>
            <div className="block-resultados">
              <Row gutter={16}>
                <Col span={8}>
                  <Form.Item label="Consumo Total (kWh)">
                    <Input
                      readOnly
                      value={`${
                        (form.getFieldValue("generatorConsumed") || 0) +
                        (form.getFieldValue("distributorConsumed") || 0)
                      } kWh`}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Custo Total (R$)">
                    <Input
                      readOnly
                      value={`R$ ${(
                        (form.getFieldValue("generatorCost") || 0) +
                        (form.getFieldValue("distributorCost") || 0)
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Custo por Unidade (R$)">
                    <Input
                      readOnly
                      value={`R$ ${(
                        ((form.getFieldValue("generatorCost") || 0) +
                          (form.getFieldValue("distributorCost") || 0)) /
                          (form.getFieldValue("unitsProduced") || 1) || 0
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}`}
                    />
                  </Form.Item>
                </Col>
              </Row>
              <Row gutter={16} style={{ marginTop: 8 }}>
                <Col span={8}>
                  <Form.Item label="Pegada de Carbono Total (kg CO₂)">
                    <Input
                      readOnly
                      value={`${(
                        ((form.getFieldValue("generatorConsumed") || 0) +
                          (form.getFieldValue("distributorConsumed") || 0)) *
                        0.09
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })} kg CO₂`}
                    />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Pegada de Carbono por Unidade (kg CO₂)">
                    <Input
                      readOnly
                      value={`${(
                        (((form.getFieldValue("generatorConsumed") || 0) +
                          (form.getFieldValue("distributorConsumed") || 0)) *
                          0.09) /
                        (form.getFieldValue("unitsProduced") || 1)
                      ).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })} kg CO₂`}
                    />
                  </Form.Item>
                </Col>
              </Row>
            </div>

            {/* Botões Cancelar / Salvar (ou apenas Voltar no modo view) */}
            <div style={{ marginTop: 24, textAlign: "right" }}>
              {!isView && (
                <>
                  <Button
                    style={{ marginRight: 8 }}
                    onClick={() => navigate("/energy-billing")}
                  >
                    Cancelar
                  </Button>
                  <Button
                    type="primary"
                    loading={loading}
                    onClick={handleSubmit}
                  >
                    Salvar
                  </Button>
                </>
              )}
            </div>
          </Form>
        </main>
      </div>
    </div>
  );
};

export default EnergyBillingForm;
