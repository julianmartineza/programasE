import Link from 'next/link'

export function MainNav() {
  return (
    <div className="flex gap-6 md:gap-10">
      <Link href="/" className="flex items-center space-x-2">
        <span className="hidden font-bold sm:inline-block">
          Desarrollo Empresarial
        </span>
      </Link>
      <nav className="flex gap-6">
        <Link
          href="/programas"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Programas
        </Link>
        <Link
          href="/mi-progreso"
          className="transition-colors hover:text-foreground/80 text-foreground/60"
        >
          Mi Progreso
        </Link>
      </nav>
    </div>
  )
}
