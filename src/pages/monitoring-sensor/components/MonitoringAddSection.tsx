// src/pages/monitoring-sensor/components/MonitoringAddSection.tsx
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

  // Pegamos createSectionForMonitoring do store “sensor-monitoring”
  const { createSectionForMonitoring } = useMonitoringSensorStore();

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

    // Traduzimos o “type_section” string ("SETOR", "LINHA" ou "EQUIPAMENTO") para o ID numérico
    const typeId = typeSections.find(
      (t) => t.name === formValues.type_section
    )?.id;
    if (!typeId) {
      message.error("ID do tipo de seção não encontrado!");
      return;
    }

    setLoading(true);
    try {
      // ⬇️ Observação: aqui fazemos cast para “any” pois createSectionForMonitoring espera Partial<SectionSimple>,
      // mas enviamos campos extras (type_section, setor, productionLine, equipament, DeviceIot).
      // Dessa forma o TS não reclama, e o backend recebe tudo corretamente.
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
        DeviceIot: formValues.is_monitored ? formValues.deviceIot : undefined,
      } as any);

      message.success("Seção adicionada com sucesso!");
      // Volta para a tela de “configure” assim que adiciona
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
