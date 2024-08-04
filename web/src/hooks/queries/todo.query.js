import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import * as todoApi from "../../api/todo.api"

function list() {
  const query = useQuery({
    queryKey: ["todos"],
    queryFn: todoApi.list,
  })

  return query
}

function get(id) {
  const query = useQuery({
    queryKey: ["todos", id],
    queryFn: todoApi.get,
  })

  return query
}

function create() {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["todos"],
    mutationFn: todoApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  return mutation
}

function edit(id) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["todos", id],
    mutationFn: async (payload) => {
      await todoApi.edit(id, payload.data)
    },
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  return mutation
}

function remove(id) {
  const queryClient = useQueryClient()
  const mutation = useMutation({
    mutationKey: ["todos", id],
    mutationFn: todoApi.remove,
    onSuccess: () => {
      queryClient.invalidateQueries("todos")
    },
  })

  return mutation
}

export { list, get, create, edit, remove }
