import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000/api" });

export const getPolicies = () => API.get("/policies");
export const addPolicy = (data) => API.post("/policies", data);

export const uploadInvoice = (formData) =>
  API.post("/gst/upload", formData, { headers: { "Content-Type": "multipart/form-data" } });
export const getFilings = () => API.get("/gst");

export const getSuppliers = () => API.get("/suppliers");
export const addSupplier = (data) => API.post("/suppliers", data);
export const updateSupplier = (id, data) => API.put(`/suppliers/${id}`, data);
