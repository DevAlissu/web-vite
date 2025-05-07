import { useEffect, useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { SortOrder } from "antd/es/table/interface";
import { useProductsStore } from "../../../store/products";
import Actions from "../../../components/actions/Actions";
import { ProductItem } from "../../../types/products";

export const useProductsTable = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, deleteProduct } = useProductsStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProductsFromAPI = async () => {
      try {
        setLoading(true);
        await fetchProducts();
      } catch (error) {
        console.error("Erro ao buscar produtos:", error);
        message.error("Erro ao carregar os produtos!");
      } finally {
        setLoading(false);
      }
    };

    fetchProductsFromAPI();
  }, []);

  const columns = [
    {
      title: "Foto",
      dataIndex: "photo",
      key: "photo",
      render: (photo: any) =>
        typeof photo === "string" && photo.startsWith("http") ? (
          <img
            src={photo}
            alt="Produto"
            style={{
              width: "50px",
              height: "50px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : photo ? (
          <img
            src={`http://inova-sistemas.ddns.net:20163${photo}`}
            alt="Produto"
            style={{
              width: "540px",
              height: "540px",
              objectFit: "cover",
              borderRadius: "5px",
            }}
          />
        ) : (
          <span>Sem imagem</span>
        ),
    },
    {
      title: "Nome",
      dataIndex: "name",
      key: "name",
      sorter: (a: ProductItem, b: ProductItem) => a.name.localeCompare(b.name),
      sortDirections: ["ascend", "descend"] as SortOrder[],
      render: (text: string | undefined) => (
        <strong>{text ?? "Sem nome"}</strong>
      ),
    },
    {
      title: "Descrição",
      dataIndex: "description",
      key: "description",
      render: (text: string | undefined) => (
        <span>{text ?? "Sem descrição"}</span>
      ),
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: ProductItem) => (
        <Actions
          onEdit={() => navigate(`/products/edit/${record.id}`)}
          onDelete={async () => {
            if (record.id) {
              await deleteProduct(Number(record.id));
            }
          }}
        />
      ),
    },
  ];

  return { columns, products, loading };
};
