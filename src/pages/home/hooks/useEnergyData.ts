import { useEffect, useState } from "react";
import api from "@/services/api";

export interface EnergyMeasurement {
  id: number;
  energia_ativa_kWh: number;
  interval: number;
  section: number;
}

export const useEnergyData = (sectionId?: number) => {
  const [data, setData] = useState<EnergyMeasurement[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!sectionId) {
      setData([]);
      return;
    }

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await api.get<EnergyMeasurement[]>(
          `/section-measurements/?section_id=${sectionId}`
        );
        // filtra apenas leituras válidas (não NaN) e mantém ordem original
        const clean = response.data.filter(
          (m) =>
            typeof m.energia_ativa_kWh === "number" &&
            !Number.isNaN(m.energia_ativa_kWh)
        );
        setData(clean);
      } catch (error) {
        console.error("Erro ao buscar dados de energia:", error);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [sectionId]);

  return { data, loading };
};
