// src/router/Routers.tsx
import { Routes, Route, Navigate, Outlet } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";

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

// Monitoramento (NansenIC)
import MonitoringPage from "../pages/monitoring/Monitoring";
import MonitoringRegister from "../pages/monitoring/components/MonitoringForm";
import MonitoringConfigure from "../pages/monitoring/components/MonitoringConfigure";
import MonitoringAddSection from "../pages/monitoring/components/MonitoringAddSection";
import MonitoringEdit from "../pages/monitoring/components/MonitoringEdit";
import SectionList from "../pages/monitoring/components/SectionList";
import SectionEdit from "../pages/monitoring/components/SectionEdit";

// Monitoramento (NansenSensor – mock)
import MonitoringSensor from "../pages/monitoring-sensor/MonitoringSensor";
import MonitoringSensorForm from "../pages/monitoring-sensor/components/MonitoringForm";
import MonitoringConfigureSensor from "../pages/monitoring-sensor/components/MonitoringConfigure";
import MonitoringAddSectionSensor from "../pages/monitoring-sensor/components/MonitoringAddSection";
import MonitoringSensorEdit from "../pages/monitoring-sensor/components/MonitoringEdit";
import SectionEditSensor from "../pages/monitoring-sensor/components/SectionEdit";

// Loja
import LojaProductsPage from "../pages/loja/LojaProducts";
import LojaProductsRegister from "../pages/loja/LojaProductsRegister";
import LojaProductsEdit from "../pages/loja/LojaProductsEdit";

// Quizzes
import QuizzesPage from "../pages/quizzes/Quizzes";
import QuizRegister from "../pages/quizzes/quizregister/Register";
import EditQuiz from "../pages/quizzes/components/EditQuiz";

// Missões
import MissionsPage from "../pages/missions/Missions";
import MissionRegister from "../pages/missions/missionregister/Register";
import EditMission from "../pages/missions/components/EditMission";

// Energia: Gestão de Faturamento
import EnergyBillingList from "../pages/energyBilling/EnergyBillingList";
import EnergyBillingForm from "../pages/energyBilling/EnergyBillingForm";

export default function Routers() {
  return (
    <Routes>
      {/* Rota pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Bloco de rotas protegidas */}
      <Route
        element={
          <ProtectedRoute>
            <Outlet />
          </ProtectedRoute>
        }
      >
        {/* Home */}
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
        <Route
          path="/production-lines/register"
          element={<ProductionLinesRegister />}
        />
        <Route
          path="/production-lines/edit/:id"
          element={<ProductionLinesEdit />}
        />

        {/* Monitoramento (NansenIC) */}
        <Route path="/monitoring" element={<MonitoringPage />} />
        <Route path="/monitoring/register" element={<MonitoringRegister />} />
        <Route
          path="/monitoring/configure/:id"
          element={<MonitoringConfigure />}
        />
        <Route
          path="/monitoring/configure/:id/sections"
          element={<SectionList />}
        />
        <Route
          path="/monitoring/add-section/:id"
          element={<MonitoringAddSection />}
        />
        <Route path="/monitoring/edit/:id" element={<MonitoringEdit />} />
        <Route path="/monitoring/edit-section/:id" element={<SectionEdit />} />

        {/* Monitoramento (NansenSensor) */}
        <Route path="/sensor-monitoring" element={<MonitoringSensor />} />
        <Route
          path="/sensor-monitoring/register"
          element={<MonitoringSensorForm />}
        />
        <Route
          path="/sensor-monitoring/configure/:id"
          element={<MonitoringConfigureSensor />}
        />
        <Route
          path="/sensor-monitoring/add-section/:id"
          element={<MonitoringAddSectionSensor />}
        />
        <Route
          path="/sensor-monitoring/edit/:id"
          element={<MonitoringSensorEdit />}
        />
        <Route
          path="/sensor-monitoring/edit-section/:id"
          element={<SectionEditSensor />}
        />

        {/* Loja */}
        <Route path="/loja" element={<LojaProductsPage />} />
        <Route path="/loja/register" element={<LojaProductsRegister />} />
        <Route path="/loja/edit/:id" element={<LojaProductsEdit />} />

        {/* Quizzes */}
        <Route path="/quizzes" element={<QuizzesPage />} />
        <Route path="/quizzes/register" element={<QuizRegister />} />
        <Route path="/quizzes/edit/:id" element={<EditQuiz />} />

        {/* Missões */}
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/missions/register" element={<MissionRegister />} />
        <Route path="/missions/edit/:id" element={<EditMission />} />

        {/* Energia: Gestão de Faturamento */}
        <Route path="/energy-billing" element={<EnergyBillingList />} />
        <Route
          path="/energy-billing/new"
          element={<EnergyBillingForm mode="create" />}
        />
        <Route
          path="/energy-billing/edit/:id"
          element={<EnergyBillingForm mode="edit" />}
        />
        <Route
          path="/energy-billing/view/:id"
          element={<EnergyBillingForm mode="view" />}
        />

        {/* Redirecionamentos */}
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="*" element={<Navigate to="/home" replace />} />
      </Route>
    </Routes>
  );
}
