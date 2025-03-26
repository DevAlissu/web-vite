// src/pages/monitoring/components/MonitoringEdit.tsx

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useMonitoring } from "../hooks/useMonitoring";

const MonitoringEdit: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { monitorings, editMonitoring } = useMonitoring();

  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState({
    name: "",
    description: "",
    estimated_consumption: "",
  });

  useEffect(() => {
    if (id) {
      const monitoring = monitorings.find((item) => item.id === Number(id));
      if (monitoring) {
        setFormValues({
          name: monitoring.name,
          description: monitoring.description,
          estimated_consumption: monitoring.estimated_consumption.toString(),
        });
      } else {
        message.error("Monitoramento não encontrado.");
        navigate("/monitoring");
      }
    }
  }, [id, monitorings]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name.trim()) {
      message.error("O nome do monitoramento é obrigatório!");
      return;
    }

    if (!formValues.description.trim()) {
      message.error("A descrição do monitoramento é obrigatória!");
      return;
    }

    setLoading(true);
    try {
      await editMonitoring(Number(id), {
        name: formValues.name,
        description: formValues.description,
        estimated_consumption: Number(formValues.estimated_consumption) || 0,
      });

      message.success("Monitoramento atualizado com sucesso!");
      navigate("/monitoring");
    } catch (error) {
      message.error("Erro ao atualizar monitoramento!");
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
            title="Editar Monitoramento de Energia"
            subTitle="Formulário para editar dados do monitoramento"
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome do Monitoramento", type: "input", required: true },
              { name: "description", label: "Descrição", type: "textarea", required: true },
              { name: "estimated_consumption", label: "Consumo Estimado (Kw/H)", type: "number" },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/monitoring")}
          />
        </main>
      </div>
    </div>
  );
};

export default MonitoringEdit;