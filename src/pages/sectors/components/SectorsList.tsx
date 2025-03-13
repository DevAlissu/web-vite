import React, { useEffect, useState } from "react";
import { Table, Button, message } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSectors } from "../../../contexts/sectors/SectorsContext";
import { useNavigate } from "react-router-dom";

const SectorsList: React.FC = () => {
  const { sectors, fetchSectors, removeSector } = useSectors(); // 🔹 Usando `removeSector` ao invés de `deleteSector`
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadSectors = async () => {
      try {
        setLoading(true);
        await fetchSectors();
      } catch (error) {
        console.error("Erro ao buscar setores:", error);
        message.error("Erro ao carregar setores!");
      } finally {
        setLoading(false);
      }
    };

    loadSectors();
  }, []);

  // Configuração das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      render: (text: string) => <strong>{text}</strong>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text: string | null) => text || "Não informado",
    },
    {
      title: "Consumo Estimado",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
      render: (value: number) => `${value} kWh`,
    },
  ];

  return (
    <Table
      dataSource={sectors}
      columns={columns}
      rowKey="id"
      loading={loading}
      pagination={{ pageSize: 5 }}
    />
  );
};

export default SectorsList;