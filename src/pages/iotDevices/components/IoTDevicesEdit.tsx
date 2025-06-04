// src/pages/iotDevices/components/IoTDevicesEdit.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useIoTDeviceForm } from "../hooks/useIoTDeviceForm";

const IoTDevicesEdit: React.FC = () => {
  const navigate = useNavigate();
  const {
    formValues,
    equipmentsOptions,
    loadingOptions,
    loadingSubmit,
    handleChange,
    handleSubmitEdit,
  } = useIoTDeviceForm("edit");

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
            fields={[
              {
                name: "name",
                label: "Nome do Dispositivo",
                type: "input",
                required: true,
                placeholder: "Digite o nome do dispositivo",
              },
              {
                name: "devEui",
                label: "DevEUI",
                type: "input",
                required: true,
                placeholder: "Digite o DevEUI do dispositivo",
              },
              {
                name: "type_device",
                label: "Tipo de Dispositivo",
                type: "select",
                options: [
                  { value: "Nansenic", label: "NANSENic" },
                  { value: "Nansenson", label: "NANSENsor" },
                ],
                required: true,
              },
              {
                name: "equipement",
                label: "Equipamento Vinculado (Opcional)",
                type: "select",
                options: equipmentsOptions,
                disabled: loadingOptions,
                placeholder: equipmentsOptions.length
                  ? "Selecione um equipamento"
                  : "Carregando opções...",
              },
            ]}
            values={formValues}
            loading={loadingSubmit}
            onChange={handleChange}
            onSubmit={handleSubmitEdit}
            onCancel={() => navigate("/iotdevices")}
          />
        </main>
      </div>
    </div>
  );
};

export default IoTDevicesEdit;
