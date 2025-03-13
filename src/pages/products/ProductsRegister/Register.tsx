import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import { useProductsStore } from "../../../store/products";
import DynamicForm from "../../../components/form/DynamicForm";
import type { FormField } from "../../../components/form/formTypes";

const ProductsRegister: React.FC = () => {
  const navigate = useNavigate();
  const { createProduct } = useProductsStore();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({
    name: "",
    description: "",
    photo: null,
  });

  // Configuração dos campos do formulário
  const formFields: FormField[] = [
    { name: "name", label: "Nome do Produto", type: "input", required: true },
    { name: "description", label: "Descrição", type: "textarea", required: true },
    { name: "photo", label: "Imagem do Produto", type: "upload", required: false },
  ];

  // Atualiza valores do formulário
  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  // Envia os dados para a API
  const handleSubmit = async () => {
    if (!values.name || !values.description) {
      message.error("Preencha os campos obrigatórios!");
      return;
    }
  
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
  
      if (values.photo instanceof File) {
        formData.append("photo", values.photo);
      }
  
      await createProduct(formData);
  
      
      if (!loading) {
        message.success("Produto cadastrado com sucesso!");
      }
  
      navigate("/products");
    } catch (error) {
      message.error("Erro ao cadastrar produto!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  
  const handleCancel = () => {
    navigate("/products");
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Cadastro de Produtos"
            subTitle="Preencha os campos abaixo para cadastrar um produto"
          />

          {/* 🔹 Passando `onCancel` corretamente */}
          <DynamicForm
            fields={formFields}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductsRegister;