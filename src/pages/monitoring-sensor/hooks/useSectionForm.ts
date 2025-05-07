import { useEffect, useState } from "react";
import { useSectorsStore } from "@/store/sectors";
import { useProductionLinesStore } from "@/store/ProductionLinesStore";
import { useEquipamentsStore } from "@/store/equipaments";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { useTypeSectionStore } from "@/store/typeSectionStore";
import { useSectionStore } from "@/store/sectionStore";

export type SectionFormValues = {
  name: string;
  is_monitored: boolean;
  type_section: "SETOR" | "LINHA" | "EQUIPAMENTO" | null;
  section_consume: number | null;
  deviceIot: number | null;
};

export const useSectionForm = (isEdit = false) => {
  const [formValues, setFormValues] = useState<SectionFormValues>({
    name: "",
    is_monitored: false,
    type_section: null,
    section_consume: null,
    deviceIot: null,
  });

  const { devices, fetchDevices } = useIoTDevices();
  const { sectors, fetchSectors } = useSectorsStore();
  const { productionLines, fetchProductionLines } = useProductionLinesStore();
  const { equipaments, fetchEquipaments } = useEquipamentsStore();
  const { types, fetchTypes } = useTypeSectionStore();
  const { fetchSections } = useSectionStore();

  useEffect(() => {
    fetchDevices();
    fetchSectors();
    fetchProductionLines();
    fetchEquipaments();
    fetchTypes();
  }, []);

  const filteredTypeSections = types.filter((t) => [1, 2, 3].includes(t.id)); // Apenas os fixos

  const getSelectedLabelFromId = (
    type: SectionFormValues["type_section"],
    id: number | null
  ) => {
    if (!id) return "";
    switch (type) {
      case "SETOR":
        return sectors.find((s) => s.id === id)?.name ?? "";
      case "LINHA":
        return productionLines.find((l) => l.id === id)?.name ?? "";
      case "EQUIPAMENTO":
        return equipaments.find((e) => e.id === id)?.name ?? "";
      default:
        return "";
    }
  };

  const handleChange = <K extends keyof SectionFormValues>(
    name: K,
    value: SectionFormValues[K]
  ) => {
    setFormValues((prev) => {
      if (name === "is_monitored") {
        return {
          ...prev,
          is_monitored: Boolean(value),
          deviceIot: value ? prev.deviceIot : null,
        };
      }
  
      if (name === "type_section") {
        return {
          ...prev,
          type_section: value as SectionFormValues["type_section"],
          section_consume: null,
          name: "", // Limpa o nome para ser atualizado com a seção de consumo
          deviceIot: null,
        };
      }
  
      if (name === "section_consume") {
        const label = getSelectedLabelFromId(formValues.type_section, value as number);
  
        if (isEdit) fetchSections();
  
        return {
          ...prev,
          section_consume: value as number,
          name: label ? label : prev.name, // Atualiza o nome automaticamente
          deviceIot: null,
        };
      }
  
      return {
        ...prev,
        [name]: value,
      };
    });
  };
  

  const getAvailableSections = () => {
    switch (formValues.type_section) {
      case "SETOR":
        return sectors.map((s) => ({ value: s.id, label: s.name }));
      case "LINHA":
        return productionLines.map((l) => ({ value: l.id, label: l.name }));
      case "EQUIPAMENTO":
        return equipaments.map((e) => ({ value: e.id, label: e.name }));
      default:
        return [];
    }
  };

  return {
    formValues,
    setFormValues,
    handleChange,
    getAvailableSections,
    devices,
    typeSections: filteredTypeSections,
  };
};