import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useIoTDevicesStore } from "../../../store/iotDevices";
import { getIoTDeviceById } from "../../../services/IoTDevicesService";
import { getEquipments } from "../../../services/equipmentsService";
import type { FormField as FormFieldType } from "../../../components/form/formTypes";
import type { IoTDevice } from "../../../types/IoTDevice";

const IoTDevicesEdit: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { editDevice } = useIoTDevicesStore();
  const [loading, setLoading] = useState(false);
  const [loadingOptions, setLoadingOptions] = useState(true);
  const [equipments, setEquipments] = useState<{ value: number; label: string }[]>([]);
  const [formValues, setFormValues] = useState<Partial<IoTDevice>>({
    name: "",
    deveui: "", // ✅ Agora é tratado como "deveui" no front
    equipement: null,
  });

  const fields: FormFieldType[] = [
    {
      name: "name",
      label: "Nome do Dispositivo",
      type: "input",
      required: true,
      placeholder: "Digite o nome do dispositivo",
    },
    {
      name: "deveui",
      label: "DevEUI", // ✅ Substitui "Tipo do Dispositivo"
      type: "input",
      required: true,
      placeholder: "Digite o DevEUI do dispositivo",
    },
    {
      name: "equipement",
      label: "Equipamento Vinculado (Opcional)",
      type: "select",
      options: equipments,
      disabled: loadingOptions || equipments.length === 0,
      placeholder: equipments.length > 0 ? "Selecione um equipamento" : "Carregando opções...",
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      if (!id || isNaN(Number(id))) {
        message.error("ID inválido para edição.");
        return;
      }

      setLoading(true);
      try {
        const deviceData = await getIoTDeviceById(Number(id));

        setFormValues({
          name: deviceData.name ?? "",
          deveui: deviceData.type_device ?? "", // ✅ Pegamos `type_device` da API e usamos como `deveui`
          equipement: deviceData.equipement ?? null,
        });

        const equipmentList = await getEquipments();
        setEquipments(
          equipmentList.map((eq: { id: number; name: string }) => ({
            value: eq.id,
            label: eq.name,
          }))
        );
      } catch (error) {
        message.error("Erro ao carregar os dados do dispositivo IoT.");
        console.error("Erro ao buscar dispositivo:", error);
      } finally {
        setLoading(false);
        setLoadingOptions(false);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (name: string, value: any) => {
    setFormValues((prevValues) => ({ ...prevValues, [name]: value }));
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

    setLoading(true);
    try {
      await editDevice(Number(id), {
        name: formValues.name,
        type_device: formValues.deveui, // ✅ Agora o DevEUI é enviado como `type_device`
        equipement: formValues.equipement !== null ? Number(formValues.equipement) : null,
      });

      message.success("Dispositivo atualizado com sucesso!");
      navigate("/iotdevices");
    } catch (error) {
      message.error("Erro ao atualizar dispositivo IoT.");
      console.error("Erro ao atualizar dispositivo:", error);
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
            title="Editar Dispositivo IoT"
            subTitle="Altere os dados do dispositivo abaixo"
          />
          <DynamicForm
            fields={fields}
            values={formValues}
            loading={loading}
            onChange={handleChange}
            onSubmit={handleSubmit}
            onCancel={() => navigate("/iotdevices")}
          />
        </main>
      </div>
    </div>
  );
};

export default IoTDevicesEdit;