import React from "react";
import { PlusOutlined, FilterOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import Button from "../../components/Button/Button";
import CustomTable from "../../components/Table/Table";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import { useIoTDevicesTable } from "./hooks/useIoTDevicesTable"; 

const IoTDevices: React.FC = () => {
  const navigate = useNavigate();
  const { columns, devices, loading } = useIoTDevicesTable();

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho 
            title="Dispositivos IoT" 
            subTitle="Lista de dispositivos IoT cadastrados" 
          />

          <section className="actions-section">
            <Button
              type="primary"
              className="primary-btn"
              icon={<PlusOutlined />}
              onClick={() => navigate("/iotdevices/register")}
            >
              Cadastrar Dispositivo
            </Button>
            <Button type="link" className="filter-btn" icon={<FilterOutlined />}>
              Filtros
            </Button>
          </section>

          <section className="table-container">
            <CustomTable columns={columns} data={devices} loading={loading} />
          </section>
        </main>
      </div>
    </div>
  );
};

export default IoTDevices;