import { createBrowserRouter } from "react-router-dom"
import { MainLayout } from "../layouts"
import { TodoList } from "../pages/todo"
import ErrorPage from "../pages/error-page"

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <TodoList />,
      },
    ],
  },
])

export { router }
