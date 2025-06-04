// src/pages/monitoring-sensor/hooks/useParametersModal.ts
import { useState } from "react";
import { useParametersMonitoringStore } from "@/store/parametersMonitoringStore";
import { ParametersMonitoringCreate } from "@/types/parametersMonitoring";
import { message } from "antd";

export const useParametersModal = (sectionId: number) => {
  const { parameters, fetchParameters, saveParameters, loading } =
    useParametersMonitoringStore();

  const [visible, setVisible] = useState(false);

  const openModal = async () => {
    await fetchParameters(sectionId);
    setVisible(true);
  };
  const closeModal = () => setVisible(false);

  const handleSave = async (data: ParametersMonitoringCreate) => {
    await saveParameters(sectionId, data);
    message.success("Parâmetros salvos com sucesso!");
    closeModal();
  };

  return {
    visible,
    openModal,
    closeModal,
    parameters,
    loading,
    handleSave,
  };
};
