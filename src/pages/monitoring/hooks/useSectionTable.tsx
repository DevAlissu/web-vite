import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSectionStore } from "@/store/sectionStore"; // Certifique-se que o caminho está correto
import { message } from "antd";
import { SectionItem } from "@/types/sectionTypes"; // Tipagem dos itens das seções
import Actions from "@/components/actions/Actions";

export const useSectionTable = () => {
  const navigate = useNavigate();
  const { sections, fetchSections, deleteSection } = useSectionStore();
  const [loading, setLoading] = useState(true);

  // Carrega as seções ao montar o componente
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await fetchSections(); // Chama a função fetchSections para buscar os dados
      } catch (error) {
        message.error("Erro ao carregar seções.");
      } finally {
        setLoading(false);
      }
    };

    fetchData(); // Chama fetchData ao montar o componente
  }, [fetchSections]); // Dependência de fetchSections

  // Definindo as colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: SectionItem, b: SectionItem) => a.name.localeCompare(b.name), // Ordenação de nome
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
          onEdit={() => navigate(`/monitoring/configure/${record.monitoring}/edit-section/${record.id}`)} // Navega para editar a seção
          onDelete={async () => {
            if (record.id) {
              try {
                await deleteSection(record.id); // Exclui a seção
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

  return { columns, sections, loading }; // Retorna as colunas, seções e o status de carregamento
};