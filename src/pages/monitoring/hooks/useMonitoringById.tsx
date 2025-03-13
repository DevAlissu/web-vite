import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useMonitoring } from "./useMonitoring";
import { MonitoringItem } from "../../../types/monitoringTypes";
import { message } from "antd";

export const useMonitoringById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { monitorings, loading } = useMonitoring();
  const [monitoring, setMonitoring] = useState<MonitoringItem | null>(null);

  useEffect(() => {
    const selectedMonitoring = monitorings.find((item) => item.id === Number(id));
    if (selectedMonitoring) {
      setMonitoring(selectedMonitoring);
    } else {
      message.error("Monitoramento não encontrado.");
      navigate("/monitoring");
    }
  }, [id, monitorings, navigate]);

  return { monitoring, loading };
};