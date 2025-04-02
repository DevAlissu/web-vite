import { FC } from "react";
import { Tree, Collapse, Button, Popconfirm, Badge } from "antd";
import { SettingOutlined, DeleteOutlined } from "@ant-design/icons";
import { SectionItem } from "@/types/sections";

type Props = {
  section: SectionItem;
  allSections: SectionItem[];
  onConfigure: (section: SectionItem) => void;
  onDelete: (sectionId: number) => void;
};

// 🔍 Verifica recursivamente se a seção ou alguma de suas filhas tem DeviceIot
const hasIotDeviceRecursive = (section: SectionItem, allSections: SectionItem[]): boolean => {
  if (section.DeviceIot) return true;

  const children = allSections.filter((s) => s.secticon_parent === section.id);
  return children.some((child) => hasIotDeviceRecursive(child, allSections));
};

const SectionExpandedTree: FC<Props> = ({ section, allSections, onConfigure, onDelete }) => {
  const buildTree = (parent: SectionItem): any => {
    const children = allSections.filter((s) => s.secticon_parent === parent.id);
    const hasIot = hasIotDeviceRecursive(parent, allSections);

    return {
      title: (
        <span>
          {/* LED de status se houver IoT */}
          {hasIot && <Badge status="success" style={{ marginRight: 6 }} />}
          {parent.name}
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
          children: rootChildren.length > 0 ? (
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