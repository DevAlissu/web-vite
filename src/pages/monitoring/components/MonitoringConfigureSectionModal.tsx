import React, { useEffect, useState } from "react";
import { Modal, Switch, Select, message } from "antd";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { SectionItem } from "@/types/sections";
import { useSectionStore } from "@/store/sectionStore";

interface Props {
  section: SectionItem;
  open: boolean;
  onClose: () => void;
}

const MonitoringConfigureSectionModal: React.FC<Props> = ({ section, open, onClose }) => {
  const { devices, fetchDevices } = useIoTDevices();
  const { updateSection } = useSectionStore();

  const [form, setForm] = useState({
    is_monitored: section.is_monitored,
    deviceIot: section.DeviceIot ?? null,
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
  }, []);

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateSection(section.id, {
        name: section.name,
        description: section.description,
        is_monitored: form.is_monitored,
        DeviceIot: form.is_monitored ? form.deviceIot : null,
        monitoring: section.monitoring,
        setor: section.setor,
        productionLine: section.productionLine,
        equipament: section.equipament,
        type_section: section.type_section,
        secticon_parent: section.secticon_parent,
      });

      message.success("Seção atualizada com sucesso!");
      onClose();
    } catch (error) {
      console.error("Erro ao configurar seção:", error);
      message.error("Erro ao configurar seção.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      title="Configurar Seção"
      open={open}
      onCancel={onClose}
      onOk={handleSave}
      confirmLoading={loading}
    >
      <div style={{ marginBottom: 20 }}>
        <p>Monitorado?</p>
        <Switch
          checked={form.is_monitored}
          onChange={(value) => handleChange("is_monitored", value)}
        />
      </div>

      {form.is_monitored && (
        <div>
          <p>Dispositivo IoT</p>
          <Select
            style={{ width: "100%" }}
            value={form.deviceIot}
            onChange={(value) => handleChange("deviceIot", value)}
            options={devices.map((device) => ({
              value: device.id,
              label: device.name,
            }))}
          />
        </div>
      )}
    </Modal>
  );
};

export default MonitoringConfigureSectionModal;