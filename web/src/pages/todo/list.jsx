import {
  Alert,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Paper,
  Text,
  TextInput,
  Title,
} from "@mantine/core"

import * as useTodoQuery from "../../hooks/queries/todo.query"
import { useState } from "react"
import { useForm } from "@mantine/form"
import { IconInfoCircle } from "@tabler/icons-react"

export default function List() {
  const [hoveredTodo, setHoveredTodo] = useState(null)
  const [selectedTodo, setSelectedTodo] = useState(null)

  const isEditing = selectedTodo !== null

  const {
    data: todosResponse,
    isLoading: todosLoading,
    isError: todosError,
    isSuccess: todosSuccess,
  } = useTodoQuery.list()

  const createTodoMutation = useTodoQuery.create()

  const editTodoMutation = useTodoQuery.edit(selectedTodo)

  const removeTodoMutation = useTodoQuery.remove(selectedTodo)

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      title: "",
    },
    validate: {
      title: (value) => {
        if (!value) {
          return "Todo cannot be empty"
        }
      },
    },
  })

  const handleFormSubmit = (values) => {
    if (isEditing) {
      editTodoMutation.mutate({ data: values })
      setSelectedTodo(null)
      form.reset()
    } else {
      createTodoMutation.mutate(values)
      form.reset()
    }
  }

  const handleDeleteTodo = () => {
    removeTodoMutation.mutate()
  }

  return (
    <Container size="md">
      <Paper shadow="md" p="sm">
        <Flex justify="left" direction="column" rowGap="md">
          <Title order={2}>Todo List</Title>
          <Alert
            variant="light"
            color="blue"
            title="Guides"
            icon={<IconInfoCircle />}
          >
            1. Hover over a todo to see edit and remove buttons
            <br />
            2. Click on edit to change todo title and `Enter` to save
            <br />
            3. Click on remove to delete todo
            <br />
            4. To add a new todo, type in the input and press `Enter`
          </Alert>
          <form onSubmit={form.onSubmit(handleFormSubmit)}>
            <TextInput
              key={form.key("title")}
              autoFocus
              placeholder="Add todo"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.target.dispatchEvent(
                    new Event("submit", { cancelable: true })
                  )
                }
              }}
              {...form.getInputProps("title")}
            />
          </form>
          <form>
            <TextInput placeholder="Filter fuzzy" />
          </form>
          <Flex direction="column" justify="center">
            {todosLoading && <Text>Loading...</Text>}
            {todosError && <Text c="red">Failed to load todos</Text>}
            {todosSuccess &&
              todosResponse.data?.map((todo) => (
                <Flex
                  key={todo.id}
                  align="baseline"
                  justify="space-between"
                  onMouseOver={() => setHoveredTodo(todo.id)}
                  onMouseLeave={() => {
                    setHoveredTodo(null)
                  }}
                  columnGap="md"
                >
                  <Box
                    flex={10}
                    mt="md"
                    p="lg"
                    style={{
                      border:
                        selectedTodo === todo.id
                          ? "1px solid blue"
                          : "1px solid #ccc",
                      borderRadius: 5,
                    }}
                  >
                    <Box>
                      <Text tt="capitalize" size="md">
                        {todo.title}
                      </Text>
                    </Box>
                  </Box>
                  <Flex
                    gap="md"
                    flex={2}
                    display={hoveredTodo === todo.id ? "flex" : "none"}
                  >
                    <Button
                      type="button"
                      color="blue"
                      onClick={() => {
                        if (selectedTodo === todo.id) {
                          setSelectedTodo(null)
                          form.reset()
                          return
                        }
                        setSelectedTodo(todo.id)
                        form.setFieldValue("title", todo?.title)
                        form.getInputNode("title").focus()
                      }}
                    >
                      {selectedTodo === todo.id ? "Clear" : "Edit"}
                    </Button>
                    <Button
                      type="button"
                      color="red"
                      variant="outline"
                      onClick={handleDeleteTodo}
                    >
                      Remove
                    </Button>
                  </Flex>
                </Flex>
              ))}
          </Flex>
          <Divider />
        </Flex>
      </Paper>
    </Container>
  )
}
