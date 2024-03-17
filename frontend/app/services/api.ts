import axios from "axios";
import CreateCustomerProps from "../interfaces/ICreateUser";

export const api = axios.create({
  baseURL: "http://localhost:2358/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCustomer = async (data: CreateCustomerProps) => {
  return await api.post("users", data);
};

export const getCustomers = async () => {
  return await api.get("users");
};

export const deleteCustomer = async (id: string) => {
  return await api.delete(`users/${id}`);
};
