# Changelog

## [0.1.0] - 2025-02-13

### Estructura Inicial del Proyecto
- [x] Add: Configuración inicial de Next.js con App Router
- [x] Add: Componentes de navegación (MainNav)
- [x] Add: Componente Header
- [x] Add: Estilos globales y tema de la aplicación
- [x] Edit: Página principal con diseño moderno y responsivo
- [x] Add: Documentación del esquema de base de datos en /docs/schema.md

### Cambios en la Estructura
- [x] Edit: Actualización del layout.tsx para soporte multilenguaje (español)
- [x] Edit: Configuración de metadatos de la aplicación
- [x] Add: Sistema de navegación principal

### Estilos y UI
- [x] Add: Variables CSS para tema claro/oscuro
- [x] Add: Estilos base para componentes UI
- [x] Add: Integración de fuentes Geist

### Autenticación y Registro
- [x] Add: Página de registro (/registro)
- [x] Add: Página de inicio de sesión (/login)
- [x] Add: Formularios de autenticación con validación
- [x] Add: Integración de iconos de Lucide React
- [x] Add: Integración con Supabase Auth
- [x] Add: Gestión de perfiles de usuario
- [x] Add: Manejo de sesiones y tokens
- [x] Add: Hook personalizado useAuth para gestión de autenticación
- [x] Add: Store de autenticación con Zustand
- [x] Add: Migración de base de datos para autenticación
- [x] Add: Tipos TypeScript para la base de datos
- [x] Add: Enlaces de navegación entre login y registro
- [x] Add: Página de dashboard con menú principal
- [x] Add: Políticas de seguridad RLS para perfiles

### Programas y Etapas
- [x] Add: Tipos TypeScript para el modelo de datos
- [x] Add: Página de listado de programas (/programas)
- [x] Add: Página de detalle de programa (/programas/[id])
- [x] Add: Visualización de etapas por programa
- [x] Add: Iconos y estados para las etapas del programa

### Gestión de Estado Global
- [x] Add: Instalación y configuración de Zustand
- [x] Add: Store de autenticación (useAuthStore)
- [x] Add: Store de progreso del usuario (useProgressStore)
- [x] Add: Store de programas y etapas (useProgramStore)
- [ ] Add: Persistencia de estado con zustand/middleware

### Componentes
- [x] Add: ProgramCard para mostrar información del programa
- [x] Add: Estados de carga y error en componentes
- [x] Add: Animaciones de carga (skeleton)
- [x] Add: Componente StageCard para mostrar el estado de cada etapa

### Hooks Personalizados
- [x] Add: Hook de autenticación (useAuth)
- [ ] Add: Hook de progreso (useProgress)
- [ ] Add: Hook de programas (useProgram)
- [ ] Add: Integración con la API
- [ ] Add: Manejo de errores y estados de carga

### Etapas y Custom GPTs
- [ ] Add: Componente de chat (ChatWindow)
- [ ] Add: Componente de contenido de etapa (StageContent)
- [ ] Add: Página de etapa individual (/programas/[id]/etapas/[stageId])
- [ ] Add: Integración con Custom GPTs
- [ ] Add: Sistema de insights y retroalimentación

### Base de Datos y Supabase
- [x] Add: Configuración del cliente de Supabase
- [x] Add: Tabla de perfiles de usuario
- [x] Add: Tabla de programas y etapas
- [x] Add: Tabla de progreso del usuario
- [x] Add: Tabla de insights y retroalimentación
- [x] Add: Políticas de seguridad RLS
- [x] Add: Triggers para actualización automática de timestamps
- [x] Add: Tabla de control de acceso a programas (program_access)
- [x] Add: Roles de usuario (admin/user)
- [x] Add: Políticas RLS para control de acceso

## [Unreleased]

- [x] Add: Página de detalle del programa con visualización de etapas
- [x] Add: Integración con el sistema de progreso del usuario
- [x] Add: Indicadores visuales de etapas completadas, bloqueadas y actuales
- [x] Add: Navegación entre etapas del programa
