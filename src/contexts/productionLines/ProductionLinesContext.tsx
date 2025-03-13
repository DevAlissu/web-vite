import React, { createContext, useContext, useEffect, useState } from "react";
import {
  getProductionLines,
  createProductionLine,
  updateProductionLine,
  deleteProductionLine,
} from "../../services/ProductionLinesService";
import { ProductionLineItem, ProductionLineCreate } from "../../types/ProductionLinesTypes";

interface ProductionLinesContextProps {
  productionLines: ProductionLineItem[];
  fetchProductionLines: () => void;
  addProductionLine: (data: ProductionLineCreate) => Promise<ProductionLineItem>;
  editProductionLine: (id: number, data: ProductionLineCreate) => Promise<void>;
  removeProductionLine: (id: number) => Promise<void>;
  updateSectorConsumption: (sectorId: number, addedConsumption: number) => void; // Nova função
}

const ProductionLinesContext = createContext<ProductionLinesContextProps | undefined>(undefined);

export const ProductionLinesProvider = ({ children }: { children: React.ReactNode }) => {
  const [productionLines, setProductionLines] = useState<ProductionLineItem[]>([]);

  const fetchProductionLines = async () => {
    try {
      const data = await getProductionLines();
      setProductionLines(data);
    } catch (error) {
      console.error("Erro ao buscar linhas de produção:", error);
    }
  };

  const addProductionLine = async (data: ProductionLineCreate) => {
    try {
      const newLine = await createProductionLine(data);
      setProductionLines((prev) => [...prev, newLine]);

      // Atualiza o consumo do setor
      if (data.setor) {
        updateSectorConsumption(data.setor, newLine.value_mensuration_estimated);
      }
      return newLine;
    } catch (error) {
      console.error("Erro ao criar linha de produção:", error);
      throw error;
    }
  };

  const editProductionLine = async (id: number, data: ProductionLineCreate) => {
    try {
      await updateProductionLine(id, data);
      setProductionLines((prev) =>
        prev.map((line) => (line.id === id ? { ...line, ...data } : line))
      );
    } catch (error) {
      console.error("Erro ao editar linha de produção:", error);
    }
  };

  const removeProductionLine = async (id: number) => {
    try {
      await deleteProductionLine(id);
      setProductionLines((prev) => prev.filter((line) => line.id !== id));
    } catch (error) {
      console.error("Erro ao excluir linha de produção:", error);
    }
  };

  // Atualiza o consumo do setor
  const updateSectorConsumption = (sectorId: number, addedConsumption: number) => {
    // Função para ser utilizada no contexto de setores
  };

  useEffect(() => {
    fetchProductionLines();
  }, []);

  return (
    <ProductionLinesContext.Provider
      value={{
        productionLines,
        fetchProductionLines,
        addProductionLine,
        editProductionLine,
        removeProductionLine,
        updateSectorConsumption, // Passando a função de atualização do consumo
      }}
    >
      {children}
    </ProductionLinesContext.Provider>
  );
};

export const useProductionLines = () => {
  const context = useContext(ProductionLinesContext);
  if (!context) {
    throw new Error("useProductionLines deve ser usado dentro de um ProductionLinesProvider");
  }
  return context;
};