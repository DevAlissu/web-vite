import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Input, Button, notification } from "antd";
import { Eye, EyeClosed, User } from "lucide-react";
import { useAuth } from "../../contexts/auth/AuthContext";
import api from "../../services/api";

import BackgroundImage from "../../assets/background.jpg";
import ImageLogoLogin from "../../assets/logo-footer1.png";
import EmbrapiLogo from "../../assets/embrapi_logo.png";
import InovaLogo from "../../assets/inova_logo.png";
import ImageLogin from "../../assets/OperadorNansenRedimensionada.jpg";

interface LoginDTO {
  username: string;
  password: string;
}

export type NotificationType = "success" | "info" | "warning" | "error";

export default function Login() {
  const { login } = useAuth(); // Usa o contexto de autenticação
  const navigate = useNavigate();
  const [loginObject, setLoginObject] = useState<LoginDTO>({
    username: "",
    password: "",
  });

  const [apiNotification, contextHolder] = notification.useNotification();

  const openNotificationWithIcon = (
    type: NotificationType,
    message: string,
    description: string
  ) => {
    apiNotification[type]({
      message: message,
      description: description,
    });
  };

  const loginMethod = async () => {
    if (!loginObject.username || !loginObject.password) {
      openNotificationWithIcon("warning", "Campos vazios", "Preencha todos os campos!");
      return;
    }

    try {
      const response = await api.post("/login/", loginObject);
      if (response.status === 200) {
        login(response.data.access); // ✅ Salva o token no contexto corretamente
        navigate("/home"); // ✅ Redireciona para home sem precisar recarregar
      } else {
        openNotificationWithIcon("error", "Erro de login", "Usuário ou senha inválidos.");
      }
    } catch (error) {
      openNotificationWithIcon("error", "Erro de conexão", "Não foi possível conectar à API.");
    }
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {contextHolder}
      <div className="w-full max-w-[850px] bg-white rounded-lg shadow-lg flex flex-col md:flex-row overflow-hidden h-auto md:h-[480px]">
        {/* Lado Esquerdo - Formulário */}
        <div className="w-full md:w-1/2 p-6 flex flex-col items-center text-center justify-center">
          <img src={ImageLogoLogin} alt="Logo" className="mb-4 w-48 md:w-52" />
          <h1 className="text-xl font-semibold text-gray-800 mb-4">
            Acesse sua conta
          </h1>
          <Input
            placeholder="Nome de usuário"
            prefix={<User color="#4892D7" size={20} />}
            className="w-full max-w-[300px] h-12 text-lg border border-gray-300 rounded-md px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setLoginObject({ ...loginObject, username: e.target.value })}
          />
          <Input.Password
            placeholder="Senha"
            className="w-full max-w-[300px] h-12 text-lg border border-gray-300 rounded-md px-4 py-2 mt-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            onChange={(e) => setLoginObject({ ...loginObject, password: e.target.value })}
            iconRender={(visible) => (visible ? <Eye size={20} /> : <EyeClosed size={20} />)}
          />
          <Button
            type="primary"
            block
            className="w-full max-w-[300px] h-12 text-lg mt-4 bg-[#0057B8] hover:bg-[#004A99] text-white font-semibold rounded-md transition-all"
            onClick={loginMethod}
          >
            Entrar
          </Button>
          <div className="flex justify-center mt-6 space-x-6">
            <img src={InovaLogo} alt="Inova" className="w-20 h-auto" />
            <img src={EmbrapiLogo} alt="Embrapi" className="w-24 h-auto" />
          </div>
        </div>

        {/* Lado Direito - Imagem (some em telas pequenas) */}
        <div className="w-full md:w-1/2 hidden md:block relative h-[240px] md:h-auto">
          <img
            src={ImageLogin}
            alt="Operador"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#112A42] opacity-50"></div>
        </div>
      </div>
    </div>
  );
}