#!/usr/bin/env bash
set -euo pipefail

# Garante que estamos na raiz do frontend
cd "$(dirname "$0")"

# 1) Cria os diretórios necessários
mkdir -p src/types
mkdir -p src/services
mkdir -p src/store
mkdir -p src/pages/loja

# 2) types/lojaTypes.ts
cat > src/types/lojaTypes.ts << 'EOF'
export interface ProductLojaItem {
  id: number;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image?: string;
  disponivel: boolean;
  created_at: string;
  updated_at: string;
}
EOF

# 3) services/lojaService.ts
cat > src/services/lojaService.ts << 'EOF'
import axios from "axios";
import { ProductLojaItem } from "@/types/lojaTypes";

export const getStoreProducts = (): Promise<ProductLojaItem[]> =>
  axios.get("/products_loja/").then(res => res.data);

export const createStoreProduct = (
  data: Partial<ProductLojaItem>
): Promise<ProductLojaItem> =>
  axios.post("/products_loja/", data).then(res => res.data);

export const updateStoreProduct = (
  id: number,
  data: Partial<ProductLojaItem>
): Promise<ProductLojaItem> =>
  axios.put(\`/products_loja/\${id}/\`, data).then(res => res.data);

export const deleteStoreProduct = (id: number): Promise<void> =>
  axios.delete(\`/products_loja/\${id}/\`).then(() => {});
EOF

# 4) store/lojaStore.ts
cat > src/store/lojaStore.ts << 'EOF'
import { create } from "zustand";
import { ProductLojaItem } from "@/types/lojaTypes";
import {
  getStoreProducts,
  createStoreProduct,
  updateStoreProduct,
  deleteStoreProduct,
} from "@/services/lojaService";

interface LojaStore {
  products: ProductLojaItem[];
  loading: boolean;
  fetchProducts: () => Promise<void>;
  addProduct: (data: Partial<ProductLojaItem>) => Promise<void>;
  editProduct: (id: number, data: Partial<ProductLojaItem>) => Promise<void>;
  removeProduct: (id: number) => Promise<void>;
}

export const useLojaStore = create<LojaStore>((set) => ({
  products: [],
  loading: false,

  fetchProducts: async () => {
    set({ loading: true });
    try {
      const products = await getStoreProducts();
      set({ products });
    } catch (e) {
      console.error("Erro ao buscar produtos da loja", e);
    } finally {
      set({ loading: false });
    }
  },

  addProduct: async (data) => {
    set({ loading: true });
    try {
      await createStoreProduct(data);
      const products = await getStoreProducts();
      set({ products });
    } catch (e) {
      console.error("Erro ao criar produto", e);
    } finally {
      set({ loading: false });
    }
  },

  editProduct: async (id, data) => {
    set({ loading: true });
    try {
      await updateStoreProduct(id, data);
      const products = await getStoreProducts();
      set({ products });
    } catch (e) {
      console.error("Erro ao atualizar produto", e);
    } finally {
      set({ loading: false });
    }
  },

  removeProduct: async (id) => {
    set({ loading: true });
    try {
      await deleteStoreProduct(id);
      set((state) => ({
        products: state.products.filter((p) => p.id !== id),
      }));
    } catch (e) {
      console.error("Erro ao excluir produto", e);
    } finally {
      set({ loading: false });
    }
  },
}));
EOF

# 5) pages/loja/Loja.tsx
cat > src/pages/loja/Loja.tsx << 'EOF'
import React, { useEffect } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import CustomTable from "@/components/Table/Table";
import ItemHeaderCabecalho from "@/layout/Header/components/ItemHeaderCabecalho";
import ItemSideBar from "@/layout/Sidebar/ItemSideBar";
import ItemHeader from "@/layout/Header/ItemHeader";
import { useLojaStore } from "@/store/lojaStore";

const Loja: React.FC = () => {
  const navigate = useNavigate();
  const { products, loading, fetchProducts, removeProduct } = useLojaStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Nome", dataIndex: "name", key: "name" },
    { title: "Descrição", dataIndex: "description", key: "description" },
    { title: "Preço", dataIndex: "price", key: "price" },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <>
          <Button type="link" onClick={() => navigate(\`/loja/edit/\${record.id}\`)}>
            Editar
          </Button>
          <Button danger type="link" onClick={() => removeProduct(record.id)}>
            Excluir
          </Button>
        </>
      ),
    },
  ];

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho title="Loja" subTitle="Catálogo de produtos" />
          <Button
            type="primary"
            icon={<PlusOutlined />}
            style={{ marginBottom: 16 }}
            onClick={() => navigate("/loja/register")}
          >
            Cadastrar Produto
          </Button>
          <CustomTable columns={columns} data={products} loading={loading} />
        </main>
      </div>
    </div>
  );
};

export default Loja;
EOF

# 6) pages/loja/LojaForm.tsx
cat > src/pages/loja/LojaForm.tsx << 'EOF'
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { message } from "antd";
import DynamicForm from "@/components/form/DynamicForm";
import ItemSideBar from "@/layout/Sidebar/ItemSideBar";
import ItemHeader from "@/layout/Header/ItemHeader";
import ItemHeaderCabecalho from "@/layout/Header/components/ItemHeaderCabecalho";
import { useLojaStore } from "@/store/lojaStore";

const LojaForm: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const isEdit = Boolean(id);
  const navigate = useNavigate();
  const { products, addProduct, editProduct } = useLojaStore();
  const [loading, setLoading] = useState(false);
  const [values, setValues] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
  });

  useEffect(() => {
    if (isEdit && products.length) {
      const prod = products.find((p) => p.id === Number(id));
      if (prod) {
        setValues({
          name: prod.name,
          description: prod.description,
          price: prod.price.toString(),
          quantity: prod.quantity.toString(),
        });
      } else {
        message.error("Produto não encontrado.");
        navigate("/loja");
      }
    }
  }, [isEdit, id, products, navigate]);

  const handleChange = (name: string, value: any) =>
    setValues((v) => ({ ...v, [name]: value }));

  const handleSubmit = async () => {
    if (!values.name.trim()) {
      message.error("Nome obrigatório.");
      return;
    }
    setLoading(true);
    try {
      const data = {
        name: values.name,
        description: values.description,
        price: Number(values.price) || 0,
        quantity: Number(values.quantity) || 0,
      };
      if (isEdit) await editProduct(Number(id), data);
      else await addProduct(data);
      message.success(isEdit ? "Atualizado com sucesso!" : "Criado com sucesso!");
      navigate("/loja");
    } catch {
      message.error("Erro ao salvar.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title={isEdit ? "Editar Produto" : "Cadastrar Produto"}
            subTitle={isEdit ? "Editar dados do produto" : "Novo produto"}
          />
          <DynamicForm
            fields={[
              { name: "name", label: "Nome", type: "input", required: true },
              { name: "description", label: "Descrição", type: "textarea" },
              { name: "price", label: "Preço", type: "number" },
              { name: "quantity", label: "Quantidade", type: "number" },
            ]}
            values={values}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/loja")}
          />
        </main>
      </div>
    </div>
  );
};

export default LojaForm;
EOF

echo "✅ Scaffold Loja completo! Agora adicione as rotas em Routers.tsx e ajuste o menu em ItensMenu."