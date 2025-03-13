export interface SectionItem {
  id: number;
  name: string;
  description: string;
  estimated_consumption: number;
  is_monitored: boolean;
  monitoring: number;
  setor: number | null;
  productionLine: number | null;
  Equipament: number | null;
  DeviceIot: number | null;
  type_section: string | null;
  subSections?: SectionItem[];  
}