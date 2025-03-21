import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const menuItems = [
  { key: "/home", label: "Home" },
  { key: "/products", label: "Produtos" },
  { key: "/equipments", label: "Equipamentos" },
  { key: "/users", label: "Usuários" },
  { key: "/sectors", label: "Setores" },
  { key: "/production-lines", label: "Linhas de Produção" },
  { key: "/iotdevices", label: "Dispositivos IoT" },
  { key: "/monitoring", label: "Monitoramentos" },
  { key: "/quizzes", label: "Quizzes" },
  { key: "/missions", label: "Missões" },
  { key: "logout", label: "Sair", logout: true },
];

const DrawMenu: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isMobile) return null;

  return (
    <>
      <Button onClick={() => setOpen(true)} style={{ marginLeft: 10 }}>
        <MenuOutlined />
      </Button>
      <Drawer
        title="Acesso Rápido"
        onClose={() => setOpen(false)}
        open={open}
        bodyStyle={{ padding: "16px" }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          {menuItems.map((item) =>
            item.logout ? (
              <span
                key={item.key}
                style={{ color: "red", fontWeight: "bold", padding: "10px 0", cursor: "pointer" }}
              >
                {item.label}
              </span>
            ) : (
              <Link key={item.key} to={item.key} style={{ padding: "10px 0", fontSize: "16px" }}>
                {item.label}
              </Link>
            )
          )}
        </div>
      </Drawer>
    </>
  );
};

export default DrawMenu;