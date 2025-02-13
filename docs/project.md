# Plataforma de Desarrollo Empresarial con Custom GPTs

Este documento describe de manera general la arquitectura, funcionalidades y proceso de implementación de una plataforma destinada a empresarios y emprendedores que deseen elaborar de forma ordenada metodologías que puedan aplicar en su negocio (ejemplo: estrategia, marketing, transformación digital) al momento de registrarse debe seleccionar el programa que va a tomar. La aplicación integra metodologías de desarrollo empresarial, donde el empresario consume contenido educativo y accede a actividades de avance donde interactúa con Custom GPTs para guiar al usuario de manera práctica y personalizada en la aplicación de las etapas de la metodología escogida.

---

## 1. Propósito General

El proyecto busca ofrecer un entorno en línea en el que los empresarios puedan:
- Acceder a programas de desarrollo basados en metodologías consolidadas.
- Avanzar por etapas secuenciales en la metodología seleccionada
- Recibir orientación de Custom GPTs, que generan sugerencias y validan ideas a partir del contexto acumulado.
- Consolidar toda la información en un documento estratégico dinámico y colaborativo.

---

## 2. Estructura y Funcionalidades Principales

### 2.1 Programas y Etapas
- **Programas**: Cada uno corresponde a un marco metodológico (p. ej. estrategia corporativa, emprendimiento, innovación).
- **Etapas**: Subdivisiones lógicas de la metodología escogida (ejemplo: identidad, propuesta de valor, jobs to be done, etc.) que se van completando de manera secuencial.
- **Custom GPTs por Etapa**: Prompts específicos que ayudan a aplicar las diferentes etapas del proceso a los empresarios y que tienen acceso al contexto acumulado, para dar retroalimentación precisa basada en los avances ya realizados.

### 2.2 Orquestador de Flujo
- **Función Principal**: Controlar el progreso del usuario, habilitando el paso a la siguiente etapa solo cuando la anterior esté completada.
- **Validaciones**: Evitar inconsistencias entre etapas y asegurar la coherencia del documento estratégico.

### 2.3 Repositorio Central de Contexto
- **Almacenamiento y Consulta**: Actúa como fuente única de información sobre el negocio, incluyendo respuestas del auto diagnóstico, insights generados y estado de avance.
- **Actualización Constante**: Almacena los datos de cada etapa, para que cada GPT consulte la información más reciente.

### 2.4 Interfaz de Usuario
- **Menú Lateral**: Muestra los programas y etapas disponibles, así como el progreso.
- **Zona de Trabajo**: Presenta el contenido educativo y habilita el chat con el Custom GPT a metida que avanza en el contenido, proporcionando retroalimentación y validación en las etapas, el customgpt es activado según la secuencia de la metodología, cuando se determine que hay una actividad.
- **Documento entregable**: Visualiza en tiempo real el documento estratégico, con opciones para crear, leer, actualizar y eliminar (CRUD) la información.
- **Sección “Saved Insights”**: Permite almacenar y reutilizar los hallazgos que el usuario quiera conservar.

---

## 3. Arquitectura Técnica

### 3.1 Backend
- **Tecnologías Base**: Node.js y PostgreSQL (alojado en Supabase).
- **Lógica de Negocio**:
  - Orquestar el flujo de etapas.
  - Gestionar el repositorio central de contexto.
  - Preparar y enviar datos a los Custom GPTs.

### 3.2 Frontend
- **Stack**: Next.js + React.
- **Funcionalidades Clave**:
  - Interfaz responsiva para guiar al usuario.
  - Integración de WebSockets para recibir respuestas de OpenAI en tiempo real.
  - Comunicación con el backend para actualizar y consultar información.

### 3.3 Custom GPTs
- **Prompts Especializados**: Cada etapa se configura con un prompt que considera el contexto de las etapas previas y la información del auto diagnóstico.
- **Contexto Acumulado**: Consultan el repositorio central para mantener la consistencia de las recomendaciones y evitar repeticiones o contradicciones.

---

## 4. Flujo de Usuario

1. **Inicio y Registro**  
   - El usuario crea una cuenta y selecciona el programa en que va a participar o inicia sesión en la plataforma.
   - El sistema habilita la vista del programa en el cual el usuario está registrado

2. **Auto Diagnóstico**  
   - Recolecta información clave sobre el negocio (sector, oportunidades, retos, etc.).
   - Sirve como base inicial para personalizar la orientación de los Custom GPTs.

3. **Avance por Etapas**  
   - Cada etapa presenta:
     - Contenido educativo introductorio.
     - Un diálogo con el GPT, orientado por preguntas y prompts específicos.
     - Insights que el usuario puede editar y aprobar, integrándose automáticamente al documento entregable.

4. **Seguimiento y Ajustes**  
   - El repositorio central permite a los GPTs revisar la historia del negocio, propiciando recomendaciones coherentes y actualizadas.
   - El usuario puede revisar etapas anteriores, refinar información y ver cómo se actualiza el documento estratégico.


---

## 5. Consideraciones y Mejores Prácticas

- **Seguridad y Privacidad**: Resulta crítico proteger la información del negocio y aplicar buenas prácticas de cifrado y administración de accesos.
- **Modularidad y Escalabilidad**: La plataforma debe permitir la incorporación de nuevos programas de desarrollo sin afectar el flujo global.
- **Gestión de Calidad de Datos**: Mantener el repositorio central ordenado, con estructuras definidas y validaciones que aseguren coherencia en toda la información almacenada.
- **Actualización y Mantenimiento**: Los prompts y la configuración de los GPTs deben revisarse periódicamente para reflejar la evolución del mercado y la metodología.
