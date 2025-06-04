// src/pages/iotDevices/hooks/useIoTDevicesList.ts

import { useEffect, useState, useCallback } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { useIoTDevicesStore } from "../../../store/iotDevices";
import { getEquipments } from "../../../services/equipmentsService";
import type { IoTDevice } from "../../../types/IoTDevice";

interface UseIoTDevicesListResult {
  devices: IoTDevice[];
  loading: boolean;
  getEquipmentName: (equipmentId: number | null) => string;
  onDelete: (id: number) => Promise<void>;
  reload: () => Promise<void>;
}

export function useIoTDevicesList(): UseIoTDevicesListResult {
  const navigate = useNavigate();
  const { devices, fetchDevices, removeDevice } = useIoTDevicesStore();
  const [loading, setLoading] = useState(false);
  const [equipments, setEquipments] = useState<{ id: number; name: string }[]>(
    []
  );

  // Mapea ID -> nome do equipamento
  const getEquipmentName = useCallback(
    (equipmentId: number | null) => {
      if (!equipmentId) return "Nenhum";
      const eq = equipments.find((e) => e.id === equipmentId);
      return eq ? eq.name : "Equipamento não encontrado";
    },
    [equipments]
  );

  // Função para recarregar lista de dispositivos e equipamentos
  const reload = useCallback(async () => {
    try {
      setLoading(true);
      await fetchDevices();
      const eqList = await getEquipments();
      setEquipments(eqList);
    } catch (err) {
      console.error(err);
      message.error("Erro ao carregar dispositivos ou equipamentos.");
    } finally {
      setLoading(false);
    }
  }, [fetchDevices]);

  // Chama reload uma vez na montagem
  useEffect(() => {
    void reload();
  }, [reload]);

  // Handler para excluir + recarregar
  const onDelete = useCallback(
    async (id: number) => {
      try {
        setLoading(true);
        await removeDevice(id);
        message.success("Dispositivo removido com sucesso!");
        await fetchDevices();
      } catch {
        message.error("Erro ao remover dispositivo.");
      } finally {
        setLoading(false);
      }
    },
    [fetchDevices, removeDevice]
  );

  return { devices, loading, getEquipmentName, onDelete, reload };
}
