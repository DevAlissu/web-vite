import React from "react";
import { Form, Input } from "antd";
import FormField from "./FormField";
import type { FormField as FormFieldType } from "./formTypes";
import Actions from "../actions/Actions";

interface DynamicFormProps {
  fields: FormFieldType[];
  values: Record<string, any>;
  loading?: boolean;
  onChange: (name: string, value: any) => void;
  onSubmit?: () => void; // Agora opcional
  onCancel?: () => void;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  values,
  onChange,
  onSubmit,
  onCancel,
}) => {
  return (
    <Form layout="vertical" className="dynamic-form">
      {fields.map((field) => {
        if (field.type === "readonly") {
          return (
            <Form.Item key={field.name} label={field.label}>
              <Input
                value={values[field.name]}
                readOnly
                style={{
                  backgroundColor: "#f5f5f5",
                  color: "#000",
                  cursor: "not-allowed",
                }}
              />
            </Form.Item>
          );
        }

        return (
          <FormField
            key={field.name}
            field={field}
            value={values[field.name]}
            onChange={onChange}
          />
        );
      })}

      {(onSubmit || onCancel) && (
        <div className="form-actions">
          <Actions onSubmit={onSubmit} onCancel={onCancel} />
        </div>
      )}
    </Form>
  );
};

export default DynamicForm;