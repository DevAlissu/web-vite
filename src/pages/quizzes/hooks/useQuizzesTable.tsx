import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useQuizStore } from "../../../store/quizzes";
import Actions from "../../../components/actions/Actions";
import { QuizItem } from "../../../types/quizzes";

export const useQuizzesTable = () => {
  const navigate = useNavigate();
  const { quizzes, fetchQuizzes, deleteQuiz } = useQuizStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchQuizzesFromAPI = async () => {
      try {
        setLoading(true);
        await fetchQuizzes();
      } catch (error) {
        console.error("Erro ao buscar quizzes:", error);
        message.error("Erro ao carregar os quizzes!");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzesFromAPI();
  }, []);

  // Definição das colunas da tabela
  const columns = [
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: QuizItem, b: QuizItem) => a.name.localeCompare(b.name),
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
      title: "Hora de Início",
      dataIndex: "hour_start",
      key: "hour_start",
      render: (text: string | undefined) => <span>{text ?? "Não informado"}</span>,
    },
    {
      title: "Hora de Fim",
      dataIndex: "hour_end",
      key: "hour_end",
      render: (text: string | undefined) => <span>{text ?? "Não informado"}</span>,
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: QuizItem) => (
        <Actions
          onView={() => message.info(`Visualizando: ${record.name}`)}
          onEdit={() => navigate(`/quizzes/edit/${record.id}`)}
          onDelete={async () => {
            try {
              await deleteQuiz(record.id);
              message.success("Quiz excluído com sucesso!");
            } catch (error) {
              message.error("Erro ao excluir quiz.");
            }
          }}
        />
      ),
    },
  ];

  return { columns, quizzes, loading, fetchQuizzes };
};