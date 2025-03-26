import React, { useState } from "react";
import { Input, Select, Upload, Form, Button, InputNumber, Switch } from "antd";
import {
  UploadOutlined,
  ThunderboltOutlined,
  PoweroffOutlined,
  BulbOutlined,
} from "@ant-design/icons";
import type { FormField } from "./formTypes";
import { RcFile } from "antd/lib/upload";

interface FormFieldProps {
  field: FormField;
  value?: string | number | boolean | RcFile | undefined;
  onChange: (name: string, value: string | number | boolean | RcFile | null) => void;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange }) => {
  const [error, setError] = useState<string | null>(null);

  const validateNumber = (name: string, val: any) => {
    if (val === "" || val === null) {
      setError(null);
      onChange(name, val);
      return;
    }
    if (isNaN(val)) {
      setError("Deve ser um número");
    } else {
      setError(null);
      onChange(name, val);
    }
  };

  const getIcon = () => {
    switch (field.name) {
      case "power":
        return <ThunderboltOutlined />;
      case "tension":
        return <PoweroffOutlined />;
      case "energy_consumption":
        return <BulbOutlined />;
      default:
        return null;
    }
  };

  const renderField = () => {
    switch (field.type) {
      case "input":
        return (
          <Input
            placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            style={{ width: "100%", height: "40px", padding: "4px 11px" }}
          />
        );

      case "readonly":
        return (
          <Input
            value={value as string}
            readOnly
            style={{
              width: "100%",
              padding: "8px",
              border: "1px solid #d9d9d9",
              borderRadius: "4px",
              backgroundColor: "#f5f5f5",
              color: "#000",
              cursor: "not-allowed",
            }}
          />
        );

      case "password":
        return (
          <Input.Password
            placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            style={{
              width: "100%",
              height: "40px",
              padding: "4px 11px",
              lineHeight: "normal",
              borderRadius: "6px",
            }}
          />
        );

      case "number":
        return (
          <Form.Item validateStatus={error ? "error" : ""} help={error}>
            <InputNumber
              placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
              value={value as number}
              onChange={(val) => validateNumber(field.name, val)}
              style={{ width: "100%" }}
              addonBefore={getIcon()}
            />
          </Form.Item>
        );

      case "textarea":
        return (
          <Input.TextArea
            placeholder={field.placeholder || `Digite ${field.label.toLowerCase()}`}
            value={value as string}
            onChange={(e) => onChange(field.name, e.target.value)}
            rows={4}
          />
        );

      case "select":
        return (
          <Select
            placeholder={field.placeholder || "Selecione uma opção"}
            value={value as string | number | undefined}
            onChange={(val) => onChange(field.name, val)}
            style={{ width: "100%" }}
            disabled={field.disabled}
          >
            {field.options?.map((option) => (
              <Select.Option key={option.value} value={option.value}>
                {option.label}
              </Select.Option>
            ))}
          </Select>
        );

      case "upload":
        return (
          <Upload
            beforeUpload={(file: RcFile) => {
              onChange(field.name, file);
              return false;
            }}
            showUploadList={true}
            maxCount={1}
            accept=".png, .jpg, .jpeg"
          >
            <Button type="primary" icon={<UploadOutlined />}>
              Upload da Imagem
            </Button>
          </Upload>
        );

      case "switch":
        return (
          <Switch
            checked={value as boolean}
            onChange={(val) => onChange(field.name, val)}
          />
        );

      default:
        return null;
    }
  };

  return (
    <Form.Item label={field.label} required={field.required}>
      {renderField()}
    </Form.Item>
  );
};

export default FormField;