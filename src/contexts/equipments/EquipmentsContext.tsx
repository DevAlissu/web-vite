import api from "../../services/api"; // Adicionando importação do `api`
import React, { createContext, useContext, useEffect, useState } from "react";
import { getEquipments } from "../../services/equipmentsService";

// Definindo os tipos de dados do contexto de equipamentos
interface EquipmentContextProps {
  equipments: any[];
  fetchEquipments: () => void;
  deleteEquipment: (id: number) => void;
}

const EquipmentsContext = createContext<EquipmentContextProps | undefined>(undefined);

interface EquipmentsProviderProps {
  children: React.ReactNode;
}

export const EquipmentsProvider: React.FC<EquipmentsProviderProps> = ({ children }) => {
  const [equipments, setEquipments] = useState<any[]>([]); // State para armazenar equipamentos

  // Função para buscar os equipamentos
  const fetchEquipments = async () => {
    try {
      const data = await getEquipments(); // Chama a função para pegar os equipamentos
      setEquipments(data); // Atualiza o estado com os dados obtidos
    } catch (error) {
      console.error("Erro ao buscar equipamentos:", error); // Caso ocorra algum erro
    }
  };

  // Função para excluir um equipamento
  const deleteEquipment = async (id: number) => {
    try {
      await api.delete(`/equipaments/${id}/`); // Faz a requisição para deletar o equipamento
      // Atualiza a lista de equipamentos após a exclusão
      setEquipments((prev) => prev.filter((equipment) => equipment.id !== id));
    } catch (error) {
      console.error("Erro ao excluir equipamento:", error); // Caso ocorra erro ao excluir
    }
  };

  // Chama `fetchEquipments` assim que o componente for montado
  useEffect(() => {
    fetchEquipments(); // Chama a função para carregar os dados
  }, []);

  return (
    <EquipmentsContext.Provider value={{ equipments, fetchEquipments, deleteEquipment }}>
      {children} {/* Passando os dados do contexto para os componentes filhos */}
    </EquipmentsContext.Provider>
  );
};

// Hook para consumir o contexto de equipamentos
export const useEquipments = () => {
  const context = useContext(EquipmentsContext);
  if (!context) {
    throw new Error("useEquipments deve ser usado dentro de um EquipmentsProvider");
  }
  return context;
};