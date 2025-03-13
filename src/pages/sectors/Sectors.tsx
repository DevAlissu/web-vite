import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useSectorsTable } from "./hooks/useSectorsTable"; // 🔹 Hook de setores

const Sectors: React.FC = () => {
  const navigate = useNavigate();
  const { columns, sectors, loading } = useSectorsTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* Cabeçalho da página */}
          <ItemHeaderCabecalho 
            title="Setores" 
            subTitle="Lista de setores já cadastrados" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/sectors/register")}
            >
              Cadastrar Setor
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela utilizando o hook de Setores */}
          <section className="table-container">
            <CustomTable columns={columns} data={sectors} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Sectors;