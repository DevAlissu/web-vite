import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import { useProductsStore } from "../../../store/products";
import DynamicForm from "../../../components/form/DynamicForm";
import type { FormField } from "../../../components/form/formTypes";

const EditProducts: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Recebe o ID do produto para editar
  const { updateProduct, fetchProductById } = useProductsStore();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState<Record<string, any>>({
    name: "",
    description: "",
    photo: null,
  });

  useEffect(() => {
    if (id) {
      const loadProduct = async () => {
        setLoading(true);
        try {
          const product = await fetchProductById(Number(id));
          setValues({
            name: product.name,
            description: product.description,
            photo: product.photo || null,
          });
        } catch (error) {
          message.error("Erro ao carregar o produto!");
        } finally {
          setLoading(false);
        }
      };
      loadProduct();
    }
  }, [id]);

  const formFields: FormField[] = [
    { name: "name", label: "Nome do Produto", type: "input", required: true },
    { name: "description", label: "Descrição", type: "textarea", required: true },
    { name: "photo", label: "Imagem do Produto", type: "upload", required: false },
  ];

  const handleChange = (name: string, value: any) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };

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

      await updateProduct(Number(id), formData);
      message.success("Produto editado com sucesso!");
      navigate("/products");
    } catch (error) {
      message.error("Erro ao editar produto!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    navigate("/products"); // Redireciona para a listagem de produtos ao cancelar
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Editar Produto"
            subTitle="Atualize os dados do produto abaixo"
          />

          <DynamicForm
            fields={formFields}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={handleCancel}  // 🔹 Agora o botão de cancelar será renderizado
            loading={loading}
          />
        </main>
      </div>
    </div>
  );
};

export default EditProducts;