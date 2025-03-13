import React, { useState, useEffect } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useIoTDevicesStore } from "../../../store/iotDevices";
import { getEquipments } from "../../../services/equipmentsService";
import type { IoTDevice } from "../../../types/IoTDevice";

const IoTDevicesRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addDevice } = useIoTDevicesStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [equipments, setEquipments] = useState<{ value: number; label: string }[]>([]);

  const [formValues, setFormValues] = useState<Partial<IoTDevice>>({
    name: "",
    deveui: "",
    equipement: null,
  });

  useEffect(() => {
    const fetchEquipments = async () => {
      try {
        const equipmentList = await getEquipments();
        setEquipments(
          equipmentList.map((eq: { id: number; name: string }) => ({
            value: eq.id,
            label: eq.name,
          }))
        );
      } catch (error) {
        message.error("Erro ao carregar equipamentos!");
        console.error(error);
      } finally {
        setLoadingOptions(false);
      }
    };

    fetchEquipments();
  }, []);

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.name?.trim()) {
      message.error("O nome do dispositivo é obrigatório!");
      return;
    }
  
    if (!formValues.deveui?.trim()) {
      message.error("O DevEUI do dispositivo é obrigatório!");
      return;
    }
  
    if (loading) return;
  
    setLoading(true);
    try {
      await addDevice({
        name: formValues.name,
        type_device: formValues.deveui, // ✅ Aqui convertemos para `type_device` para enviar à API
        equipement: formValues.equipement !== null ? Number(formValues.equipement) : null,
      });
  
      message.success("Dispositivo cadastrado com sucesso!");
      navigate("/iotdevices");
    } catch (error) {
      message.error("Erro ao cadastrar dispositivo!");
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
            title="Cadastro de Dispositivo IoT"
            subTitle="Preencha os campos abaixo para cadastrar um dispositivo IoT"
          />
          <DynamicForm
  fields={[
    { name: "name", label: "Nome do Dispositivo", type: "input", required: true },
    { name: "deveui", label: "DevEUI", type: "input", required: true }, // ✅ Exibição correta
    {
      name: "equipement",
      label: "Equipamento Vinculado (Opcional)",
      type: "select",
      options: equipments,
      disabled: loadingOptions,
    },
  ]}
  values={formValues}
  onChange={handleChange}
  onSubmit={handleSubmit}
  loading={loading}
  onCancel={() => navigate("/iotdevices")}
/>
        </main>
      </div>
    </div>
  );
};

export default IoTDevicesRegister;