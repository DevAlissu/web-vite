import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import ItensMenu from "./components/ItensMenu";  
import Logo from "./components/Logo";           
import LogoInova from "./components/LogoInova";  

const { Sider } = Layout;

const ItemSideBar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
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

  if (isMobile) return null;

  return (
    <Sider
      className="menu"
      trigger={null}
      collapsible
      collapsed={collapsed}
      width={220}
      style={{
        background: "#FFF",
        minHeight: "100vh",
        borderRight: "0px solid #e8e8e8",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <Logo collapsed={collapsed} />
        <Button
          type="text"
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          onClick={() => setCollapsed(!collapsed)}
          style={{
            fontSize: "24px",
            color: "#000",
            width: "100%",
            display: "flex",
            justifyContent: "center",
            margin: "10px 0",
          }}
        />
        <ItensMenu />
      </div>

      <LogoInova collapsed={collapsed} />
    </Sider>
  );
};

export default ItemSideBar;