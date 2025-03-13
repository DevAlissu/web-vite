import React, { createContext, useContext, useEffect, useState } from "react";
import { getSectors, createSector, updateSector, deleteSector } from "../../services/SectorsService";
import { SectorItem } from "../../types/sectors";

interface SectorsContextProps {
  sectors: SectorItem[];
  fetchSectors: () => void;
  addSector: (data: Omit<SectorItem, "id" | "created_at">) => Promise<SectorItem>;
  editSector: (id: number, data: Omit<SectorItem, "id" | "created_at">) => Promise<void>;
  removeSector: (id: number) => Promise<void>;
  updateSectorConsumption: (sectorId: number, addedConsumption: number) => void; // Função para atualizar consumo
}

const SectorsContext = createContext<SectorsContextProps | undefined>(undefined);

export const SectorsProvider = ({ children }: { children: React.ReactNode }) => {
  const [sectors, setSectors] = useState<SectorItem[]>([]);

  const fetchSectors = async () => {
    try {
      const data = await getSectors();
      setSectors(data);
    } catch (error) {
      console.error("Erro ao buscar setores:", error);
    }
  };

  const addSector = async (data: Omit<SectorItem, "id" | "created_at">): Promise<SectorItem> => {
    try {
      const newSector = await createSector(data);
      setSectors((prevSectors) => [...prevSectors, newSector]);
      return newSector;
    } catch (error) {
      console.error("Erro ao criar setor:", error);
      throw new Error("Erro ao criar setor");
    }
  };

  const updateSectorConsumption = (sectorId: number, addedConsumption: number) => {
    try {
      setSectors((prevSectors) =>
        prevSectors.map((sector) => {
          if (sector.id === sectorId) {
            return {
              ...sector,
              estimated_consumption: sector.estimated_consumption + addedConsumption, // Atualiza o consumo
            };
          }
          return sector;
        })
      );
    } catch (error) {
      console.error("Erro ao atualizar o consumo do setor:", error);
    }
  };

  const editSector = async (id: number, data: Omit<SectorItem, "id" | "created_at">) => {
    try {
      await updateSector(id, data);
      setSectors((prevSectors) =>
        prevSectors.map((sector) => (sector.id === id ? { ...sector, ...data } : sector))
      );
    } catch (error) {
      console.error("Erro ao editar setor:", error);
    }
  };

  const removeSector = async (id: number) => {
    try {
      await deleteSector(id);
      setSectors((prevSectors) => prevSectors.filter((sector) => sector.id !== id));
    } catch (error) {
      console.error("Erro ao excluir setor:", error);
    }
  };

  useEffect(() => {
    fetchSectors();
  }, []);

  return (
    <SectorsContext.Provider
      value={{
        sectors,
        fetchSectors,
        addSector,
        editSector,
        removeSector,
        updateSectorConsumption, // Passando a função de atualização de consumo
      }}
    >
      {children}
    </SectorsContext.Provider>
  );
};

export const useSectors = () => {
  const context = useContext(SectorsContext);
  if (!context) {
    throw new Error("useSectors deve ser usado dentro de um SectorsProvider");
  }
  return context;
};