import { useEffect, useState } from "react";
import { useMonitoringSections } from "./useMonitoringSections";
import { getSectionMeasurements } from "@/services/SectionsService";

export interface TrendPoint {
  time: number;
  kW: number;
}

export function useEnergyTrend(monitoringId?: number) {
  const { monitoringSections, loading: sectionsLoading } =
    useMonitoringSections(monitoringId);
  const [data, setData] = useState<TrendPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!monitoringId) {
      setData([]);
      return;
    }

    const fetchTrend = async () => {
      setLoading(true);
      try {
        // 1) busca medições de cada seção
        const allArrays = await Promise.all(
          monitoringSections.map((sec) =>
            getSectionMeasurements(sec.id)
              .then((arr) =>
                // filtra e ordena as últimas 60 medições
                arr
                  .filter(
                    (m) =>
                      typeof m.energia_ativa_kWh === "number" &&
                      !Number.isNaN(m.energia_ativa_kWh)
                  )
                  .slice(-60)
              )
              .catch(() => [])
          )
        );
        // 2) achata tudo num só array
        const flat = allArrays.flat();
        // 3) agrupa por 'interval' e calcula média
        const groups: Record<number, number[]> = {};
        flat.forEach((m) => {
          const t = m.interval;
          groups[t] = groups[t] || [];
          groups[t].push(m.energia_ativa_kWh);
        });
        const points: TrendPoint[] = Object.entries(groups).map(
          ([interval, values]) => ({
            time: Number(interval),
            kW: values.reduce((sum, v) => sum + v, 0) / values.length,
          })
        );
        // 4) ordena por tempo
        points.sort((a, b) => a.time - b.time);
        setData(points);
      } catch (err) {
        console.error("Erro ao buscar tendência de energia:", err);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTrend();
  }, [monitoringSections, monitoringId]);

  return { data, loading: loading || sectionsLoading };
}
