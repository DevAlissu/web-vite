// src/pages/monitoring-sensor/components/MonitoringForm.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useSensor } from "../hooks/useSensor";

const MonitoringForm: React.FC = () => {
  const navigate = useNavigate();
  const { addMonitoring } = useSensor();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    estimated_consumption: "",
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome do sensor é obrigatório!");
      return;
    }

    if (!formValues.description.trim()) {
      message.error("A descrição do sensor é obrigatória!");
      return;
    }

    if (loading) return;
    setLoading(true);

    try {
      await addMonitoring({
        name: formValues.name,
        description: formValues.description,
        estimated_consumption: Number(formValues.estimated_consumption) || 0,
      });
      message.success("Sensor cadastrado com sucesso!");
      navigate("/sensor-monitoring");
    } catch (error) {
      console.error(error);
      message.error("Erro ao cadastrar sensor!");
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
            title="Cadastro de Sensor"
            subTitle="Formulário para cadastro de sensor no NANSENsor"
          />

          <DynamicForm
            fields={[
              {
                name: "name",
                label: "Nome do Sensor",
                type: "input",
                required: true,
              },
              {
                name: "description",
                label: "Descrição",
                type: "textarea",
                required: true,
              },
              {
                name: "estimated_consumption",
                label: "Consumo Estimado (kWh)",
                type: "number",
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/sensor-monitoring")}
          />
        </main>
      </div>
    </div>
  );
};

export default MonitoringForm;
