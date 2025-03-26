import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSectionStore } from "@/store/sectionStore";
import { useSectionForm } from "@/pages/monitoring/hooks/useSectionForm";
import SectionForm from "./SectionForm";

const MonitoringAddSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addSection } = useSectionStore();

  const {
    formValues,
    handleChange,
    getAvailableSections,
    devices,
    typeSections, // ✅ Tipos de seção da API
  } = useSectionForm();

  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome da seção é obrigatório!");
      return;
    }

    const typeId = typeSections.find((t) => t.name === formValues.type_section)?.id;

    if (!typeId) {
      message.error("ID do tipo de seção não encontrado!");
      return;
    }

    console.log("👉 Enviando tipo_section ID:", typeId);

    setLoading(true);
    try {
      await addSection({
        name: formValues.name,
        is_monitored: formValues.is_monitored,
        monitoring: Number(id),
        type_section: typeId,
        DeviceIot: formValues.is_monitored ? formValues.deviceIot : null,
        setor: formValues.type_section === "SETOR" ? formValues.section_consume : null,
        productionLine: formValues.type_section === "LINHA" ? formValues.section_consume : null,
        equipament: formValues.type_section === "EQUIPAMENTO" ? formValues.section_consume : null,
      });

      message.success("Seção adicionada com sucesso!");
      navigate(`/monitoring/configure/${id}`);
    } catch (error) {
      console.error("❌ Erro real ao adicionar:", error);
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
      onCancel={() => navigate(`/monitoring/configure/${id}`)}
    >
      <SectionForm
        values={formValues}
        onChange={handleChange}
        onCancel={() => navigate(`/monitoring/configure/${id}`)}
        onSubmit={handleSubmit}
        loading={loading}
        availableSections={getAvailableSections()}
        devices={devices}
        typeSections={typeSections} // ✅ Passa os tipos pro form
      />
    </Modal>
  );
};

export default MonitoringAddSection;