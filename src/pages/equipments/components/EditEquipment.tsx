import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useEquipamentsStore } from "../../../store/equipaments";
import { getProductionLines } from "../../../services/ProductionLinesService";

const EditEquipment: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { fetchEquipamentById, updateEquipament } = useEquipamentsStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [formValues, setFormValues] = useState<{
    name: string;
    description: string;
    power?: number;
    tension?: number;
    energy_consumption?: number;
    max_consumption?: number;
    min_consumption?: number;
    production_line?: number;
  }>({
    name: "",
    description: "",
    power: undefined,
    tension: undefined,
    energy_consumption: undefined,
    max_consumption: undefined,
    min_consumption: undefined,
    production_line: undefined,
  });

  const [productionLinesOptions, setProductionLinesOptions] = useState<{ value: number; label: string }[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(Number(id))) {
        message.error("ID inválido para edição.");
        return;
      }

      setLoading(true);
      try {
        const data = await fetchEquipamentById(Number(id));
        setFormValues({
          name: data.name || "",
          description: data.description || "",
          power: data.power ?? undefined,
          tension: data.tension ?? undefined,
          energy_consumption: data.energy_consumption ?? undefined,
          max_consumption: data.max_consumption ?? undefined,
          min_consumption: data.min_consumption ?? undefined,
          production_line: data.production_line ?? undefined,
        });

        const productionLinesData = await getProductionLines();
        setProductionLinesOptions(
          productionLinesData.map((line) => ({ value: line.id, label: line.name }))
        );
      } catch (error) {
        message.error("Erro ao carregar os dados do equipamento.");
        console.error("Erro ao buscar equipamento:", error);
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
    if (!formValues.name.trim()) {
      message.error("O nome do equipamento é obrigatório!");
      return;
    }

    setLoading(true);
    try {
      await updateEquipament(Number(id), {
        name: formValues.name,
        description: formValues.description,
        power: formValues.power !== undefined ? Number(formValues.power) : null,
        tension: formValues.tension !== undefined ? Number(formValues.tension) : null,
        energy_consumption: formValues.energy_consumption !== undefined ? Number(formValues.energy_consumption) : null,
        max_consumption: formValues.max_consumption !== undefined ? Number(formValues.max_consumption) : null,
        min_consumption: formValues.min_consumption !== undefined ? Number(formValues.min_consumption) : null,
        production_line: formValues.production_line !== undefined ? Number(formValues.production_line) : null,
      });

      message.success("Equipamento atualizado com sucesso!");
      navigate("/equipments");
    } catch (error) {
      message.error("Erro ao atualizar equipamento.");
      console.error("Erro ao atualizar equipamento:", error);
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
          <ItemHeaderCabecalho title="Editar Equipamento" subTitle="Atualize os dados do equipamento" />
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

export default EditEquipment;