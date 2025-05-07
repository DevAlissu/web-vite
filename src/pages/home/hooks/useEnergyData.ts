// src/pages/home/hooks/useEnergyData.ts
import { useEffect, useState } from "react";
import api from "@/services/api";

interface EnergyMeasurement {
  id: number;
  energia_ativa_kWh: number;
  interval: number;
  section: number;
}

export const useEnergyData = (sectionId?: number) => {
  const [data, setData] = useState<EnergyMeasurement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) return;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get(
          `/section-measurements/?section_id=${sectionId}`
        );
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar dados de energia:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionId]);

  return { data, loading };
};
