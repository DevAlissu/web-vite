import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { 
  getIoTDevices, createIoTDevice, updateIoTDevice, patchIoTDevice, deleteIoTDevice 
} from "../../services/IoTDevicesService";
import { IoTDevice } from "../../types/IoTDevice";

interface IoTDevicesContextType {
  devices: IoTDevice[];
  fetchDevices: () => Promise<void>;
  addDevice: (device: Partial<IoTDevice>) => Promise<void>;
  editDevice: (id: number, device: Partial<IoTDevice>) => Promise<void>;
  patchDevice: (id: number, device: Partial<IoTDevice>) => Promise<void>;
  removeDevice: (id: number) => Promise<void>;
}

const IoTDevicesContext = createContext<IoTDevicesContextType | undefined>(undefined);

export const IoTDevicesProvider = ({ children }: { children: ReactNode }) => {
  const [devices, setDevices] = useState<IoTDevice[]>([]);

  const fetchDevices = async () => {
    try {
      const data = await getIoTDevices();
      setDevices(data);
    } catch (error) {
      console.error("Error fetching IoT devices:", error);
    }
  };

  const addDevice = async (device: Partial<IoTDevice>) => {
    try {
      await createIoTDevice(device);
      await fetchDevices();
    } catch (error) {
      console.error("Error adding IoT device:", error);
    }
  };

  const editDevice = async (id: number, device: Partial<IoTDevice>) => {
    try {
      await updateIoTDevice(id, device);
      await fetchDevices();
    } catch (error) {
      console.error("Error updating IoT device:", error);
    }
  };

  const patchDevice = async (id: number, device: Partial<IoTDevice>) => {
    try {
      await patchIoTDevice(id, device);
      await fetchDevices();
    } catch (error) {
      console.error("Error patching IoT device:", error);
    }
  };

  const removeDevice = async (id: number) => {
    try {
      await deleteIoTDevice(id);
      await fetchDevices();
    } catch (error) {
      console.error("Error deleting IoT device:", error);
    }
  };

  useEffect(() => {
    fetchDevices();
  }, []);

  return (
    <IoTDevicesContext.Provider value={{ devices, fetchDevices, addDevice, editDevice, patchDevice, removeDevice }}>
      {children}
    </IoTDevicesContext.Provider>
  );
};

export const useIoTDevices = () => {
  const context = useContext(IoTDevicesContext);
  if (!context) {
    throw new Error("useIoTDevices must be used within an IoTDevicesProvider");
  }
  return context;
};