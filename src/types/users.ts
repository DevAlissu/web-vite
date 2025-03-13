export interface UserItem {
    id: number;
    username: string;
    name: string;
    email: string;
    role: "ADMIN" | "GAME";
  }
  
 
  export interface UserRegister {
    username: string;
    name: string;
    email: string;
    password: string;
    role: "ADMIN" | "GAME";
  }