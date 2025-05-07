import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../components/form/DynamicForm";
import { useLojaStore } from "../../store/useLojaStore";

const LojaProductsEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchProductById, editProduct } = useLojaStore();
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

  useEffect(() => {
    const loadProduct = async () => {
      setLoading(true);
      try {
        const data = await fetchProductById(Number(id));
        setFormValues({
          name: data.name,
          description: data.description,
          price: data.price,
          quantity: data.quantity,
          image: null, // Corrigido: não atribuir diretamente a string
        });
      } catch (error) {
        message.error("Erro ao carregar produto!");
      } finally {
        setLoading(false);
      }
    };
    if (id) loadProduct();
  }, [id, fetchProductById]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome do produto é obrigatório!");
      return;
    }
    setLoading(true);
    try {
      const formData = new FormData();
      Object.entries(formValues).forEach(([key, val]) => {
        if (val !== null)
          formData.append(key, val instanceof File ? val : String(val));
      });
      await editProduct(Number(id), formData);
      message.success("Produto atualizado!");
      navigate("/loja");
    } catch (error) {
      message.error("Erro ao atualizar produto!");
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
            title="Editar Produto"
            subTitle="Edite os dados do produto"
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

export default LojaProductsEdit;
