import React from "react";
import { Button, Tooltip, Popconfirm } from "antd";
import {
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";

interface ActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onConfigure?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const Actions: React.FC<ActionsProps> = ({
  onView,
  onEdit,
  onDelete,
  onConfigure,
  onSubmit,
  onCancel,
}) => {
  return (
    <div
      style={{
        display: "flex",
        gap: "10px",
        justifyContent: "flex-end",
        marginTop: "20px",
      }}
    >
      {onView && (
        <Tooltip title="Visualizar">
          <Button icon={<EyeOutlined />} className="default-btn" onClick={onView} />
        </Tooltip>
      )}
      {onEdit && (
        <Tooltip title="Editar">
          <Button
            type="primary"
            icon={<EditOutlined />}
            className="primary-btn"
            onClick={onEdit}
          >
            Editar
          </Button>
        </Tooltip>
      )}
      {onConfigure && (
        <Tooltip title="Configurar">
          <Button
            icon={<SettingOutlined />}
            className="default-btn"
            onClick={onConfigure}
          >
            Configurar
          </Button>
        </Tooltip>
      )}
      {onDelete && (
        <Popconfirm
          title="Deseja excluir este item?"
          onConfirm={onDelete}
          okText="Sim"
          cancelText="Não"
        >
          <Tooltip title="Excluir">
            <Button
              type="primary"
              icon={<DeleteOutlined />}
              className="danger-btn"
              danger
            >
              Excluir
            </Button>
          </Tooltip>
        </Popconfirm>
      )}
      {onCancel && (
        <Button type="default" onClick={onCancel}>
          Cancelar
        </Button>
      )}
      {onSubmit && (
        <Button type="primary" className="primary-btn" onClick={onSubmit}>
          Enviar
        </Button>
      )}
    </div>
  );
};

export default Actions;