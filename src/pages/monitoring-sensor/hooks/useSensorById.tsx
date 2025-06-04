import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMonitoringSensorStore } from "@/store/monitoringSensorStore";
import { MonitoringItem } from "@/types/monitoringTypes";
import { message } from "antd";

export const useSensorById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { monitorings, fetchAllMonitorings } = useMonitoringSensorStore();
  const [monitoring, setMonitoring] = useState<MonitoringItem | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 1) Ao montar, busca TODOS os monitoramentos do tipo “Nansenson”
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAllMonitorings();
      setLoading(false);
    };
    void load();
  }, [fetchAllMonitorings]);

  // 2) Quando “loading” for false, procure o monitoramento com ID igual a Number(id)
  useEffect(() => {
    if (!loading) {
      const found = monitorings.find((m) => m.id === Number(id));
      if (found) {
        setMonitoring(found);
      } else {
        message.error("Sensor não encontrado.");
        navigate("/sensor-monitoring");
      }
    }
  }, [loading, monitorings, id, navigate]);

  return { monitoring, loading };
};
