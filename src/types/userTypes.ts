export type TUser = {
    _id: string;
    name: string;
    email: string;
    role: 'user' | 'admin'; // Add other roles if applicable
    deactivated: boolean;
    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
    __v: number;
  };
  