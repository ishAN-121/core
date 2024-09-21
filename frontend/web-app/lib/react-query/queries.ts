import { useQuery } from "@tanstack/react-query";
import { fetchTodos, fetchTodoById, fetchMetadata } from "../api/api-client";

export function useTodos() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: fetchTodos,
  });
}

export function useTodo(id: string) {
  return useQuery({
    queryKey: ["todo", id],
    queryFn: () => fetchTodoById(id),
  });
}

export function useServiceMetadata() {
  return useQuery({
    queryKey: ["metadata"],
    queryFn: fetchMetadata,
  });
}

// export function useServiceMetadataById(id: string) {
//   return useQuery({
//     queryKey: ['metadata', id],
//     queryFn: () => fetchMetadata(id),
//   })
// }
