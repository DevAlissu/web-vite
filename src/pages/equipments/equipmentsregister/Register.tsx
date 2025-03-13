import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useEquipamentsStore } from "../../../store/equipaments";
import { getProductionLines } from "../../../services/ProductionLinesService"; // 🔹 Nova API para buscar linhas de produção

const Register: React.FC = () => {
  const navigate = useNavigate();
  const { createEquipament } = useEquipamentsStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    power: "",
    tension: "",
    energy_consumption: "",
    max_consumption: "",
    min_consumption: "",
    production_line: null,
  });

  const [productionLinesOptions, setProductionLinesOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const productionLinesData = await getProductionLines();
        setProductionLinesOptions(
          productionLinesData.map((line) => ({ value: line.id, label: line.name }))
        );
      } catch (error) {
        message.error("Erro ao carregar linhas de produção!");
        console.error(error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchOptions();
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome do equipamento é obrigatório!");
      return;
    }

    if (!formValues.description.trim()) {
      message.error("A descrição do equipamento é obrigatória!");
      return;
    }

    if (loading) return;

    setLoading(true);
    try {
      await createEquipament({
        ...formValues,
        power: Number(formValues.power) || null,
        tension: Number(formValues.tension) || null,
        energy_consumption: Number(formValues.energy_consumption) || null,
        max_consumption: Number(formValues.max_consumption) || null,
        min_consumption: Number(formValues.min_consumption) || null,
        production_line: formValues.production_line ? Number(formValues.production_line) : null,
      });

      message.success("Equipamento cadastrado com sucesso!");
      navigate("/equipments");
    } catch (error) {
      message.error("Erro ao cadastrar equipamento!");
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
            title="Cadastro de Equipamentos"
            subTitle="Preencha os campos abaixo para cadastrar um equipamento"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              { name: "description", label: "Descrição", type: "textarea", required: true },
              { name: "power", label: "Potência (W)", type: "number" },
              { name: "tension", label: "Tensão (V)", type: "number" },
              { name: "energy_consumption", label: "Consumo de Energia (kWh)", type: "number" },
              { name: "max_consumption", label: "Consumo Máximo (kWh)", type: "number" },
              { name: "min_consumption", label: "Consumo Mínimo (kWh)", type: "number" },
              {
                name: "production_line",
                label: "Linha de Produção",
                type: "select",
                options: productionLinesOptions,
                disabled: loadingOptions,
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/equipments")}
          />
        </main>
      </div>
    </div>
  );
};

export default Register;