// src/pages/iotDevices/hooks/useIoTDevicesTable.tsx

import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useIoTDevicesStore } from "../../../store/iotDevices";
import { getEquipments } from "../../../services/equipmentsService"; // 🔹 Buscar equipamentos
import Actions from "../../../components/actions/Actions";
import { IoTDevice } from "../../../types/IoTDevice";

export const useIoTDevicesTable = () => {
  const navigate = useNavigate();
  const { devices, fetchDevices, removeDevice } = useIoTDevicesStore();
  const [loading, setLoading] = useState(true);
  const [equipments, setEquipments] = useState<{ id: number; name: string }[]>(
    []
  );

  // 🔹 Buscar dispositivos IoT e equipamentos
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchDevices();

        // Buscar equipamentos para mapear o nome
        const equipmentList = await getEquipments();
        setEquipments(equipmentList);
      } catch (error) {
        console.error("Erro ao buscar dispositivos IoT:", error);
        message.error("Erro ao carregar dispositivos IoT!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // 🔹 Mapear o nome do equipamento vinculado
  const getEquipmentName = (equipmentId: number | null) => {
    if (!equipmentId) return "Nenhum";
    const equipment = equipments.find((eq) => eq.id === equipmentId);
    return equipment ? equipment.name : "Equipamento não encontrado";
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: IoTDevice, b: IoTDevice) =>
        a.name.localeCompare(b.name || "") || 0,
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text: string) => <strong>{text || "Sem nome"}</strong>,
    },
    {
      title: "DevEUI",
      dataIndex: "devEui",
      key: "devEui",
      render: (text: string | null) => text ?? "Não informado",
    },
    {
      title: "Tipo de Dispositivo",
      dataIndex: "type_device",
      key: "type_device",
      render: (text: "Nansenic" | "Nansenson" | null) =>
        text === "Nansenic"
          ? "NANSENic"
          : text === "Nansenson"
          ? "NANSENsensor"
          : "Não informado",
      filters: [
        { text: "NANSENic", value: "Nansenic" },
        { text: "NANSENsensor", value: "Nansenson" },
      ],
      onFilter: (value: any, record: IoTDevice) => record.type_device === value,
    },
    {
      title: "Equipamento Associado",
      dataIndex: "equipement",
      key: "equipement",
      render: (equipement: number | null) => getEquipmentName(equipement),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: IoTDevice) => (
        <Actions
          onEdit={() => navigate(`/iotdevices/edit/${record.id}`)}
          onDelete={async () => {
            if (record.id) {
              await removeDevice(record.id);
              await fetchDevices();
            }
          }}
        />
      ),
    },
  ];

  return { columns, devices, loading };
};
