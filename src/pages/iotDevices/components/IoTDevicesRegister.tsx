// src/pages/iotDevices/components/IoTDevicesRegister.tsx

import React from "react";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useIoTDeviceForm } from "../hooks/useIoTDeviceForm";

const IoTDevicesRegister: React.FC = () => {
  const navigate = useNavigate();
  const {
    formValues,
    equipmentsOptions,
    loadingOptions,
    loadingSubmit,
    handleChange,
    handleSubmitCreate,
  } = useIoTDeviceForm("create");

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
              {
                name: "name",
                label: "Nome do Dispositivo",
                type: "input",
                required: true,
              },
              {
                name: "devEui",
                label: "DevEUI",
                type: "input",
                required: true,
              },
              {
                name: "type_device",
                label: "Tipo de Dispositivo",
                type: "select",
                options: [
                  { value: "Nansenic", label: "NANSENic" },
                  { value: "Nansenson", label: "NANSENsensor" },
                ],
                required: true,
              },
              {
                name: "equipement",
                label: "Equipamento Vinculado (Opcional)",
                type: "select",
                options: equipmentsOptions,
                disabled: loadingOptions,
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmitCreate}
            loading={loadingSubmit}
            onCancel={() => navigate("/iotdevices")}
          />
        </main>
      </div>
    </div>
  );
};

export default IoTDevicesRegister;
