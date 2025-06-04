// src/pages/iotDevices/hooks/useIoTDeviceForm.ts

import { useState, useEffect, useCallback } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { getEquipments } from "../../../services/equipmentsService";
import {
  getIoTDeviceById,
  createIoTDevice,
  updateIoTDevice,
} from "../../../services/IoTDevicesService";
import type { IoTDevice } from "../../../types/IoTDevice";

interface UseIoTDeviceFormResult {
  formValues: Partial<IoTDevice>;
  equipmentsOptions: { value: number; label: string }[];
  loadingOptions: boolean;
  loadingSubmit: boolean;
  handleChange: (name: string, value: any) => void;
  handleSubmitCreate: () => Promise<void>;
  handleSubmitEdit: () => Promise<void>;
}

export function useIoTDeviceForm(
  mode: "create" | "edit"
): UseIoTDeviceFormResult {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const [formValues, setFormValues] = useState<Partial<IoTDevice>>({
    name: "",
    devEui: "",
    type_device: null, // ajustado para null
    equipement: null,
  });
  const [equipmentsOptions, setEquipmentsOptions] = useState<
    { value: number; label: string }[]
  >([]);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Carrega lista de equipamentos em options
  const loadEquipments = useCallback(async () => {
    try {
      const eqList = await getEquipments();
      setEquipmentsOptions(
        eqList.map((eq: { id: number; name: string }) => ({
          value: eq.id,
          label: eq.name,
        }))
      );
    } catch {
      message.error("Erro ao carregar opções de equipamentos.");
    } finally {
      setLoadingOptions(false);
    }
  }, []);

  // Se modo = "edit", busca dados iniciais do dispositivo
  const loadExistingDevice = useCallback(async () => {
    if (mode === "edit" && id && !isNaN(Number(id))) {
      setLoadingSubmit(true);
      try {
        const deviceData = await getIoTDeviceById(Number(id));
        setFormValues({
          name: deviceData.name,
          devEui: deviceData.devEui,
          type_device: deviceData.type_device,
          equipement: deviceData.equipement ?? null,
        });
      } catch {
        message.error("Erro ao carregar dados do dispositivo.");
        navigate("/iotdevices");
      } finally {
        setLoadingSubmit(false);
      }
    }
  }, [id, mode, navigate]);

  useEffect(() => {
    void loadEquipments();
    if (mode === "edit") {
      void loadExistingDevice();
    }
  }, [loadEquipments, loadExistingDevice, mode]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmitCreate = useCallback(async () => {
    if (!formValues.name?.trim()) {
      message.error("O nome do dispositivo é obrigatório!");
      return;
    }
    if (!formValues.devEui?.trim()) {
      message.error("O DevEUI do dispositivo é obrigatório!");
      return;
    }
    setLoadingSubmit(true);
    try {
      await createIoTDevice({
        name: formValues.name!,
        devEui: formValues.devEui!,
        type_device: formValues.type_device as "Nansenic" | "Nansenson",
        equipement: formValues.equipement ?? null,
      });
      message.success("Dispositivo cadastrado com sucesso!");
      navigate("/iotdevices");
    } catch {
      message.error("Erro ao cadastrar dispositivo!");
    } finally {
      setLoadingSubmit(false);
    }
  }, [formValues, navigate]);

  const handleSubmitEdit = useCallback(async () => {
    if (!id) return;
    if (!formValues.name?.trim()) {
      message.error("O nome do dispositivo é obrigatório!");
      return;
    }
    if (!formValues.devEui?.trim()) {
      message.error("O DevEUI do dispositivo é obrigatório!");
      return;
    }
    setLoadingSubmit(true);
    try {
      await updateIoTDevice(Number(id), {
        name: formValues.name!,
        devEui: formValues.devEui!,
        type_device: formValues.type_device as "Nansenic" | "Nansenson",
        equipement: formValues.equipement ?? null,
      });
      message.success("Dispositivo atualizado com sucesso!");
      navigate("/iotdevices");
    } catch {
      message.error("Erro ao atualizar dispositivo!");
    } finally {
      setLoadingSubmit(false);
    }
  }, [formValues, id, navigate]);

  return {
    formValues,
    equipmentsOptions,
    loadingOptions,
    loadingSubmit,
    handleChange,
    handleSubmitCreate,
    handleSubmitEdit,
  };
}
