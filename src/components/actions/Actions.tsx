import React from "react";
import { Button } from "antd";
import { EditOutlined, DeleteOutlined, SettingOutlined } from "@ant-design/icons";

interface ActionsProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onConfigure?: () => void;
  onSubmit?: () => void;
  onCancel?: () => void;
}

const Actions: React.FC<ActionsProps> = ({ onEdit, onDelete, onConfigure, onSubmit, onCancel }) => {
  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}>
      {onEdit && (
        <Button type="primary" icon={<EditOutlined />} className="primary-btn" onClick={onEdit}>
          Editar
        </Button>
      )}
      {onConfigure && (
        <Button type="default" icon={<SettingOutlined />} className="default-btn" onClick={onConfigure}>
          Configurar
        </Button>
      )}
      {onDelete && (
        <Button type="primary" icon={<DeleteOutlined />} className="danger-btn" onClick={onDelete} danger>
          Excluir
        </Button>
      )}
      {onSubmit && (
        <Button type="primary" className="primary-btn" onClick={onSubmit}>
          Enviar
        </Button>
      )}
      {onCancel && (
        <Button type="primary" danger onClick={onCancel}>
          Cancelar
        </Button>
      )}
    </div>
  );
};

export default Actions;