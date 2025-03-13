export interface SectionItem {
  id: number;
  name: string;
  description: string | null;
  estimated_consumption: number;
  power: number | null;
  tension: number | null;
  min_consumption: number;
  max_consumption: number;
  monitoring: number | null; // Relacionamento com monitoramento
  productionLine: number | null; // Caso esteja associado a uma linha de produção
  parentId?: number; // Seção pai (Setor → Linha → Equipamento)
  children?: SectionItem[]; // Subsessoes (Linhas e Equipamentos de um Setor)
  isMonitored?: boolean; // Seção está sendo monitorada?
  devices?: number[]; // IDs dos dispositivos IoT
  type: "sector" | "productionLine" | "equipment"; // Define o tipo da seção
}