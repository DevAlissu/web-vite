import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useSectionsTable } from "./hooks/useSectionsTable";

const Sections: React.FC = () => {
  const navigate = useNavigate();
  const { columns, sections, loading } = useSectionsTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho 
            title="Seções" 
            subTitle="Lista de seções cadastradas" 
          />

          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/sections/register")}
            >
              Cadastrar Seção
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          <section className="table-container">
            <CustomTable columns={columns} data={sections} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Sections;