import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Card, Input, Radio, Button, Divider } from "antd";
import { useQuizStore } from "../../../store/quizzes";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { createQuiz } = useQuizStore();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    questions: [
      {
        text: "",
        responses: [
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
          { text: "", is_correct: false },
        ],
      },
    ],
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleQuestionChange = (index: number, field: string, value: any) => {
    setFormValues((prev) => {
      const updatedQuestions = [...prev.questions];
      updatedQuestions[index] = { ...updatedQuestions[index], [field]: value };
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleResponseChange = (qIndex: number, rIndex: number, field: string, value: any) => {
    setFormValues((prev) => {
      const  updatedQuestions = [...prev.questions];

      if (field === "is_correct" && value === true) {
        // Garante que apenas um radio button será marcado como correto
        updatedQuestions[qIndex].responses = updatedQuestions[qIndex].responses.map((resp, i) => ({
          ...resp,
          is_correct: i === rIndex, // Apenas o item clicado será verdadeiro
        }));
      } else {
        updatedQuestions[qIndex].responses[rIndex] = {
          ...updatedQuestions[qIndex].responses[rIndex],
          [field]: value,
        };
      }

      return { ...prev, questions: updatedQuestions };
    });
  };

  const addQuestion = () => {
    setFormValues((prev) => ({
      ...prev,
      questions: [
        ...prev.questions,
        {
          text: "",
          responses: [
            { text: "", is_correct: false },
            { text: "", is_correct: false },
            { text: "", is_correct: false },
            { text: "", is_correct: false },
          ],
        },
      ],
    }));
  };

  // Função para remover uma pergunta
  const removeQuestion = (index: number) => {
    setFormValues((prev) => {
      const updatedQuestions = prev.questions.filter((_, i) => i !== index);
      return { ...prev, questions: updatedQuestions };
    });
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.description.trim()) {
      message.error("Todos os campos são obrigatórios!");
      return;
    }

    if (formValues.questions.some(q => !q.text.trim() || q.responses.some(r => !r.text.trim()))) {
      message.error("Preencha todas as perguntas e respostas!");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      await createQuiz(formValues);
      message.success("Quiz cadastrado com sucesso!");
      navigate("/quizzes");
    } catch (error) {
      message.error("Erro ao cadastrar quiz!");
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
        <main className="content" style={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
          <ItemHeaderCabecalho title="Cadastro de Quiz" subTitle="Preencha os campos abaixo para cadastrar um Quiz" />

          <Card style={{ minWidth: "100%" }}>
            <label>Nome do Quiz</label>
            <Input
              placeholder="Digite o nome do quiz"
              value={formValues.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />

            <label>Descrição</label>
            <Input.TextArea
              placeholder="Digite a descrição"
              value={formValues.description}
              onChange={(e) => handleChange("description", e.target.value)}
            />

            <label>Perguntas</label>
            {formValues.questions.map((question, qIndex) => (
              <div key={qIndex} style={{ marginBottom: 16 }}>
                {qIndex > 0 && <Divider dashed />}
                <hr />
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <h3>Pergunta {qIndex + 1}</h3>
                  <Button
                    type="link"
                    danger
                    onClick={() => removeQuestion(qIndex)}
                  >
                    Excluir Pergunta
                  </Button>
                </div>
                <Input
                  placeholder={`Pergunta ${qIndex + 1}`}
                  value={question.text}
                  onChange={(e) => handleQuestionChange(qIndex, "text", e.target.value)}
                  style={{ marginBottom: 8, width: '100%' }} // Input da pergunta com largura total
                />

                <label style={{ display: "block", minWidth: "100%" }}>Alternativas</label>
                <Radio.Group
                  value={question.responses.findIndex((resp) => resp.is_correct)}
                  onChange={(e) => handleResponseChange(qIndex, e.target.value, "is_correct", true)}
                  style={{ width: '100%' }}
                >
                  {question.responses.map((resp, rIndex) => (
                    <div
                      key={rIndex}
                      style={{
                        minWidth: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '10px',
                        marginBottom: 8,
                        borderBottom: '1px solid #FFF',
                      }}
                    >
                      <Input
                        placeholder={`Alternativa ${String.fromCharCode(65 + rIndex)}`}
                        value={resp.text}
                        onChange={(e) => handleResponseChange(qIndex, rIndex, "text", e.target.value)}
                        style={{ marginRight: 8, flex: 1, width: '100%' }} // Input da resposta com largura total
                      />
                      <Radio value={rIndex}>Correta</Radio>
                    </div>
                  ))}
                </Radio.Group>
              </div>
            ))}

            <Button type="dashed" onClick={addQuestion} style={{ marginTop: 8 }}>
              Adicionar Pergunta
            </Button>

            <div style={{ marginTop: 16 }}>
              <Button type="primary" onClick={handleSubmit} loading={loading}>Cadastrar</Button>
              <Button style={{ marginLeft: 8 }} onClick={() => navigate("/quizzes")}>Cancelar</Button>
            </div>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Register;