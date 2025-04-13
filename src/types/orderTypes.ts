// types/order.types.ts (or any file you use for types)

import { TCar } from "./bannerTypes";

export type TOrder = {
  _id: string;
  customerEmail: string;
  car: TCar;
  quantity: number;
  totalPrice: number;
  orderStatus: "PENDING" | "CONFIRMED" | "PROCESSING" | "SHIPPED" | "DELIVERED";
  paymentStatus: "PAID" | "UNPAID" | "FAILED";
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryStart?: string;
  estimatedDeliveryEnd?: string;
};
