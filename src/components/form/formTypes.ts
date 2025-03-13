// src/components/form/formTypes.ts

// Definindo tipos permitidos para o campo 'type' do FormField
export type FormFieldType = 
  "text" | 
  "input" | 
  "select" | 
  "number" | 
  "upload" | 
  "textarea" | 
  "file" | 
  "password" | 
  "transfer" | 
  "checkbox" | 
  "switch";

// A interface que descreve o campo do formulário
export interface FormField {
  name: string; // Nome do campo
  label: string; // Rótulo do campo
  type: FormFieldType; // Tipo do campo
  options?: { value: string | number; label: string }[]; // Opções para campos do tipo 'select', 'transfer', etc
  fetchOptions?: () => Promise<{ value: string | number; label: string }[]>; // Função assíncrona para buscar as opções
  required?: boolean; // Se o campo é obrigatório
  placeholder?: string; // Texto de espaço reservado
  disabled?: boolean; // Se o campo está desabilitado
  onChange?: (value: any) => void; // Função de retorno de mudança (para atualizar o valor do campo)
  value?: string | number | boolean | null; // O valor atual do campo, pode ser qualquer um dos tipos
}

// Interface para o componente de formulário dinâmico
export interface DynamicFormProps {
  fields: FormField[]; // Lista de campos do formulário
  initialValues?: Record<string, any>; // Valores iniciais para os campos do formulário
  onSubmit: (values: Record<string, any>) => void; // Função de envio com os valores do formulário
}