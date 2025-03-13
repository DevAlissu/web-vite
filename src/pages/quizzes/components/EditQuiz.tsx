import React, { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useQuizStore } from "../../../store/quizzes";
import { QuizItem } from "../../../types/quizzes";

const EditQuiz: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { quizzes, updateQuiz } = useQuizStore();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<Partial<QuizItem>>({
    name: "",
    description: "",
    hour_start: "",
    hour_end: "",
  });

  // Carregar os dados do Quizz ao abrir a tela
  useEffect(() => {
    const quizToEdit = quizzes.find((quiz) => quiz.id === Number(id));
    if (quizToEdit) {
      setFormValues({
        name: quizToEdit.name,
        description: quizToEdit.description,
        hour_start: quizToEdit.hour_start,
        hour_end: quizToEdit.hour_end,
      });
    }
  }, [id, quizzes]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name?.trim()) {
      message.error("O nome do Quizz é obrigatório!");
      return;
    }

    if (!formValues.description?.trim()) {
      message.error("A descrição do Quizz é obrigatória!");
      return;
    }

    if (!formValues.hour_start || !formValues.hour_end) {
      message.error("Os horários de início e fim são obrigatórios!");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await updateQuiz(Number(id), formValues);
      message.success("Quizz atualizado com sucesso!");
      navigate("/quizzes");
    } catch (error) {
      message.error("Erro ao atualizar Quizz!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Editar Quizz"
            subTitle="Altere os campos desejados e salve as mudanças"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              { name: "description", label: "Descrição", type: "textarea", required: true },
              { name: "hour_start", label: "Hora de Início", type: "text", required: true },
              { name: "hour_end", label: "Hora de Fim", type: "text", required: true },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/quizzes")}
          />
        </main>
      </div>
    </div>
  );
};

export default EditQuiz;