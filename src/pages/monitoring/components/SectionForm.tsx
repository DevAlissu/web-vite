import React from "react";
import DynamicForm from "@/components/form/DynamicForm";
import { SectionFormValues } from "@/pages/monitoring/hooks/useSectionForm";
import { TypeSection } from "@/store/typeSectionStore";

interface SectionFormProps {
  values: SectionFormValues;
  onChange: (name: keyof SectionFormValues, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
  loading: boolean;
  availableSections: { value: number; label: string }[];
  devices: { id: number; name: string }[];
  typeSections: TypeSection[]; // ✅ tipos reais
  isEdit?: boolean;
}

const SectionForm: React.FC<SectionFormProps> = ({
  values,
  onChange,
  onCancel,
  onSubmit,
  loading,
  availableSections,
  devices,
  typeSections,
  isEdit = false,
}) => {
  return (
    <DynamicForm
      fields={[
       
        {
          name: "is_monitored",
          label: "Monitorado?",
          type: "switch",
        },
        {
          name: "type_section",
          label: "Tipo da Seção",
          type: "select",
          options: typeSections.map((t) => ({
            value: t.name, // "SETOR", "LINHA", "EQUIPAMENTO"
            label:
              t.name === "SETOR"
                ? "Setor"
                : t.name === "LINHA"
                ? "Linha de Produção"
                : "Equipamento",
          })),
          disabled: isEdit,
        },
        {
          name: "section_consume",
          label: "Seção de Consumo",
          type: "select",
          options: availableSections,
          disabled: !values.type_section,
        },
        {
          name: "deviceIot",
          label: "Dispositivo IoT",
          type: "select",
          options: devices.map((device) => ({
            value: device.id,
            label: device.name,
          })),
          disabled: !values.is_monitored,
        },
      ]}
      values={values}
      onChange={(name, value) => onChange(name as keyof SectionFormValues, value)}
      loading={loading}
      onCancel={onCancel}
      onSubmit={onSubmit}
    />
  );
};

export default SectionForm;