import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./contexts/auth/AuthContext";
import { UsersProvider } from "./contexts/users/UsersContext";
import { ProductsProvider } from "./contexts/products/ProductsContext";
import { EquipmentsProvider } from "./contexts/equipments/EquipmentsContext";
import { SectorsProvider } from "./contexts/sectors/SectorsContext";
import { ProductionLinesProvider } from "./contexts/productionLines/ProductionLinesContext";
import { IoTDevicesProvider } from "./contexts/iotDevice/IoTDeviceContext";
import App from "./App";


import "./index.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <ProductsProvider>
          <EquipmentsProvider>
            <UsersProvider>
              <SectorsProvider>
                <ProductionLinesProvider>
                  <IoTDevicesProvider>
                    <App />
                  </IoTDevicesProvider>
                </ProductionLinesProvider>
              </SectorsProvider>
            </UsersProvider>
          </EquipmentsProvider>
        </ProductsProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);