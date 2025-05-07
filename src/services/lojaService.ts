import api from "./api";
import { ProductLojaItem } from "../types/lojaTypes";

// 🔹 Listar produtos da loja
export const getStoreProducts = async (): Promise<ProductLojaItem[]> =>
  (await api.get("/products_loja/")).data;

// 🔹 Criar novo produto da loja
export const createStoreProduct = async (
  data: FormData
): Promise<ProductLojaItem> => (await api.post("/products_loja/", data)).data;

// 🔹 Atualizar produto existente
export const updateStoreProduct = async (
  id: number,
  data: FormData
): Promise<ProductLojaItem> =>
  (await api.put(`/products_loja/${id}/`, data)).data;

// 🔹 Deletar produto
export const deleteStoreProduct = async (id: number): Promise<void> =>
  await api.delete(`/products_loja/${id}/`);
