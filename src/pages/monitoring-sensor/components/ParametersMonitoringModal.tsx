// src/pages/monitoring-sensor/components/ParametersMonitoringModal.tsx
import React, { useEffect, useState } from "react";
import { Modal, InputNumber, Form, Button, Spin } from "antd";
import {
  ParametersMonitoringItem,
  ParametersMonitoringCreate,
} from "@/types/parametersMonitoring";

interface Props {
  visible: boolean;
  onClose: () => void;
  onSave: (data: ParametersMonitoringCreate) => void;
  loading: boolean;
  parameters: ParametersMonitoringItem | null;
  sectionId: number;
}

const ParametersMonitoringModal: React.FC<Props> = ({
  visible,
  onClose,
  onSave,
  loading,
  parameters,
  sectionId,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (parameters) {
      form.setFieldsValue(parameters);
    } else {
      form.resetFields();
    }
  }, [parameters, form, visible]);

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      onSave({ ...values, section: sectionId });
    } catch (e) {}
  };

  return (
    <Modal
      open={visible}
      title="Parâmetros de Controle"
      onCancel={onClose}
      footer={[
        <Button key="cancel" onClick={onClose}>
          Cancelar
        </Button>,
        <Button key="ok" type="primary" loading={loading} onClick={handleOk}>
          Salvar
        </Button>,
      ]}
    >
      <Spin spinning={loading}>
        <Form form={form} layout="vertical">
          <h3>TEMPERATURA</h3>
          <Form.Item
            label="Mínima (°C)"
            name="min_temperature"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={-100} max={200} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Máxima (°C)"
            name="max_temperature"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={-100} max={200} style={{ width: "100%" }} />
          </Form.Item>

          <h3>UMIDADE</h3>
          <Form.Item
            label="Mínima (%)"
            name="min_humidity"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Máxima (%)"
            name="max_humidity"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={0} max={100} style={{ width: "100%" }} />
          </Form.Item>

          <h3>LUMINOSIDADE</h3>
          <Form.Item
            label="Mínima (Lux)"
            name="min_luminosity"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={0} max={100000} style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            label="Máxima (Lux)"
            name="max_luminosity"
            rules={[{ required: true, message: "Obrigatório" }]}
          >
            <InputNumber min={0} max={100000} style={{ width: "100%" }} />
          </Form.Item>
        </Form>
      </Spin>
    </Modal>
  );
};

export default ParametersMonitoringModal;
