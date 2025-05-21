// src/pages/home/hooks/useEnvironmentalData.ts
import { useEffect, useState } from "react";

export interface EnvPoint {
  name: string;
  value: number;
}

export function useEnvironmentalData(monitoringId?: number) {
  const [data, setData] = useState<EnvPoint[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!monitoringId) {
      setData([]);
      return;
    }

    setLoading(true);
    // mock temporário
    const mock = [
      { name: "Temperatura", value: 22 },
      { name: "Umidade", value: 60 },
      { name: "Luminosidade", value: 350 },
    ];
    // simula atraso de fetch
    const timer = setTimeout(() => {
      setData(mock);
      setLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [monitoringId]);

  return { data, loading };
}
