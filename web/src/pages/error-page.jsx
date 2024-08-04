import { AppShell } from "@mantine/core"
import { useRouteError } from "react-router-dom"

export default function ErrorPage() {
  const error = useRouteError()
  console.error(error)

  return (
    <AppShell id="error-page" padding="md">
      <AppShell.Main>
        <h1>Oops!</h1>
        <p>Sorry, an unexpected error has occurred.</p>
        <p>
          <i>{error.statusText || error.message}</i>
        </p>
      </AppShell.Main>
    </AppShell>
  )
}
