import React from "react";
import { PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useLojaProductsTable } from "./hooks/useLojaProductsTable";

const LojaProductsPage: React.FC = () => {
  const navigate = useNavigate();
  const { columns, products, loading } = useLojaProductsTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Produtos Loja"
            subTitle="Listagem dos produtos da loja"
          />
          <Button
            icon={<PlusOutlined />}
            onClick={() => navigate("/loja/register")}
          >
            Novo Produto
          </Button>
          <CustomTable columns={columns} data={products} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default LojaProductsPage;
