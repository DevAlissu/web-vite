import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useSectionsStore } from "../../../store/sections";
import Actions from "../../../components/actions/Actions";
import { SectionItem } from "../../../types/sections";

export const useSectionsTable = () => {
  const navigate = useNavigate();
  const { sections, fetchSections, removeSection } = useSectionsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchSections();
      } catch (error) {
        console.error("Erro ao buscar seções:", error);
        message.error("Erro ao carregar seções!");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: SectionItem, b: SectionItem) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"] as SortOrder[],
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
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: SectionItem) => (
        <Actions
          onEdit={() => navigate(`/sections/edit/${record.id}`)}
          onDelete={async () => {
            if (record.id) {
              await removeSection(record.id);
              await fetchSections();
            }
          }}
        />
      ),
    },
  ];

  return { columns, sections, loading };
};