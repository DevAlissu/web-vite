import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useSensor } from "../hooks/useSensor";
import { MonitoringItem } from "@/types/monitoringTypes";

const MonitoringEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { sensorMonitorings, editMonitoring } = useSensor();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    estimated_consumption: "",
  });

  useEffect(() => {
    if (id) {
      const monitoring = sensorMonitorings.find(
        (item: MonitoringItem) => item.id === Number(id)
      );
      if (monitoring) {
        setFormValues({
          name: monitoring.name,
          description: monitoring.description,
          estimated_consumption: monitoring.estimated_consumption.toString(),
        });
      } else {
        message.error("Sensor não encontrado.");
        navigate("/sensor-monitoring");
      }
    }
  }, [id, sensorMonitorings, navigate]);

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

    setLoading(true);
    try {
      await editMonitoring(Number(id), {
        name: formValues.name,
        description: formValues.description,
        estimated_consumption: Number(formValues.estimated_consumption) || 0,
      });
      message.success("Sensor atualizado com sucesso!");
      navigate("/sensor-monitoring");
    } catch (error) {
      console.error(error);
      message.error("Erro ao atualizar sensor!");
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
            title="Editar Sensor"
            subTitle="Formulário para edição de sensor no NansenSensor"
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

export default MonitoringEdit;
