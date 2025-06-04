// src/pages/energyBilling/EnergyBillingList.tsx
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  PlusOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Popconfirm, message } from "antd";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../layout/Header/components/ItemHeaderCabecalho";
import CustomTable from "../../components/Table/Table";
import { useEnergyBillingStore } from "../../store/energyBillingStore";

const EnergyBillingList: React.FC = () => {
  const navigate = useNavigate();
  const { billings, fetchBillings, deleteBilling, loading } =
    useEnergyBillingStore();

  useEffect(() => {
    fetchBillings();
  }, [fetchBillings]);

  const handleDelete = (id: number) => {
    deleteBilling(id);
    message.success("Registro excluído");
  };

  const columns = [
    {
      title: "Ano/Mês",
      dataIndex: "month",
      key: "month",
      render: (_: any, record: any) => `${record.year} / ${record.month}`,
      sorter: (a: any, b: any) =>
        a.year !== b.year ? a.year - b.year : a.month.localeCompare(b.month),
    },
    {
      title: "Consumo Total (kWh)",
      dataIndex: "totalConsumed",
      key: "totalConsumed",
      render: (value: number) => `${value.toLocaleString()} kWh`,
      sorter: (a: any, b: any) =>
        (a.totalConsumed || 0) - (b.totalConsumed || 0),
    },
    {
      title: "Custo Total (R$)",
      dataIndex: "totalCost",
      key: "totalCost",
      render: (value: number) =>
        `R$ ${value.toLocaleString(undefined, { minimumFractionDigits: 2 })}`,
      sorter: (a: any, b: any) => (a.totalCost || 0) - (b.totalCost || 0),
    },
    {
      title: "Pegada de Carbono (kg CO₂)",
      dataIndex: "totalCarbonFootprint",
      key: "totalCarbonFootprint",
      render: (value: number) =>
        `${value.toLocaleString(undefined, {
          minimumFractionDigits: 2,
        })} kg CO₂`,
      sorter: (a: any, b: any) =>
        (a.totalCarbonFootprint || 0) - (b.totalCarbonFootprint || 0),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/energy-billing/view/${record.id}`)}
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/energy-billing/edit/${record.id}`)}
          >
            Editar
          </Button>
          <Popconfirm
            title="Deseja excluir este item?"
            onConfirm={() => handleDelete(record.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button icon={<DeleteOutlined />} danger>
              Excluir
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho title="Lista de Faturamento" />
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              marginBottom: 20,
            }}
          >
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={() => navigate("/energy-billing/new")}
            >
              Adicionar Novo Mês
            </Button>
          </div>
          <CustomTable
            columns={columns}
            data={billings}
            loading={loading}
            rowKey="id"
          />
        </main>
      </div>
    </div>
  );
};

export default EnergyBillingList;
