import React, { useState } from "react";
import { Modal, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore";
import { useSectionForm } from "../hooks/useSectionForm";
import SectionForm from "./SectionForm";

const MonitoringAddSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const monitoringId = Number(id);
  const navigate = useNavigate();

  // Store do sensor
  const { createSectionForMonitoring } = useMonitoringSensorStore();

  // Formulário de seção sensor (agora com múltiplos devices)
  const {
    formValues,
    handleChange,
    getAvailableSections,
    devices,
    typeSections,
  } = useSectionForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome da seção é obrigatório!");
      return;
    }
    const typeId = typeSections.find(
      (t) => t.name === formValues.type_section
    )?.id;
    if (!typeId) {
      message.error("ID do tipo de seção não encontrado!");
      return;
    }
    setLoading(true);
    try {
      // Envia o array device_iots_ids para o backend
      await createSectionForMonitoring(monitoringId, {
        description: formValues.name,
        is_monitored: formValues.is_monitored,
        monitoring: monitoringId,
        type_section: typeId,
        setor:
          formValues.type_section === "SETOR"
            ? formValues.section_consume
            : undefined,
        productionLine:
          formValues.type_section === "LINHA"
            ? formValues.section_consume
            : undefined,
        equipament:
          formValues.type_section === "EQUIPAMENTO"
            ? formValues.section_consume
            : undefined,
        device_iots_ids: formValues.is_monitored ? formValues.deviceIots : [], // <--- AGORA É ARRAY
      } as any);

      message.success("Seção adicionada com sucesso!");
      navigate(`/sensor-monitoring/configure/${monitoringId}`);
    } catch (error) {
      console.error("Erro ao adicionar seção:", error);
      message.error("Erro ao adicionar seção!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Adicionar Nova Seção"
      open={true}
      footer={null}
      onCancel={() => navigate(`/sensor-monitoring/configure/${monitoringId}`)}
    >
      <SectionForm
        values={formValues}
        onChange={handleChange}
        onCancel={() =>
          navigate(`/sensor-monitoring/configure/${monitoringId}`)
        }
        onSubmit={handleSubmit}
        loading={loading}
        availableSections={getAvailableSections()}
        devices={devices}
        typeSections={typeSections}
      />
    </Modal>
  );
};

export default MonitoringAddSection;
