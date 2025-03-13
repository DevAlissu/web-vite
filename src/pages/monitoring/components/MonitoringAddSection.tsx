import React, { useState, useEffect } from "react";
import { Modal, message } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import DynamicForm from "../../../components/form/DynamicForm";
import { useSectionStore } from "../../../store/sectionStore";
import { useSectorsStore } from "../../../store/sectors"; 
import { useProductionLinesStore } from "../../../store/ProductionLinesStore"; 
import { useEquipamentsStore } from "../../../store/equipaments"; 
import { useIoTDevices } from "../../../hooks/useIoTDevices";
import { createTypeSection } from "../../../services/SectionsService"; 

const MonitoringAddSection: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addSection, fetchSections } = useSectionStore();
  const { devices, fetchDevices } = useIoTDevices();
  const { sectors, fetchSectors } = useSectorsStore(); 
  const { productionLines, fetchProductionLines } = useProductionLinesStore(); 
  const { equipaments, fetchEquipaments } = useEquipamentsStore(); 
  
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    is_monitored: false,
    type_section: null as "setor" | "linha" | "equipamento" | null, 
    section_consume: null,
    deviceIot: null,
  });

  useEffect(() => {
    fetchDevices();
    fetchSections();
    fetchSectors();
    fetchProductionLines();
    fetchEquipaments();
    // Criar tipos de seção se ainda não existirem
    createTypeSection("setor");
    createTypeSection("linha");
    createTypeSection("equipamento");
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => {
      if (name === "is_monitored") {
        return { ...prev, [name]: value, deviceIot: value ? prev.deviceIot : null };
      }
      return { ...prev, [name]: value };
    });
  };

  const getAvailableSections = () => {
    switch (formValues.type_section) {
      case "setor":
        return sectors.map((sector) => ({ value: sector.id, label: sector.name }));
      case "linha":
        return productionLines.map((line) => ({ value: line.id, label: line.name }));
      case "equipamento":
        return equipaments.map((equip) => ({ value: equip.id, label: equip.name }));
      default:
        return [];
    }
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome da seção é obrigatório!");
      return;
    }

    setLoading(true);
    
    let typeSectionId = null;
    if (formValues.type_section === "setor") {
      typeSectionId = 1;
    } else if (formValues.type_section === "linha") {
      typeSectionId = 2;
    } else if (formValues.type_section === "equipamento") {
      typeSectionId = 3;
    }

    try {
      await addSection({
        name: formValues.name,
        description: formValues.description,
        is_monitored: formValues.is_monitored,
        monitoring: Number(id),
        type_section: typeSectionId,
        deviceIot: formValues.is_monitored ? formValues.deviceIot : null,
        setor: formValues.type_section === "setor" ? formValues.section_consume : null,
        productionLine: formValues.type_section === "linha" ? formValues.section_consume : null,
        Equipament: formValues.type_section === "equipamento" ? formValues.section_consume : null,
      });

      message.success("Seção adicionada com sucesso!");
      fetchSections();
      navigate(`/monitoring/configure/${id}`);
    } catch (error) {
      message.error("Erro ao adicionar seção!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Adicionar Nova Seção"
      open={true}
      onOk={handleSubmit}
      onCancel={() => navigate(`/monitoring/configure/${id}`)}
      confirmLoading={loading}
    >
      <DynamicForm
        fields={[
          { name: "name", label: "Nome da Seção", type: "input", required: true },
          { name: "description", label: "Descrição", type: "textarea" },
          { name: "is_monitored", label: "Monitorado?", type: "switch" },
          { 
            name: "type_section", 
            label: "Tipo da Seção", 
            type: "select", 
            options: [
              { value: "setor", label: "Setor" },
              { value: "linha", label: "Linha de Produção" },
              { value: "equipamento", label: "Equipamento" },
            ],
            onChange: (value) => setFormValues((prev) => ({ ...prev, type_section: value, section_consume: null })),
          },
          {
            name: "section_consume",
            label: "Seção de Consumo",
            type: "select",
            options: getAvailableSections(),
            disabled: !formValues.type_section, 
          },
          {
            name: "deviceIot",
            label: "Dispositivo IoT",
            type: "select",
            options: devices.map((device) => ({ value: device.id, label: device.name })),
            disabled: !formValues.is_monitored,
          },
        ]}
        values={formValues}
        onChange={handleChange}
        onSubmit={handleSubmit}
        loading={loading}
      />
    </Modal>
  );
};

export default MonitoringAddSection;