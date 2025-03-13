import React, { useEffect } from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useQuizzesTable } from "./hooks/useQuizzesTable";

const Quizzes: React.FC = () => {
  const navigate = useNavigate();
  const { columns, quizzes, loading, fetchQuizzes } = useQuizzesTable();

  useEffect(() => {
    fetchQuizzes();
  }, []);

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho 
            title="Quizzes" 
            subTitle="Lista de quizzes já cadastrados" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/quizzes/register")}
            >
              Criar Quizz
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela utilizando o hook de Quizzes */}
          <section className="table-container">
            <CustomTable columns={columns} data={quizzes} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Quizzes;