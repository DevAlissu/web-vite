import { SectionItem } from "@/types/sections";
import { ColumnsType } from "antd/es/table";
import Actions from "@/components/actions/Actions"; // <-- Import corrigido

type Handlers = {
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  onConfigure: (section: SectionItem) => void;
};

export const columnsWithActions = (
  baseColumns: ColumnsType<SectionItem>,
  { onEdit, onDelete, onConfigure }: Handlers
): ColumnsType<SectionItem> => {
  return [
    ...baseColumns,
    {
      title: "Ações",
      key: "actions",
      render: (_: unknown, record: SectionItem) => (
        <Actions
          onEdit={() => onEdit(record.id)}
          onDelete={() => onDelete(record.id)}
          onConfigure={() => onConfigure(record)}
        />
      ),
    },
  ];
};