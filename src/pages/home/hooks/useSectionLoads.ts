// src/pages/home/hooks/useSectionLoads.ts
import { useEffect, useState } from "react";
import { useMonitoringSections } from "./useMonitoringSections";
import { getSectionMeasurements } from "@/services/SectionsService";
import { SectionItem } from "@/types/sections";

export interface SectionLoad {
  section: string;
  load: number;
}

export function useSectionLoads(monitoringId?: number) {
  const { monitoringSections, loading: sectionsLoading } =
    useMonitoringSections(monitoringId);
  const [data, setData] = useState<SectionLoad[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!monitoringId) {
      setData([]);
      return;
    }

    const fetchLoads = async () => {
      setLoading(true);
      try {
        const loads = await Promise.all(
          monitoringSections.map(async (section: SectionItem) => {
            const measurements = await getSectionMeasurements(section.id);
            const total = measurements.reduce(
              (sum, m) => sum + (m.energia_ativa_kWh || 0),
              0
            );
            return { section: section.name, load: total };
          })
        );
        setData(loads);
      } catch (error) {
        console.error("Erro ao buscar carga por seção:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchLoads();
  }, [monitoringSections, monitoringId]);

  return { data, loading: loading || sectionsLoading };
}
