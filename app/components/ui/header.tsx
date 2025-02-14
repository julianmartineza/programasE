import { MainNav } from "./navigation/main-nav"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center">
        <MainNav />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-2">
            {/* Aquí irán los botones de login/registro o perfil de usuario */}
          </nav>
        </div>
      </div>
    </header>
  )
}
