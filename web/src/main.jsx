import "@mantine/core/styles.css"
//
import React from "react"
import ReactDOM from "react-dom/client"
//
import { MantineProvider } from "@mantine/core"
import theme from "./theme.jsx"
//
import { router } from "./paths"
import { RouterProvider } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider theme={theme}>
        <RouterProvider router={router} />
      </MantineProvider>
    </QueryClientProvider>
  </React.StrictMode>
)
