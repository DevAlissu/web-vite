// src/pages/monitoring-sensor/hooks/useSectionTable.ts

import { useEffect, useState, useMemo } from "react";
import { message } from "antd";
import { useParams } from "react-router-dom";
import { useSectionStore } from "@/store/sectionStore";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { SectionItem } from "@/types/sections";
import { useSectionHierarchy } from "./useSectionHierarchy";

export const useSectionTable = () => {
  // Pega o ID do monitoramento NANSENsor da URL
  const { id: monitoringIdParam } = useParams<{ id: string }>();
  const monitoringId = Number(monitoringIdParam);

  // Stores
  const {
    sections: allSections,
    fetchSections,
    deleteSection,
    updateSection,
    loading,
  } = useSectionStore();

  const { devices, fetchDevices } = useIoTDevices();

  // Estado local para modal de configuração
  const [sectionToConfigure, setSectionToConfigure] =
    useState<SectionItem | null>(null);
  const [isConfigureModalVisible, setIsConfigureModalVisible] = useState(false);

  // Carregamento inicial: seções + dispositivos
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

  // Filtra apenas as seções vinculadas a este monitoringId
  const sections = useMemo(() => {
    if (isNaN(monitoringId)) return [];
    return allSections.filter((sec) => sec.monitoring === monitoringId);
  }, [allSections, monitoringId]);

  // Processa hierarquia das seções filtradas
  const { setoresPrincipais, filteredSections } = useSectionHierarchy(sections);

  // Abre o modal de configuração para uma seção específica
  const handleOpenConfigure = (section: SectionItem) => {
    setSectionToConfigure(section);
    setIsConfigureModalVisible(true);
  };

  // Fecha o modal
  const handleCloseConfigure = () => {
    setIsConfigureModalVisible(false);
    setSectionToConfigure(null);
  };

  // Salva as mudanças de configuração (ativar/desativar ou vincular dispositivo IoT)
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

  // Colunas-base (sem as ações de editar/excluir/configurar)
  const baseColumns = [
    {
      title: "Seção",
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
      render: (value: number) => `${value} kWh`,
    },
  ];

  return {
    columns: baseColumns,
    sections: filteredSections, // seções já organizadas em hierarquia
    setoresPrincipais, // raízes da hierarquia filtrada
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
