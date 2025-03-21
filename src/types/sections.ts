export interface SectionItem {
  id: number;
  name: string;
  description: string | null;
  is_monitored: boolean;
  monitoring: number | null;

  // Associações
  setor: number | null;
  productionLine: number | null;
  equipament: number | null;
  DeviceIot: number | null;

  // Tipo da seção (1 = setor, 2 = linha, 3 = equipamento)
  type_section: number | null;

  // Referência à seção pai
  secticon_parent: number | null;

  // Sub-seções aninhadas
  sections_filhas?: SectionItem[];

  // Campos adicionais
  estimated_consumption?: number;
  power?: number | null;
  tension?: number | null;
  min_consumption?: number | null;
  max_consumption?: number | null;

  // Tipo literal opcional para renderização
  type?: "sector" | "productionLine" | "equipment";
}