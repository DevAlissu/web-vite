import React from "react";
import { Link } from "react-router-dom";
import LogoLarge from "../../../assets/nansen_logo.svg";
import LogoMini from "../../../assets/logo_mini.svg";

interface LogoProps {
  collapsed: boolean;
}

const Logo: React.FC<LogoProps> = ({ collapsed }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "rgb(0 66 129)",
        padding: "10px 0",
        height: 64,
      }}
    >
      <Link to="/">
        <img
          src={collapsed ? LogoMini : LogoLarge}
          alt="Logo"
          style={{
            height: 50,
            width: "auto",
            maxWidth: "160px",
          }}
        />
      </Link>
    </div>
  );
};

export default Logo;