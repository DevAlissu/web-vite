import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useProductionLinesStore } from "../../../store/ProductionLinesStore";
import { ProductionLine } from "../../../types/ProductionLinesTypes";
import { getProductionLineById } from "../../../services/ProductionLinesService";
import { getSectors } from "../../../services/SectorsService";

const ProductionLinesEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { updateProductionLine } = useProductionLinesStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [formValues, setFormValues] = useState<Partial<ProductionLine>>({
    name: "",
    description: "",
    value_mensuration_estimated: undefined, // 🔹 Corrigido para evitar erro de tipo
    setor: undefined, // 🔹 Corrigido para evitar erro de tipo
  });

  const [sectorsOptions, setSectorsOptions] = useState<{ value: number; label: string }[]>([]);

  // 🔹 Busca a linha de produção e os setores ao carregar a página
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        if (id) {
          const data = await getProductionLineById(Number(id));
          setFormValues({
            name: data.name,
            description: data.description,
            value_mensuration_estimated: data.value_mensuration_estimated ?? undefined, // 🔹 Garante tipo correto
            setor: data.setor ?? undefined, // 🔹 Garante tipo correto
          });
        }

        // 🔹 Carrega setores para o select
        const sectorsData = await getSectors();
        setSectorsOptions(
          sectorsData.map((sector) => ({ value: sector.id, label: sector.name }))
        );
      } catch (error) {
        message.error("Erro ao carregar os dados!");
        console.error(error);
      } finally {
        setLoading(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name?.trim()) {
      message.error("O nome da linha de produção é obrigatório!");
      return;
    }

    setLoading(true);
    try {
      await updateProductionLine(Number(id), {
        name: formValues.name,
        description: formValues.description,
        value_mensuration_estimated: formValues.value_mensuration_estimated ? Number(formValues.value_mensuration_estimated) : 0, // 🔹 Corrigido
        setor: formValues.setor ? Number(formValues.setor) : undefined, // 🔹 Corrigido
      });

      message.success("Linha de produção atualizada com sucesso!");
      navigate("/productionLines");
    } catch (error) {
      message.error("Erro ao atualizar linha de produção!");
      console.error(error);
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
            title="Editar Linha de Produção"
            subTitle="Atualize os dados da linha de produção"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              { name: "description", label: "Descrição", type: "textarea" },
              { name: "value_mensuration_estimated", label: "Valor Estimado", type: "number" },
              {
                name: "setor",
                label: "Setor",
                type: "select",
                options: sectorsOptions,
                disabled: loadingOptions, // 🔹 Desativa o select enquanto carrega
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/productionLines")}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductionLinesEdit;