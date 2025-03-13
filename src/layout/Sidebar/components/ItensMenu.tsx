import { Menu } from "antd";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuProps } from "antd/es/menu";
import { useAuth } from "../../../contexts/auth/AuthContext"; 

// Ícones
import HomeIcon from "@mui/icons-material/Home";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import BuildIcon from "@mui/icons-material/Build";
import PeopleIcon from "@mui/icons-material/People";
import AccountTreeIcon from "@mui/icons-material/AccountTree";
import MemoryIcon from "@mui/icons-material/Memory";
import MonitorIcon from "@mui/icons-material/Monitor";
import QuizIcon from "@mui/icons-material/Quiz";
import ExploreIcon from "@mui/icons-material/Explore";
import FactoryIcon from "@mui/icons-material/Factory"; // 🔹 Ícone para linha de produção
import ExitToAppIcon from "@mui/icons-material/ExitToApp"; 

const ItensMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth(); 

  const items: MenuProps["items"] = [
    {
      key: "/home",
      icon: <HomeIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Home",
      onClick: () => navigate("/home"),
    },
    {
      key: "/products",
      icon: <LocalOfferIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Produtos",
      onClick: () => navigate("/products"),
    },
    {
      key: "/equipments",
      icon: <BuildIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Equipamentos",
      onClick: () => navigate("/equipments"),
    },
    {
      key: "/users",
      icon: <PeopleIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Usuários",
      onClick: () => navigate("/users"),
    },
    {
      key: "/sectors",
      icon: <AccountTreeIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Setores",
      onClick: () => navigate("/sectors"),
    },
    {
      key: "/production-lines", // 🔹 Adicionada rota para linha de produção
      icon: <FactoryIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Linhas de Produção",
      onClick: () => navigate("/production-lines"),
    },
    {
      key: "/iotdevices",
      icon: <MemoryIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Dispositivos IoT",
      onClick: () => navigate("/iotdevices"),
    },
    {
      key: "/monitoring",
      icon: <MonitorIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Monitoramentos",
      onClick: () => navigate("/monitoring"),
    },
    {
      key: "/quizzes",
      icon: <QuizIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Quizzes",
      onClick: () => navigate("/quizzes"),
    },
    {
      key: "/missions",
      icon: <ExploreIcon fontSize="small" style={{ color: "#004281" }} />,
      label: "Missões",
      onClick: () => navigate("/missions"),
    },
    {
      key: "divider",
      type: "divider",
    },
    {
      key: "logout",
      className: "logout-item",
      icon: <ExitToAppIcon fontSize="small" />,
      label: <span style={{ color: "red", fontWeight: "bold" }}>Sair</span>,
      onClick: logout,
    },
  ];

  return (
    <Menu
      className="custom-menu"
      mode="inline"
      selectedKeys={[location.pathname]}
      items={items}
    />
  );
};

export default ItensMenu;