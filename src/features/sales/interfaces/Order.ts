import { statusVariant } from "@/features/sales/constants/status-style";

export interface Order {
  id: string;
  customer: string;
  product: string;
  date: string;
  amount: number;
  status: keyof typeof statusVariant;
}
