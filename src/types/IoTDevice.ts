export interface IoTDevice {
  id: number;
  name: string;
  deveui?: string | null; 
  type_device?: string | null; 
  equipement?: number | null;
}