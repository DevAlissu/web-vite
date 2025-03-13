import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useProductionLinesTable } from "./hooks/useProductionLinesTable.tsx"; // 🔹 Hook específico para tabela

const ProductionLines: React.FC = () => {
  const navigate = useNavigate();
  const { columns, productionLines, loading } = useProductionLinesTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho 
            title="Linhas de Produção" 
            subTitle="Gerencie as linhas de produção cadastradas" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/production-lines/register")}
            >
              Cadastrar Linha de Produção
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela utilizando o hook de Linhas de Produção */}
          <section className="table-container">
            <CustomTable columns={columns} data={productionLines} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default ProductionLines;