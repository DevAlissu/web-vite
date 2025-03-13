import React, { createContext, useContext, useEffect, useState } from "react";
import api from "../../services/api";
import { ProductItem } from "../../types/products";

interface ProductsContextProps {
  products: ProductItem[];
  fetchProducts: () => void;
  deleteProduct: (id: number) => void;
}

const ProductsContext = createContext<ProductsContextProps | undefined>(undefined);

export const ProductsProvider = ({ children }: { children: React.ReactNode }) => {
  const [products, setProducts] = useState<ProductItem[]>([]);

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await api.get("/products/"); // Corrigido para /products/
      setProducts(response.data);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
      // Opcional: Pode adicionar um estado de erro aqui para informar o usuário
    }
  };

  // Função para excluir um produto
  const deleteProduct = async (id: number) => {
    try {
      await api.delete(`/products/${id}/`); // Corrigido para /products/${id}/
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error("Erro ao excluir produto:", error);
      // Opcional: Pode adicionar um estado de erro aqui para informar o usuário
    }
  };

  // UseEffect para buscar os produtos assim que o componente for montado
  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductsContext.Provider value={{ products, fetchProducts, deleteProduct }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error("useProducts deve ser usado dentro de um ProductsProvider");
  }
  return context;
};