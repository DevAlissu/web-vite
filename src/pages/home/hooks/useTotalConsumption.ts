// src/pages/home/hooks/useTotalConsumption.ts
import { useEffect, useState } from "react";
import { useMonitoringSections } from "./useMonitoringSections";
import { getSectionMeasurements } from "@/services/SectionsService";

export interface TotalPoint {
  time: number;
  value: number; // kW
}

export function useTotalConsumption(monitoringId?: number) {
  const { monitoringSections, loading: sectionsLoading } =
    useMonitoringSections(monitoringId);
  const [data, setData] = useState<TotalPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!monitoringId) {
      setData([]);
      return;
    }

    const fetchTotal = async () => {
      setLoading(true);
      try {
        // Pegar medições de todas as seções
        const allMeasurements = await Promise.all(
          monitoringSections.map((sec) => getSectionMeasurements(sec.id))
        );
        // Achatar tudo
        const flat = allMeasurements.flat();
        // Agrupar por tempo, somando todos
        const groups: Record<number, number> = {};
        flat.forEach((m) => {
          const t = m.interval;
          groups[t] = (groups[t] || 0) + (m.energia_ativa_kWh || 0);
        });
        // Mapear para série
        const points: TotalPoint[] = Object.entries(groups).map(
          ([interval, sum]) => ({ time: Number(interval), value: sum })
        );
        // Ordenar
        points.sort((a, b) => a.time - b.time);
        setData(points);
      } catch (err) {
        console.error("Erro ao buscar consumo total:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTotal();
  }, [monitoringSections, monitoringId]);

  return { data, loading: loading || sectionsLoading };
}
