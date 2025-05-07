import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSensorMonitoringStore } from "@/store/sensorMonitoringStore";
import { MonitoringItem } from "@/types/monitoringTypes";
import { message } from "antd";

export const useSensorById = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const { sensorMonitorings, fetchSensorMonitorings } =
    useSensorMonitoringStore();

  const [monitoring, setMonitoring] = useState<MonitoringItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchSensorMonitorings();
      setLoading(false);
    };
    load();
  }, [fetchSensorMonitorings]);

  useEffect(() => {
    if (!loading) {
      const found = sensorMonitorings.find((m) => m.id === Number(id));
      if (found) {
        setMonitoring(found);
      } else {
        message.error("Sensor não encontrado.");
        navigate("/sensor-monitoring");
      }
    }
  }, [loading, sensorMonitorings, id, navigate]);

  return { monitoring, loading };
};
