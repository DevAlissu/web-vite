import { Routes, Route, Navigate } from "react-router-dom";

// Home e Login
import HomePage from "../pages/home/Home";
import LoginPage from "../pages/login/Login";

// Produtos
import ProductsPage from "../pages/products/Products";
import ProductsRegister from "../pages/products/ProductsRegister/Register";
import EditProducts from "../pages/products/components/EditProducts";

// Equipamentos
import EquipmentsPage from "../pages/equipments/Equipments";
import EquipmentsRegister from "../pages/equipments/equipmentsregister/Register";
import EditEquipments from "../pages/equipments/components/EditEquipment";

// Usuários
import UsersPage from "../pages/users/Users";
import UsersRegister from "../pages/users/components/UsersRegister";

// Setores
import SectorsPage from "../pages/sectors/Sectors";
import SectorsRegister from "../pages/sectors/components/SectorsRegister";
import SectorsEdit from "../pages/sectors/components/SectorsEdit";

// Dispositivos IoT
import IoTDevice from "../pages/iotDevices/IoTDevices";
import IoTDeviceRegister from "../pages/iotDevices/components/IoTDevicesRegister";
import IoTDeviceEdit from "../pages/iotDevices/components/IoTDevicesEdit";

// Linhas de Produção
import ProductionLinesPage from "../pages/productionLines/ProductionLines";
import ProductionLinesRegister from "../pages/productionLines/components/ProductionLinesRegister";
import ProductionLinesEdit from "../pages/productionLines/components/ProductionLinesEdit";

// Monitoramento
import MonitoringPage from "../pages/monitoring/Monitoring";
import MonitoringRegister from "../pages/monitoring/components/MonitoringForm";
import MonitoringConfigure from "../pages/monitoring/components/MonitoringConfigure";
import MonitoringAddSection from "../pages/monitoring/components/MonitoringAddSection";
import MonitoringEdit from "../pages/monitoring/components/MonitoringEdit";
import SectionEdit from "../pages/monitoring/components/SectionEdit";
// Seções dentro do Monitoramento
import SectionList from "../pages/monitoring/components/SectionList";

// Quizzes
import QuizzesPage from "../pages/quizzes/Quizzes";
import QuizRegister from "../pages/quizzes/quizregister/Register";
import EditQuiz from "../pages/quizzes/components/EditQuiz";

// Missões
import MissionsPage from "../pages/missions/Missions";
import MissionRegister from "../pages/missions/missionregister/Register";
import EditMission from "../pages/missions/components/EditMission";

// ProtectedRoute
import ProtectedRoute from "./ProtectedRoute";

const Routers = () => {
  return (
    <Routes>
      {/* Rota pública (login) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas protegidas */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Routes>
              <Route path="/home" element={<HomePage />} />

              {/* Produtos */}
              <Route path="/products" element={<ProductsPage />} />
              <Route path="/products/register" element={<ProductsRegister />} />
              <Route path="/products/edit/:id" element={<EditProducts />} />

              {/* Equipamentos */}
              <Route path="/equipments" element={<EquipmentsPage />} />
              <Route path="/equipments/register" element={<EquipmentsRegister />} />
              <Route path="/equipments/edit/:id" element={<EditEquipments />} />

              {/* Usuários */}
              <Route path="/users" element={<UsersPage />} />
              <Route path="/users/register" element={<UsersRegister />} />

              {/* Setores */}
              <Route path="/sectors" element={<SectorsPage />} />
              <Route path="/sectors/register" element={<SectorsRegister />} />
              <Route path="/sectors/edit/:id" element={<SectorsEdit />} />

              {/* Dispositivos IoT */}
              <Route path="/iotdevices" element={<IoTDevice />} />
              <Route path="/iotdevices/register" element={<IoTDeviceRegister />} />
              <Route path="/iotdevices/edit/:id" element={<IoTDeviceEdit />} />

              {/* Linhas de Produção */}
              <Route path="/production-lines" element={<ProductionLinesPage />} />
              <Route path="/production-lines/register" element={<ProductionLinesRegister />} />
              <Route path="/production-lines/edit/:id" element={<ProductionLinesEdit />} />

              {/* Monitoramento */}
              <Route path="/monitoring" element={<MonitoringPage />} />
              <Route path="/monitoring/register" element={<MonitoringRegister />} />
              <Route path="/monitoring/configure/:id" element={<MonitoringConfigure />} />
              <Route path="/monitoring/edit-section/:id" element={<SectionEdit />} />
              {/* Seções dentro do Monitoramento */}
              <Route path="/monitoring/configure/:id/sections" element={<SectionList />} />

              {/* Adicionar Seção */}
              <Route path="/monitoring/add-section/:id" element={<MonitoringAddSection />} />
              <Route path="/monitoring/edit/:id" element={<MonitoringEdit />} />
              {/* Quizzes */}
              <Route path="/quizzes" element={<QuizzesPage />} />
              <Route path="/quizzes/register" element={<QuizRegister />} />
              <Route path="/quizzes/edit/:id" element={<EditQuiz />} />

              {/* Missões */}
              <Route path="/missions" element={<MissionsPage />} />
              <Route path="/missions/register" element={<MissionRegister />} />
              <Route path="/missions/edit/:id" element={<EditMission />} />

              {/* Rota padrão (redireciona para /home) */}
              <Route path="/" element={<Navigate to="/home" replace />} />
              <Route path="*" element={<Navigate to="/home" replace />} />
            </Routes>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Routers;