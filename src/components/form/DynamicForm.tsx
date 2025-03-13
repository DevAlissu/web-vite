import React from "react";
import { Form } from "antd";
import FormField from "./FormField";
import type { FormField as FormFieldType } from "./formTypes";
import Actions from "../actions/Actions";

interface DynamicFormProps {
  fields: FormFieldType[];
  values: Record<string, any>;
  loading?: boolean;
  onChange: (name: string, value: any) => void;
  onSubmit: () => void;
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
      {fields.map((field) => (
        <FormField key={field.name} field={field} value={values[field.name]} onChange={onChange} />
      ))}

      {/* Renderiza os botões de Enviar e Cancelar dentro de Actions */}
      <div className="form-actions">
        <Actions onSubmit={onSubmit} onCancel={onCancel} />
      </div>
    </Form>
  );
};

export default DynamicForm;