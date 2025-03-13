import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useProductionLinesStore } from "../../../store/ProductionLinesStore";
import { getSectors } from "../../../services/SectorsService";

const ProductionLinesRegister: React.FC = () => {
  const navigate = useNavigate();
  const { createProductionLine } = useProductionLinesStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [sectorsOptions, setSectorsOptions] = useState<{ value: number; label: string }[]>([]);

  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    value_mensuration_estimated: "",
    setor: null,
  });

  useEffect(() => {
    const fetchSectors = async () => {
      try {
        const sectorsData = await getSectors();
        setSectorsOptions(
          sectorsData.map((sector) => ({ value: sector.id, label: sector.name }))
        );
        setLoadingOptions(false);
      } catch (error) {
        message.error("Erro ao carregar setores. Tente novamente.");
        console.error("Erro ao buscar setores:", error);
        setLoadingOptions(false);
      }
    };

    fetchSectors();
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome da linha de produção é obrigatório!");
      return;
    }

    setLoading(true);
    try {
      await createProductionLine({
        name: formValues.name,
        description: formValues.description || "",
        value_mensuration_estimated: formValues.value_mensuration_estimated
          ? Number(formValues.value_mensuration_estimated)
          : 0,
        setor: formValues.setor ? Number(formValues.setor) : null,
      });

      message.success("Linha de produção cadastrada com sucesso!");
      navigate("/production-lines"); // 🔹 Ajustado para a URL correta
    } catch (error) {
      message.error("Erro ao cadastrar linha de produção. Verifique os dados e tente novamente.");
      console.error("Erro ao cadastrar linha de produção:", error);
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
            title="Cadastro de Linha de Produção"
            subTitle="Preencha os campos abaixo para cadastrar uma nova linha de produção"
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
                disabled: loadingOptions,
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/production-lines")}
          />
        </main>
      </div>
    </div>
  );
};

export default ProductionLinesRegister;