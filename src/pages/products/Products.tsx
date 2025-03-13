import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useProductsTable } from "./hooks/useProductsTable";

const Products: React.FC = () => {
  const navigate = useNavigate();
  const { columns, products, loading } = useProductsTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          {/* ⬇️ Componente reutilizável para título e subtítulo */}
          <ItemHeaderCabecalho 
            title="Produtos" 
            subTitle="Lista de produtos já cadastrados" 
          />

          {/* Botões de ação */}
          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/products/register")}
            >
              Cadastrar produto
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          {/* Tabela utilizando o novo hook */}
          <section className="table-container">
            <CustomTable columns={columns} data={products} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default Products;