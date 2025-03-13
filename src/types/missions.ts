export interface MissionItem {
    id: number;
    name: string;
    description: string;
    quantity_na: number | null;
    energy_meta: number | null;
    quantity_xp: number | null;
    status: string;
    date_start: string | null;
    date_end: string | null;
    monitoring: number | null; // ID do monitoramento associado
  }