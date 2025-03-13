import { useState } from "react";
import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Space, MenuProps } from "antd";
import { Link } from "react-router-dom";

const items: MenuProps["items"] = [
  {
    key: "1",
    label: <Link to="/">Home</Link>,
  },
  {
    key: "2",
    label: <Link to="/resume">Medições</Link>,
  },
];

const DropDownMenu: React.FC = () => {
  const [open, setOpen] = useState<boolean>(false);

  const handleMenuOpen = (flag: boolean) => {
    setOpen(flag);
    document.body.style.overflow = flag ? "hidden" : "auto"; // Bloqueia/desbloqueia a rolagem
  };

  const handleClose = () => {
    setOpen(false);
    document.body.style.overflow = "auto"; // Libera a rolagem ao fechar
  };

  return (
    <>
      {/* Camada de fundo para fechar ao clicar fora */}
      {open && (
        <div
          onClick={handleClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100vh",
            backgroundColor: "rgba(0, 0, 0, 0.4)",
            zIndex: 999,
          }}
        />
      )}

      <Dropdown
        menu={{ items }}
        overlayStyle={{
          position: "fixed",
          top: 60,
          left: 0,
          width: "80%",
          backgroundColor: "rgba(255, 255, 255, 0.9)",
          zIndex: 1000,
        }}
        trigger={["click"]}
        open={open}
        onOpenChange={handleMenuOpen}
      >
        <a
          onClick={(e) => e.preventDefault()}
          style={{ display: "block", width: "100%", cursor: "pointer" }}
        >
          <Space
            style={{
              justifyContent: "space-between",
              width: "100%",
              height: "50%",
            }}
          >
            <MenuOutlined />
          </Space>
        </a>
      </Dropdown>
    </>
  );
};

export default DropDownMenu;