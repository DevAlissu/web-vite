import React, { useEffect, useState } from "react";
import { Table, Badge, Button, Tooltip, Popconfirm } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  EditOutlined,
  SlidersOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useMonitoringSensorStore } from "../../../store/monitoringSensorStore";
import SectionExpandedTree from "../../monitoring/components/SectionExpandedTree";
import MonitoringConfigureSectionModal from "./MonitoringConfigureSectionModal";
import ParametersMonitoringModal from "./ParametersMonitoringModal";
import { SectionItem } from "@/types/sections";
import {
  getParametersBySection,
  createParameters,
  updateParameters,
} from "@/services/parametersMonitoringService";
import { ParametersMonitoringItem } from "@/types/parametersMonitoring";

interface Props {
  monitoringId: number;
}

const SectionListSensor: React.FC<Props> = ({ monitoringId }) => {
  const navigate = useNavigate();
  const {
    sections,
    loadingSections,
    fetchSectionsForMonitoring,
    deleteSectionById,
  } = useMonitoringSensorStore();

  // Modal de configuração (IoT)
  const [sectionToConfigure, setSectionToConfigure] =
    useState<SectionItem | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal de parâmetros de controle
  const [sectionToParameters, setSectionToParameters] =
    useState<SectionItem | null>(null);
  const [isParametersModalOpen, setIsParametersModalOpen] = useState(false);
  const [loadingParameters, setLoadingParameters] = useState(false);
  const [parameters, setParameters] = useState<ParametersMonitoringItem | null>(
    null
  );

  useEffect(() => {
    if (monitoringId) fetchSectionsForMonitoring(Number(monitoringId));
  }, [fetchSectionsForMonitoring, monitoringId]);

  // Ao abrir modal de parâmetros: carrega do backend
  useEffect(() => {
    if (isParametersModalOpen && sectionToParameters) {
      setLoadingParameters(true);
      getParametersBySection(sectionToParameters.id)
        .then(setParameters)
        .finally(() => setLoadingParameters(false));
    } else {
      setParameters(null);
    }
  }, [isParametersModalOpen, sectionToParameters]);

  const handleSaveParameters = async (data: any) => {
    setLoadingParameters(true);
    try {
      if (parameters && parameters.id) {
        await updateParameters(parameters.id, data);
      } else {
        await createParameters(data);
      }
      setIsParametersModalOpen(false);
    } finally {
      setLoadingParameters(false);
    }
  };

  const mappedSections: SectionItem[] = (sections as any[]).map((s) => ({
    id: s.id,
    name: s.name ?? s.description ?? "-",
    description: s.description ?? "",
    is_monitored: s.is_monitored ?? false,
    monitoring: s.monitoring ?? monitoringId,
    device_iots: s.device_iots ?? [],
    setor: s.setor ?? null,
    productionLine: s.productionLine ?? null,
    equipament: s.equipament ?? null,
    DeviceIot: s.DeviceIot ?? null,
    type_section: s.type_section ?? null,
    secticon_parent: s.secticon_parent ?? null,
    sections_filhas: s.sections_filhas ?? [],
    estimated_consumption: s.estimated_consumption ?? undefined,
    power: s.power ?? null,
    tension: s.tension ?? null,
    min_consumption: s.min_consumption ?? null,
    max_consumption: s.max_consumption ?? null,
    type: s.type ?? undefined,
  }));

  const getDeviceIots = (section: any) =>
    Array.isArray(section.device_iots) ? section.device_iots : [];
  const hasIotDevice = (section: any) => getDeviceIots(section).length > 0;

  const renderIoTChips = (deviceIots?: any[]) =>
    deviceIots && deviceIots.length > 0
      ? deviceIots.map((d) => (
          <span
            key={d.id}
            style={{
              background: "#e6f7ff",
              color: "#1890ff",
              borderRadius: 12,
              padding: "2px 8px",
              fontSize: 12,
              marginRight: 4,
              display: "inline-block",
            }}
          >
            {d.name}
          </span>
        ))
      : "-";

  const columns = [
    {
      title: "Seção",
      dataIndex: "name",
      key: "name",
      render: (_: unknown, record: any) => (
        <span style={{ display: "flex", alignItems: "center" }}>
          {hasIotDevice(record) && (
            <Badge status="success" style={{ marginRight: 6 }} />
          )}
          {record.name || "-"}
        </span>
      ),
    },
    {
      title: "Dispositivos IoT",
      key: "device_iots",
      render: (_: unknown, record: any) =>
        renderIoTChips(getDeviceIots(record)),
    },
    {
      title: "Ações",
      key: "actions",
      width: 250,
      render: (_: any, record: any) => (
        <div style={{ display: "flex", gap: 8 }}>
          <Tooltip title="Editar">
            <Button
              type="primary"
              icon={<EditOutlined />}
              onClick={() =>
                navigate(`/sensor-monitoring/edit-section/${record.id}`)
              }
            >
              Editar
            </Button>
          </Tooltip>
          <Tooltip title="Configurar">
            <Button
              icon={<SettingOutlined />}
              onClick={() => {
                setSectionToConfigure(record);
                setIsModalOpen(true);
              }}
            >
              Configurar
            </Button>
          </Tooltip>
          <Tooltip title="Parâmetros de Controle">
            <Button
              icon={<SlidersOutlined />}
              onClick={() => {
                setSectionToParameters(record);
                setIsParametersModalOpen(true);
              }}
            />
          </Tooltip>
          <Popconfirm
            title="Deseja excluir esta seção?"
            onConfirm={async () => {
              await deleteSectionById(record.id);
              await fetchSectionsForMonitoring(Number(monitoringId));
            }}
            okText="Sim"
            cancelText="Não"
          >
            <Button danger icon={<DeleteOutlined />}>
              Excluir
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  const setoresPrincipais = mappedSections.filter((s) => !s.secticon_parent);

  return (
    <>
      <Table
        columns={columns}
        dataSource={setoresPrincipais}
        loading={loadingSections}
        rowKey="id"
        expandable={{
          expandedRowRender: (record: SectionItem) => (
            <SectionExpandedTree
              section={record}
              allSections={mappedSections}
              onConfigure={(section) => {
                setSectionToConfigure(section);
                setIsModalOpen(true);
              }}
              onDelete={async (sectionId) => {
                await deleteSectionById(sectionId);
                await fetchSectionsForMonitoring(Number(monitoringId));
              }}
              onMonitor={() => {}}
            />
          ),
        }}
        pagination={{ pageSize: 10 }}
        locale={{ emptyText: "Nenhuma seção cadastrada" }}
      />
      {/* Modal de configuração */}
      {sectionToConfigure && (
        <MonitoringConfigureSectionModal
          section={sectionToConfigure}
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
      {/* Modal de parâmetros de controle */}
      {sectionToParameters && (
        <ParametersMonitoringModal
          visible={isParametersModalOpen}
          onClose={() => setIsParametersModalOpen(false)}
          onSave={handleSaveParameters}
          loading={loadingParameters}
          parameters={parameters}
          sectionId={sectionToParameters.id}
        />
      )}
    </>
  );
};

export default SectionListSensor;
