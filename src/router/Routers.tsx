import { Routes, Route, Navigate, useParams, useNavigate } from "react-router-dom";

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

// Seções dentro do Monitoramento
import SectionList from "../pages/monitoring/components/SectionList";

const Routers = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
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

      {/* Seções dentro do Monitoramento */}
      <Route path="/monitoring/configure/:id/sections" element={<SectionListWrapper />} />

      {/* Adicionar Seção */}
      <Route path="/monitoring/add-section/:id" element={<MonitoringAddSectionWrapper />} />

      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
};

// **Wrapper para Seções dentro do Monitoramento**
const SectionListWrapper = () => {
  const { id } = useParams();
  if (!id) return <p>Erro: ID não encontrado.</p>;

  return <SectionList monitoringId={parseInt(id)} />;
};

// **Wrapper para Adicionar Seção**
const MonitoringAddSectionWrapper = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) return <p>Erro: ID não encontrado.</p>;

  return (
    <div>
      <MonitoringAddSection
        visible={true}
        onClose={() => navigate(`/monitoring/configure/${id}`)}
        monitoringId={parseInt(id)}
      />
    </div>
  );
};

export default Routers;