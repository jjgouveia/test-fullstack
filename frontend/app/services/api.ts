import axios from "axios";
import CreateCustomerProps from "../interfaces/ICreateUser";

export const api = axios.create({
  baseURL: "http://localhost:2358/api/v1/",
  headers: {
    "Content-Type": "application/json",
  },
});

export const createCustomer = async (data: CreateCustomerProps) => {
  try {
    return await api.post("users", data);
  } catch (error: any) {
    return error.response;
  }
};

export const getCustomers = async () => {
  return await api.get("users");
};

export const updateCustomer = async (id: string, data: CreateCustomerProps) => {
  try {
    return await api.patch(`users/${id}`, data);
  } catch (error: any) {
    return error.response;
  }
};

export const deleteCustomer = async (id: string) => {
  return await api.delete(`users/${id}`);
};
