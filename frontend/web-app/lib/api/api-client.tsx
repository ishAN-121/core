import BlockData from "@/types/BlockData";
import ServiceMetadata from "@/types/ServiceMetadata";
import axios from "axios";

const API_BASE_URL = "https://api.example.com";

export async function fetchTodos() {
  const response = await fetch(`${API_BASE_URL}/todos`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function fetchTodoById(id: string) {
  const response = await fetch(`${API_BASE_URL}/todos/${id}`);
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function storeMetadata(data: ServiceMetadata) {
  try {
    const response = await axios.post(`${API_BASE_URL}/metadata`, data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchMetadata() {
  try {
    const response = await axios.get(`${API_BASE_URL}/metadata`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
export async function storeBlockData(data: BlockData) {
  try {
    const response = await axios.post(`${API_BASE_URL}/blockdata`, data);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}

export async function fetchBlockData() {
  try {
    const response = await axios.get(`${API_BASE_URL}/blockdata`);
    return response.data;
  } catch (e) {
    console.error(e);
  }
}
