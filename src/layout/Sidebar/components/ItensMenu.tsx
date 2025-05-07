import React from "react";
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
import FactoryIcon from "@mui/icons-material/Factory";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const ItensMenu: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const items: MenuProps["items"] = [
    {
      key: "/home",
      icon: <HomeIcon fontSize="small" />,
      label: "Home",
      onClick: () => navigate("/home"),
    },
    {
      key: "/sectors",
      icon: <AccountTreeIcon fontSize="small" />,
      label: "Setores",
      onClick: () => navigate("/sectors"),
    },
    {
      key: "/production-lines",
      icon: <FactoryIcon fontSize="small" />,
      label: "Linhas de Produção",
      onClick: () => navigate("/production-lines"),
    },
    {
      key: "/equipments",
      icon: <BuildIcon fontSize="small" />,
      label: "Equipamentos",
      onClick: () => navigate("/equipments"),
    },
    {
      key: "/products",
      icon: <LocalOfferIcon fontSize="small" />,
      label: "Produtos",
      onClick: () => navigate("/products"),
    },
    {
      key: "/users",
      icon: <PeopleIcon fontSize="small" />,
      label: "Usuários",
      onClick: () => navigate("/users"),
    },
    {
      key: "/iotdevices",
      icon: <MemoryIcon fontSize="small" />,
      label: "Dispositivos IoT",
      onClick: () => navigate("/iotdevices"),
    },
    {
      key: "monitoring-group",
      icon: <MonitorIcon fontSize="small" />,
      label: "Monitoramentos",
      children: [
        {
          key: "/monitoring",
          label: "Energia (NansenIC)",
          onClick: () => navigate("/monitoring"),
        },
        {
          key: "/sensor-monitoring",
          label: "Sensor (NansenSensor)",
          onClick: () => navigate("/sensor-monitoring"),
        },
      ],
    },
    {
      key: "loja-group",
      icon: <ShoppingCartIcon fontSize="small" />,
      label: "Loja",
      children: [
        {
          key: "/loja",
          label: "Produtos Loja",
          onClick: () => navigate("/loja"),
        },
        {
          key: "/loja/register",
          label: "Cadastrar Produto",
          onClick: () => navigate("/loja/register"),
        },
      ],
    },
    {
      key: "/quizzes",
      icon: <QuizIcon fontSize="small" />,
      label: "Quizzes",
      onClick: () => navigate("/quizzes"),
    },
    {
      key: "/missions",
      icon: <ExploreIcon fontSize="small" />,
      label: "Missões",
      onClick: () => navigate("/missions"),
    },
    { key: "divider", type: "divider" },
    {
      key: "logout",
      icon: <ExitToAppIcon fontSize="small" />,
      label: <span style={{ color: "red" }}>Sair</span>,
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
