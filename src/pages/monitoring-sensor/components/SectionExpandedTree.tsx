import { FC } from "react";
import { Tree, Collapse, Button, Popconfirm, Badge, Tooltip } from "antd";
import {
  SettingOutlined,
  DeleteOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";
import { SectionItem } from "@/types/sections";

type Props = {
  section: SectionItem;
  allSections: SectionItem[];
  onConfigure: (section: SectionItem) => void;
  onDelete: (sectionId: number) => void;
  onMonitor: (section: SectionItem) => void;
};

// Verifica recursivamente se a seção ou alguma de suas filhas tem DeviceIot
const hasIotDeviceRecursive = (
  section: SectionItem,
  allSections: SectionItem[]
): boolean => {
  if (section.DeviceIot) return true;
  const children = allSections.filter((s) => s.secticon_parent === section.id);
  return children.some((child) => hasIotDeviceRecursive(child, allSections));
};

// Verifica se a seção tem um dispositivo IoT diretamente associado
const hasDirectIotDevice = (section: SectionItem): boolean => {
  return !!section.DeviceIot;
};

const SectionExpandedTree: FC<Props> = ({
  section,
  allSections,
  onConfigure,
  onDelete,
  onMonitor,
}) => {
  const buildTree = (parent: SectionItem): any => {
    const children = allSections.filter((s) => s.secticon_parent === parent.id);
    const hasIot = hasIotDeviceRecursive(parent, allSections);
    const hasDirectIot = hasDirectIotDevice(parent);

    return {
      title: (
        <span>
          {/* LED de status se houver IoT em qualquer nível */}
          {hasIot && <Badge status="success" style={{ marginRight: 6 }} />}
          {parent.name}

          {/* Ícone de Monitoramento, apenas se houver IoT diretamente associado */}
          {hasDirectIot && (
            <Tooltip title="Monitoramento Ativo">
              <Button
                type="text"
                icon={<ThunderboltOutlined />}
                onClick={() => onMonitor(parent)}
                style={{ marginLeft: 6, color: "#faad14" }} // Cor amarela
              />
            </Tooltip>
          )}

          <Button
            type="text"
            icon={<SettingOutlined />}
            onClick={() => onConfigure(parent)}
            style={{ marginLeft: 8 }}
          />
          <Popconfirm
            title="Deseja excluir esta subseção?"
            onConfirm={() => onDelete(parent.id)}
            okText="Sim"
            cancelText="Não"
          >
            <Button
              type="text"
              icon={<DeleteOutlined />}
              danger
              style={{ marginLeft: 4 }}
            />
          </Popconfirm>
        </span>
      ),
      key: `section-${parent.id}`,
      children: children.map(buildTree),
    };
  };

  const rootChildren = allSections
    .filter((s) => s.secticon_parent === section.id)
    .map(buildTree);

  return (
    <Collapse
      items={[
        {
          key: `panel-${section.id}`,
          label: "Subseções",
          children:
            rootChildren.length > 0 ? (
              <Tree treeData={rootChildren} />
            ) : (
              <p>Não há subseções associadas.</p>
            ),
        },
      ]}
    />
  );
};

export default SectionExpandedTree;
