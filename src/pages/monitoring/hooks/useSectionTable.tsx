import { useEffect, useState } from "react";
import { message } from "antd";
import { useSectionStore } from "@/store/sectionStore";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { SectionItem } from "@/types/sections";
import { useSectionHierarchy } from "./useSectionHierarchy";

export const useSectionTable = () => {
  // Stores
  const {
    sections,
    fetchSections,
    deleteSection,
    updateSection,
    loading,
  } = useSectionStore();

  const { devices, fetchDevices } = useIoTDevices();

  // Estados locais
  const [sectionToConfigure, setSectionToConfigure] = useState<SectionItem | null>(null);
  const [isConfigureModalVisible, setIsConfigureModalVisible] = useState(false);

  // Carregamento inicial
  useEffect(() => {
    const loadData = async () => {
      try {
        await Promise.all([fetchSections(), fetchDevices()]);
      } catch (error) {
        message.error("Erro ao carregar seções ou dispositivos.");
      }
    };

    loadData();
  }, [fetchSections, fetchDevices]);

  // Processa hierarquia das seções
  const { setoresPrincipais, filteredSections } = useSectionHierarchy(sections);

  // Abrir modal de configuração
  const handleOpenConfigure = (section: SectionItem) => {
    setSectionToConfigure(section);
    setIsConfigureModalVisible(true);
  };

  // Fechar modal
  const handleCloseConfigure = () => {
    setIsConfigureModalVisible(false);
    setSectionToConfigure(null);
  };

  // Salvar configuração de uma seção
  const handleSaveConfigure = async (data: Partial<SectionItem>) => {
    if (!sectionToConfigure) return;

    try {
      const updatedData: Partial<SectionItem> = {
        ...sectionToConfigure,
        is_monitored: data.is_monitored,
        DeviceIot: data.is_monitored ? data.DeviceIot : null,
      };

      await updateSection(sectionToConfigure.id, updatedData);
      message.success("Seção configurada com sucesso.");
      handleCloseConfigure();
    } catch (error) {
      console.error(error);
      message.error("Erro ao configurar seção.");
    }
  };

  // Colunas da tabela
  const baseColumns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: SectionItem, b: SectionItem) => a.name.localeCompare(b.name),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Consumo Estimado (kWh)",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
    },
  ];

  return {
    columns: baseColumns,
    sections: filteredSections,
    setoresPrincipais,
    loading,
    sectionToConfigure,
    isConfigureModalVisible,
    setIsConfigureModalVisible,
    handleOpenConfigure,
    handleCloseConfigure,
    handleSaveConfigure,
    deleteSection,
    devices,
  };
};