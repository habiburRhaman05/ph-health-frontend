import { IAppointment } from "./appointment";

export interface IPayment {
  id: string;
  appoitnmentId: string; 
  amount: number;
  transactionId: string;
  status: 'PENDING' | 'COMPLETE';
  paymentGatewayData?: Record<string, any> | null; 
  createdAt: Date;
  updatedAt: Date;
  // Optional Relation
  appointment?: IAppointment;
}