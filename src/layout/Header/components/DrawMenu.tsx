import React, { useState, useEffect } from "react";
import { Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const DrawMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  if (!isMobile) return null; 

  return (
    <>
      <Button onClick={showDrawer} style={{ marginLeft: 10 }}>
        <MenuOutlined />
      </Button>
      <Drawer title="Acesso Rápido" onClose={onClose} open={open} bodyStyle={{ padding: "16px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <Link to="/" className="item_menu_draw" style={{ padding: "10px 0", fontSize: "16px" }}>
            Home
          </Link>
          <Link to="/resume" className="item_menu_draw" style={{ padding: "10px 0", fontSize: "16px" }}>
            Medições
          </Link>
        </div>
      </Drawer>
    </>
  );
};

export default DrawMenu;