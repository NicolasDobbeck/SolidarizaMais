import axios from "axios";

const API_KEY = "c4af8e9c-9f4c-433b-8622-7231b46e65d1";

export interface Project {
  id: number;
  title: string;
  summary: string;
  image: {
    imagelink: { url: string }[];
  };
  projectLink: string;
}

const api = axios.create({
  baseURL: "https://api.globalgiving.org/api/public/projectservice",
  headers: {
    Accept: "application/json",
  },
  params: {
    api_key: API_KEY,
  },
});

export async function getProjects(): Promise<Project[]> {
  const response = await api.get("/all/projects", {
    params: { format: "json" },
  });
  return response.data.projects.project;
}