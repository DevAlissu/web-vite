import React from "react";
import { MonitoringItem } from "../../../types/monitoringTypes";

interface Props {
  monitoring: MonitoringItem;
}

const MonitoringDetails: React.FC<Props> = ({ monitoring }) => {
  return (
    <section className="monitoring-info">
      <div className="monitoring-table">
        <div className="monitoring-row">
          <div className="monitoring-cell">
            <span className="info-label">Nome do Monitoramento:</span>
            <span className="info-value">{monitoring.name}</span>
          </div>
          <div className="monitoring-cell">
            <span className="info-label">Descrição:</span>
            <span className="info-value">{monitoring.description}</span>
          </div>
          <div className="monitoring-cell">
            <span className="info-label">Consumo Estimado:</span>
            <span className="info-value">{monitoring.estimated_consumption} kWh</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringDetails;