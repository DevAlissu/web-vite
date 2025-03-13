import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useSectorsStore } from "../../../store/sectors";
import Actions from "../../../components/actions/Actions";
import { Sector } from "../../../types/sectors";

export const useSectorsTable = () => {
  const navigate = useNavigate();
  const { sectors, fetchSectors, deleteSector } = useSectorsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSectorsFromAPI = async () => {
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

    fetchSectorsFromAPI();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: Sector, b: Sector) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text: string | undefined) => <strong>{text ?? "Sem nome"}</strong>,
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text: string | undefined) => <span>{text ?? "Sem descrição"}</span>,
    },
    {
      title: "Consumo Estimado",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
      render: (text: number | undefined) => <span>{text ? `${text} kWh` : "0 kWh"}</span>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: Sector) => (
        <Actions
          onEdit={() => navigate(`/sectors/edit/${record.id}`)} // ✅ Direciona para edição do setor
          onDelete={async () => {
            if (record.id) {
              await deleteSector(Number(record.id));
              await fetchSectors(); // ✅ Atualiza a tabela após a exclusão
            }
          }}
        />
      ),
    },
  ];

  return { columns, sectors, loading };
};