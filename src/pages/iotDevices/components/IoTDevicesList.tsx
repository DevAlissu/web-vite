// src/pages/iotDevices/IoTDevicesList.tsx

import React from "react";
import { Table, Button } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import type { ColumnsType } from "antd/es/table";
import type { IoTDevice } from "@/types/IoTDevice";
import { useIoTDevicesList } from "../hooks/useIoTDevicesList";

const IoTDevicesList: React.FC = () => {
  const navigate = useNavigate();
  const { devices, loading, getEquipmentName, onDelete } = useIoTDevicesList();

  // Define colunas (contém JSX, por isso está em .tsx)
  const columns: ColumnsType<IoTDevice> = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text) => <strong>{text || "Sem nome"}</strong>,
      sorter: (a, b) => a.name.localeCompare(b.name || ""),
      sortDirections: ["ascend", "descend"],
    },
    {
      title: "DevEUI",
      dataIndex: "devEui",
      key: "devEui",
      render: (text) => text || "Não informado",
    },
    {
      title: "Tipo de Dispositivo",
      dataIndex: "type_device",
      key: "type_device",
      render: (text) =>
        text === "Nansenic"
          ? "NANSENic"
          : text === "Nansenson"
          ? "NANSENsensor"
          : "Não informado",
      filters: [
        { text: "NANSENic", value: "Nansenic" },
        { text: "NANSENsensor", value: "Nansenson" },
      ],
      onFilter: (value, record) => record.type_device === value,
    },
    {
      title: "Equipamento Associado",
      dataIndex: "equipement",
      key: "equipement",
      render: (value) => getEquipmentName(value),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_text, record) => (
        <div className="actions">
          <Button
            type="primary"
            icon={<EditOutlined />}
            onClick={() => navigate(`/iotdevices/edit/${record.id}`)}
          >
            Editar
          </Button>
          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => void onDelete(record.id)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Table<IoTDevice>
      dataSource={devices}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default IoTDevicesList;
