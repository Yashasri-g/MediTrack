import { http } from "./http";

export const PatientsAPI = {
  list: () => http.get("/api/patients/"),
  get: (id) => http.get(`/api/patients/${id}`),
  create: (data) => http.post("/api/patients/", data),
  update: (id, data) => http.put(`/api/patients/${id}`, data),
  remove: (id) => http.delete(`/api/patients/${id}`),
};