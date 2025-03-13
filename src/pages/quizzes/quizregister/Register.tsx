import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message, Card, Input, Checkbox, Button } from "antd";
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
    alternatives: [
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
      { text: "", correct: false },
    ],
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleAlternativeChange = (index: number, field: string, value: any) => {
    setFormValues((prev) => {
      const updatedAlternatives = [...prev.alternatives];
      updatedAlternatives[index] = { ...updatedAlternatives[index], [field]: value };
      return { ...prev, alternatives: updatedAlternatives };
    });
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.description.trim()) {
      message.error("Todos os campos são obrigatórios!");
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
        <main className="content">
          <ItemHeaderCabecalho title="Cadastro de Quiz" subTitle="Preencha os campos abaixo para cadastrar um Quiz" />

          <Card>
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

            <label>Alternativas</label>
            {formValues.alternatives.map((alt, index) => (
              <div key={index} style={{ display: "flex", alignItems: "center", marginBottom: 8 }}>
                <Input 
                  placeholder={`Alternativa ${String.fromCharCode(65 + index)}`}
                  value={alt.text}
                  onChange={(e) => handleAlternativeChange(index, "text", e.target.value)}
                  style={{ marginRight: 8 }}
                />
                <Checkbox
                  checked={alt.correct}
                  onChange={(e) => handleAlternativeChange(index, "correct", e.target.checked)}
                >
                  Correta
                </Checkbox>
              </div>
            ))}

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
