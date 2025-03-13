import React from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useIoTDevicesStore } from "@/store/iotDevices";

const IoTDevicesList: React.FC = () => {
  const navigate = useNavigate();
  const { devices, fetchDevices, removeDevice } = useIoTDevicesStore();

  const handleDelete = async (id: number) => {
    try {
      await removeDevice(id);
      message.success("Dispositivo removido com sucesso!");
      fetchDevices(); // Atualiza a lista após exclusão
    } catch (error) {
      console.error("Erro ao remover dispositivo:", error);
      message.error("Erro ao remover dispositivo.");
    }
  };

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text || "Sem nome"}</strong>,
    },
    {
      title: "Tipo de Dispositivo",
      dataIndex: "type_device",
      key: "type_device",
      render: (text: string) => text || "Não informado",
    },
    {
      title: "Equipamento Associado",
      dataIndex: "equipement",
      key: "equipement",
      render: (equipement: number | null) => equipement || "Nenhum",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
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
            onClick={() => handleDelete(record.id)}
          >
            Excluir
          </Button>
        </div>
      ),
    },
  ];

  return <Table dataSource={devices} columns={columns} rowKey="id" pagination={{ pageSize: 5 }} />;
};

export default IoTDevicesList;