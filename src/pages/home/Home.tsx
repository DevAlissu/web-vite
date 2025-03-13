import React, { useEffect, useState } from "react";
import { Layout, Flex, notification } from "antd";
import ItemHeader from "../../layout/Header/ItemHeader";
import ItemSideBar from "../../layout/Sidebar/ItemSideBar";

const { Content } = Layout;

const HomePage: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [numeroRequisicao, setNumeroRequisicao] = useState<number>(0);
  const [erroLoading, setErroLoading] = useState<boolean>(false);
  const [textoSincronizacao, setTextoSincronizacao] = useState(
    "Sincronizando dados com a embarcação..."
  );

  const [api, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Aqui pode ser feita a requisição para buscar dados da API
  }, []);

  const openNotification = () => {
    api.open({
      message: "Erro de conexão",
      description: "Erro de conexão com a API.",
      type: "warning",
      duration: 0,
    });
  };

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {contextHolder}
      <ItemSideBar />
      <Layout>
        <ItemHeader />
        <Flex className="panel">
          <div className="panel-content">AQUI</div>
        </Flex>
      </Layout>
    </Layout>
  );
};

export default HomePage;