import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSectionStore } from "@/store/sectionStore";
import { message } from "antd";
import { SectionItem } from "@/types/sections";
import Actions from "@/components/actions/Actions";

export const useSectionTable = () => {
  const navigate = useNavigate();
  const { sections, fetchSections, deleteSection } = useSectionStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchSections();
      } catch (error) {
        message.error("Erro ao carregar seções.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fetchSections]);

  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: SectionItem, b: SectionItem) => a.name.localeCompare(b.name),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Consumo Estimado (kWh)",
      dataIndex: "estimated_consumption",
      key: "estimated_consumption",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: SectionItem) => (
        <Actions
          onEdit={() =>
            navigate(`/monitoring/configure/${record.monitoring}/edit-section/${record.id}`)
          }
          onDelete={async () => {
            if (record.id) {
              try {
                await deleteSection(record.id);
                message.success("Seção excluída.");
              } catch (error) {
                message.error("Erro ao excluir a seção.");
              }
            }
          }}
        />
      ),
    },
  ];

  return { columns, sections, loading };
};