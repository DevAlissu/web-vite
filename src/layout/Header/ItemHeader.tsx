import { Layout } from "antd";
import DrawMenu from "./components/DrawMenu";

const { Header } = Layout;

export default function ItemHeader() {
  return (
    <Header
      style={{
        padding: "0 20px",
        background: "rgb(0 66 129)",
        borderBottom: "1px solid #e8e8e8",
        height: 64, // Mantém altura fixa para alinhar com o Sidebar
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div className="menu_hamburguer">
        <DrawMenu />
      </div>

      <div style={{ fontSize: "24px", fontWeight: "bold", color: "#FFF" }}>
        <h1></h1>
      </div>

      <div>
        {/* Espaço reservado para ícones de usuário/notificações */}
      </div>
    </Header>
  );
}
