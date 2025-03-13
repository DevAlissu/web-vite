import React, { useState } from "react";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import ItemSideBar from "../../../layout/Sidebar/ItemSideBar";
import ItemHeader from "../../../layout/Header/ItemHeader";
import ItemHeaderCabecalho from "../../../layout/Header/components/ItemHeaderCabecalho";
import DynamicForm from "../../../components/form/DynamicForm";
import { useUsersStore } from "../../../store/users";
import { UserRegister } from "../../../types/users";

const UsersRegister: React.FC = () => {
  const navigate = useNavigate();
  const { addUser } = useUsersStore();
  const [loading, setLoading] = useState(false);
  const [formValues, setFormValues] = useState<UserRegister>({
    username: "",
    name: "",
    email: "",
    password: "",
    role: "ADMIN",
  });

  const handleChange = (name: string, value: any) => {
    setFormValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    if (!formValues.username.trim()) {
      message.error("O username é obrigatório!");
      return;
    }

    if (!formValues.name.trim()) {
      message.error("O nome é obrigatório!");
      return;
    }

    if (!formValues.email.trim()) {
      message.error("O email é obrigatório!");
      return;
    }

    if (!formValues.password.trim()) {
      message.error("A senha é obrigatória!");
      return;
    }

    setLoading(true);
    try {
      await addUser(formValues);
      message.success("Usuário cadastrado com sucesso!");
      navigate("/users");
    } catch (error) {
      message.error("Erro ao cadastrar usuário!");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="layout-container">
      <ItemSideBar />
      <div className="content-container">
        <ItemHeader />
        <main className="content">
          <ItemHeaderCabecalho
            title="Cadastro de Usuário"
            subTitle="Preencha os campos abaixo para cadastrar um usuário"
          />
          <DynamicForm
            fields={[
              { name: "username", label: "Username", type: "input", required: true },
              { name: "name", label: "Nome", type: "input", required: true },
              { name: "email", label: "Email", type: "input", required: true },
              { name: "password", label: "Senha", type: "password", required: true },
              {
                name: "role",
                label: "Permissão",
                type: "select",
                required: true,
                options: [
                  { value: "ADMIN", label: "Admin" },
                  { value: "GAME", label: "Game" },
                ],
              },
            ]}
            values={formValues}
            onChange={handleChange}
            onSubmit={handleSubmit}
            loading={loading}
            onCancel={() => navigate("/users")}
          />
        </main>
      </div>
    </div>
  );
};

export default UsersRegister;
