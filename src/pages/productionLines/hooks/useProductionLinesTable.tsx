import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useProductionLinesStore } from "../../../store/ProductionLinesStore";
import { getSectors } from "../../../services/SectorsService"; // 🔹 Importa serviço de setores
import Actions from "../../../components/actions/Actions";
import { ProductionLine } from "../../../types/ProductionLinesTypes";

export const useProductionLinesTable = () => {
  const navigate = useNavigate();
  const { productionLines, fetchProductionLines, removeProductionLine } = useProductionLinesStore();
  const [loading, setLoading] = useState(true);
  const [sectors, setSectors] = useState<{ [key: number]: string }>({});

  useEffect(() => {
    const fetchProductionLinesFromAPI = async () => {
      try {
        setLoading(true);
        await fetchProductionLines();

        // 🔹 Buscar setores e mapear ID -> Nome
        const sectorsData = await getSectors();
        const mappedSectors: { [key: number]: string } = {};
        sectorsData.forEach((sector: any) => {
          mappedSectors[sector.id] = sector.name;
        });

        setSectors(mappedSectors);
      } catch (error) {
        console.error("Erro ao buscar linhas de produção ou setores:", error);
        message.error("Erro ao carregar os dados!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductionLinesFromAPI();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: ProductionLine, b: ProductionLine) => a.name.localeCompare(b.name),
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
      title: "Setor",
      dataIndex: "setor",
      key: "setor",
      render: (id: number | null) => <span>{id ? sectors[id] ?? "Não informado" : "Não informado"}</span>,
    },
    {
      title: "Valor Mensurado",
      dataIndex: "value_mensuration_estimated",
      key: "value_mensuration_estimated",
      render: (text: number | undefined) => <span>{text ?? "Não informado"}</span>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: ProductionLine) => (
        <Actions
          onEdit={() => navigate(`/production-lines/edit/${record.id}`)}
          onDelete={async () => {
            if (record.id) {
              await removeProductionLine(Number(record.id));
            }
          }}
        />
      ),
    },
  ];

  return { columns, productionLines, loading };
};