import React, { useEffect, useState } from "react";
import { Modal, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import { useSectionStore } from "@/store/sectionStore";
import { useSectionForm } from "@/pages/monitoring/hooks/useSectionForm";
import { useTypeSectionStore, TypeSection } from "@/store/typeSectionStore";
import SectionForm from "./SectionForm";

const SectionEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { sections, fetchSections, updateSection } = useSectionStore();
  const { fetchTypes, types } = useTypeSectionStore();

  const {
    formValues,
    setFormValues,
    handleChange,
    getAvailableSections,
    devices,
  } = useSectionForm(true); // ✅ modo edição ativado

  const [loading, setLoading] = useState(false);
  const [monitoringId, setMonitoringId] = useState<number | null>(null);
  const [loaded, setLoaded] = useState(false); // ✅ impede reexecução do setFormValues

  useEffect(() => {
    fetchSections();
    fetchTypes();
  }, []);

  useEffect(() => {
    if (id && sections.length > 0 && types.length > 0 && !loaded) {
      const section = sections.find((s) => s.id === Number(id));
      if (!section) {
        message.error("Seção não encontrada.");
        navigate("/sensor-monitoring");
        return;
      }

      const typeMatch = types.find((t: TypeSection) => t.id === section.type_section);
      if (!typeMatch) {
        message.error("Tipo da seção inválido.");
        return;
      }

      setMonitoringId(section.monitoring || null);

      setFormValues({
        name: section.name || "",
        is_monitored: !!section.is_monitored,
        type_section: typeMatch.name as "SETOR" | "LINHA" | "EQUIPAMENTO",
        section_consume:
          section.setor ?? section.productionLine ?? section.equipament ?? null,
        deviceIot: section.DeviceIot ?? null,
      });

      setLoaded(true); // ✅ garante que isso só roda uma vez
    }
  }, [id, sections, types, loaded]);

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome da seção é obrigatório!");
      return;
    }

    const typeId = types.find((t: TypeSection) => t.name === formValues.type_section)?.id;

    if (!typeId) {
      message.error("Tipo da seção inválido!");
      return;
    }

    setLoading(true);
    try {
      await updateSection(Number(id), {
        name: formValues.name,
        is_monitored: formValues.is_monitored,
        type_section: typeId,
        DeviceIot: formValues.is_monitored ? formValues.deviceIot : null,
        setor: formValues.type_section === "SETOR" ? formValues.section_consume : null,
        productionLine: formValues.type_section === "LINHA" ? formValues.section_consume : null,
        equipament: formValues.type_section === "EQUIPAMENTO" ? formValues.section_consume : null,
      });

      message.success("Seção atualizada com sucesso!");
      navigate(`/monitoring/configure/${monitoringId}`);
    } catch (error) {
      console.error("❌ Erro ao atualizar:", error);
      message.error("Erro ao atualizar seção!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Editar Seção"
      open={true}
      footer={null}
      onCancel={() => navigate(`/monitoring/configure/${monitoringId}`)}
    >
      <SectionForm
        values={formValues}
        onChange={handleChange}
        onCancel={() => navigate(`/monitoring/configure/${monitoringId}`)}
        onSubmit={handleSubmit}
        loading={loading}
        availableSections={getAvailableSections()}
        devices={devices}
        typeSections={types}
        isEdit={true}
      />
    </Modal>
  );
};

export default SectionEdit;