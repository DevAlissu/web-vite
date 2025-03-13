export interface Subsection {
    id: number;
    description?: string | null;
    is_monitored: boolean;
    section: number | null;
    deviceIot?: number | null; 
  }
