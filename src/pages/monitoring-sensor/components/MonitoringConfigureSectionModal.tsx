import React, { useEffect, useState } from "react";
import { Modal, Switch, Select, message } from "antd";
import { useIoTDevices } from "@/hooks/useIoTDevices";
import { SectionItem } from "@/types/sections";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore"; // USE A STORE DO SENSOR

interface Props {
  section: SectionItem;
  open: boolean;
  onClose: () => void;
}

const MonitoringConfigureSectionModal: React.FC<Props> = ({
  section,
  open,
  onClose,
}) => {
  const { devices, fetchDevices } = useIoTDevices();
  const { updateSectionForMonitoring } = useMonitoringSensorStore(); // <-- CORRETO

  const [form, setForm] = useState({
    is_monitored: section.is_monitored,
    deviceIots: section.device_iots?.map((d: any) => d.id) || [],
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchDevices();
    setForm({
      is_monitored: section.is_monitored,
      deviceIots: section.device_iots?.map((d: any) => d.id) || [],
    });
  }, [section, fetchDevices]);

  const handleChange = (name: string, value: any) => {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      await updateSectionForMonitoring(section.id, {
        is_monitored: form.is_monitored,
        device_iots_ids: form.is_monitored ? form.deviceIots : [],
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
          <p>Dispositivos IoT</p>
          <Select
            mode="multiple"
            style={{ width: "100%" }}
            value={form.deviceIots}
            onChange={(value) => handleChange("deviceIots", value)}
            options={devices.map((device) => ({
              value: device.id,
              label: device.name,
            }))}
            placeholder="Selecione um ou mais dispositivos"
          />
        </div>
      )}
    </Modal>
  );
};

export default MonitoringConfigureSectionModal;
