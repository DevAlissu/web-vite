import { useEffect, useState } from "react";
import { useSectionStore } from "@/store/sectionStore";
import { message } from "antd";
import { SectionItem } from "@/types/sections";
import { useIoTDevices } from "@/hooks/useIoTDevices";

export const useSectionTable = () => {
  const { sections, fetchSections, deleteSection, updateSection } = useSectionStore();
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState<SectionItem | null>(null);
  const [configureVisible, setConfigureVisible] = useState(false);
  const { devices, fetchDevices } = useIoTDevices();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchSections();
        await fetchDevices();
      } catch (error) {
        message.error("Erro ao carregar seções.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchSections]);

  const handleConfigure = (section: SectionItem) => {
    setSelectedSection(section);
    setConfigureVisible(true);
  };

  const handleSaveConfigure = async (data: Partial<SectionItem>) => {
    if (!selectedSection) return;

    try {
      const updatedData: Partial<SectionItem> = {
        ...selectedSection,
        is_monitored: data.is_monitored,
        DeviceIot: data.is_monitored ? data.DeviceIot : null,
      };

      await updateSection(selectedSection.id, updatedData);
      message.success("Seção configurada com sucesso.");
      setConfigureVisible(false);
    } catch (error) {
      message.error("Erro ao configurar seção.");
      console.error(error);
    }
  };

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
    sections,
    loading,
    configureVisible,
    selectedSection,
    setConfigureVisible,
    handleConfigure,
    handleSaveConfigure,
    deleteSection,
    devices,
  };
};