import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../components/form/DynamicForm";
import { useLojaStore } from "../../store/useLojaStore";

const LojaProductsRegister: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct } = useLojaStore();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<{
    name: string;
    description: string;
    price: number;
    quantity: number;
    image: File | null;
  }>({
    name: "",
    description: "",
    price: 0,
    quantity: 0,
    image: null,
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim() || !formValues.description.trim()) {
      message.error("Campos obrigatórios precisam ser preenchidos!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, val]) => {
        if (val !== null)
          formData.append(key, val instanceof File ? val : String(val));
      });
      await createProduct(formData);
      message.success("Produto cadastrado!");
      navigate("/loja");
    } catch (error) {
      message.error("Erro ao cadastrar produto!");
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
            title="Cadastro de Produto"
            subTitle="Cadastre um novo produto"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              {
                name: "description",
                label: "Descrição",
                type: "textarea",
                required: true,
              },
              { name: "price", label: "Preço", type: "number", required: true },
              {
                name: "quantity",
                label: "Quantidade",
                type: "number",
                required: true,
              },
              { name: "image", label: "Imagem", type: "upload" },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/loja")}
          />
        </main>
      </div>
    </div>
  );
};

export default LojaProductsRegister;
