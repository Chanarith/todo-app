import { AppShell } from "@mantine/core"
import { Outlet } from "react-router"

export default function Main() {
  return (
    <AppShell padding="md">
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
