import axios from "@/config/axios";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  address: string;
  invoices: {
    id: string;
    createAt: string;
    userId: string;
    items: {
      id: string;
      quantity: number;
      sugar: number;
      ice: number;
      price: number;
      attribute: string;
    }[];
  }[];
};

export type CreateCustomer = {
  name: string;
  phone?: string;
  address?: string;
};

export type UpdateCustomer = {
  name?: string;
  phone?: string;
  address?: string;
};

export const getCustomers = async () => {
  return await axios
    .get<{ data: Customer[] }>("/customers")
    .then((res) => res.data.data);
};

export const createCustomer = async (customer: CreateCustomer) => {
  return await axios
    .post<{ data: Customer }>("/customers", customer)
    .then((res) => res.data.data);
};

export const updateCustomer = async (id: string, customer: UpdateCustomer) => {
  return await axios
    .put<{ data: Customer }>("/customers/" + id, customer)
    .then((res) => res.data.data);
};
