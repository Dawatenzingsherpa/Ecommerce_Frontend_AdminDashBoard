import { Status } from "./AuthTypes";

export interface User {
  id: string;
  email: string;
  username: string;
  role?: "admin" | "customer";
  createdAt?: string;
  updatedAt?: string;
}
export interface Category {
  id?: string;
  categoryName: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Product {
  id: string;
  productName: string;
  description: string;
  productPrice: number;
  productTotalStockQty: number;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  categoryId: string;
  User: User;
  Category: Category;
}

export enum PaymentMethod {
  Cod = "cod",
  Khalti = "khalti",
}
export enum PaymentStatus {
  Paid = "paid",
  Unpaid = "unpaid",
}

export interface PaymentDetails {
  id?: string;
  paymentMethod: PaymentMethod;
  paymentStatus?: PaymentStatus;
  pidx?: string;
}

export interface ItemDetail {
  productId: string;
  quantity: number;
}

export interface OrderResponseItem extends ItemDetail {
  orderId: string;
}

export enum OrderStatus {
  Pending = "pending",
  Delivered = "delivered",
  OntheWay = "ontheWay",
  Cancelled = "cancelled",
  Preparing = "preparing",
  All = "all",
}

export interface OrderDetails {
  id: string;
  quantity: number;
  orderId: string;
  productId: string;
  Product: Product;
  Order: OrderData;
}

export interface OrderData {
  id?: string;
  phoneNumber: string;
  shippingAddress: string;
  totalAmount: number;
  orderStatus?: OrderStatus;
  paymentId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  Payment: PaymentDetails;
  items: ItemDetail[];
  orderDetails?: OrderDetails[];
  User: User;
}

export interface InitialState {
  products: Product[];
  orders: OrderData[];
  users: User[];
  status: Status;
  categories: Category[];
}

export interface DeleteProduct {
  productId: string;
}
export interface DeleteUser {
  userId: string;
}
export interface DeleteOrder {
  orderId: string;
}
export interface DeleteCategory {
  categoryId: string;
}
