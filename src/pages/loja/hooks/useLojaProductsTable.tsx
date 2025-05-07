import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Actions from "../../../components/actions/Actions";
import { useLojaStore } from "../../../store/useLojaStore";

export const useLojaProductsTable = () => {
  const navigate = useNavigate();
  const { products, fetchProducts, deleteProduct } = useLojaStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts().finally(() => setLoading(false));
  }, []);

  const columns = [
    {
      title: "Imagem",
      dataIndex: "image",
      key: "image",
      render: (image: string | null) =>
        image ? (
          <img
            src={
              image.startsWith("http")
                ? image
                : `http://inova-sistemas.ddns.net:20163${image}`
            }
            alt="Produto"
            style={{
              width: "50px",
              height: "50px",
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
    },
    {
      title: "Preço",
      dataIndex: "price",
      key: "price",
    },
    {
      title: "Quantidade",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Ações",
      key: "actions",
      render: (_: any, record: any) => (
        <Actions
          onEdit={() => navigate(`/loja/edit/${record.id}`)}
          onDelete={() => deleteProduct(record.id)}
        />
      ),
    },
  ];

  return { columns, products, loading };
};
