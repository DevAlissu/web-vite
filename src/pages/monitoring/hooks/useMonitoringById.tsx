import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMonitoringStore } from "@/store/monitoringStore";
import { MonitoringItem } from "@/types/monitoringTypes";
import { message } from "antd";

export const useMonitoringById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const {
    monitorings,
    fetchMonitorings,
    loading: storeLoading,
  } = useMonitoringStore();

  const [monitoring, setMonitoring] = useState<MonitoringItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadMonitoring = async () => {
      setLoading(true);
      await fetchMonitorings();
    };

    loadMonitoring();
  }, [fetchMonitorings]);

  useEffect(() => {
    if (monitorings.length === 0) return;

    const found = monitorings.find((m) => m.id === Number(id));
    if (found) {
      setMonitoring(found);
    } else {
      message.error("Monitoramento não encontrado.");
      navigate("/monitoring");
    }

    setLoading(false);
  }, [monitorings, id]);

  return { monitoring, loading: loading || storeLoading };
};