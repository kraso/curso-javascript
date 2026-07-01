<div align="center">

![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React_18-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Remix](https://img.shields.io/badge/Remix_v2-000000?style=for-the-badge&logo=remix&logoColor=white)
![Tailwind_CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3FCF8E?style=for-the-badge&logo=supabase&logoColor=white)

# JavaScript está en tus manos

### Curso interactivo de JavaScript con editor de código en el navegador, sistema de progreso gamificado y sincronización en la nube

[![Deploy](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://javascript-learning-app.dev)
[![License](https://img.shields.io/badge/License-MIT-yellow?style=for-the-badge)](LICENSE)

</div>

---

## Descripción

**JavaScript está en tus manos** es una plataforma de aprendizaje web construida con Remix, React y Supabase. Ofrece 23 lecciones interactivas organizadas en 4 módulos progresivos, con un editor de código integrado que ejecuta y valida ejercicios en tiempo real, un sistema de insignias y puntos, y sincronización del progreso entre dispositivos.

Diseñada con enfoque mobile-first, modo oscuro/claro, y estándares WCAG AA de accesibilidad.

## Características

- **Editor interactivo** — Escribe y ejecuta JavaScript directamente en el navegador con resaltado de sintaxis y tests automáticos
- **23 lecciones en 4 módulos** — Desde fundamentos hasta algoritmos y estructuras de datos
- **Sistema de gamificación** — Insignias, puntos y barra de progreso por módulo
- **Sincronización en la nube** — Progreso guardado en Supabase, accesible desde cualquier dispositivo
- **Modo oscuro / claro** — Toggle con persistencia en localStorage
- **Totalmente responsivo** — Mobile-first con touch targets optimizados
- **Accesible** — Skip links, ARIA labels, focus-visible, prefers-reduced-motion
- **SEO optimizado** — Meta tags dinámicos, sitemap XML, robots.txt, JSON-LD

## Stack tecnológico

| Capa | Tecnología | Versión |
|------|-----------|---------|
| Framework | [Remix](https://remix.run) | ^2.16.5 |
| UI | [React](https://react.dev) | ^18.3.1 |
| Estilos | [Tailwind CSS](https://tailwindcss.com) | ^4.1.8 |
| Backend | [Supabase](https://supabase.com) | ^2.49.4 |
| Animaciones | [Framer Motion](https://www.framer.com/motion/) | ^12.7.4 |
| Iconos | [Lucide React](https://lucide.dev) | ^0.475.0 |
| Bundler | [Vite](https://vitejs.dev) | ^6.3.5 |

## Inicio rápido

### Requisitos

- Node.js >= 18
- npm o pnpm

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/kraso/curso-javascript.git
cd curso-javascript

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus credenciales de Supabase

# Iniciar servidor de desarrollo
npm run dev
```

### Variables de entorno

```env
VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
VITE_SUPABASE_ANON_KEY=tu-clave-anon
```

### Comandos disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción |
| `npm start` | Servidor de producción |
| `npm run lint` | Linting con oxlint |

## Estructura del proyecto

```
curso-javascript/
├── app/
│   ├── components/
│   │   ├── course/          # CodeEditor, LessonCard, SidebarNavigation, RewardBadge
│   │   ├── landing/         # Hero, Features, CourseOutline, CTA, AnimatedBackground
│   │   ├── layout/          # Navbar, Footer
│   │   ├── ui/              # Button, Modal, ProgressBar
│   │   ├── JsonLd.jsx       # Datos estructurados JSON-LD
│   │   └── SkipLink.jsx     # Skip link de accesibilidad
│   ├── data/
│   │   └── lessons.js       # 23 lecciones con ejercicios y tests
│   ├── hooks/
│   │   ├── useAuth.js       # Autenticación Supabase
│   │   ├── useProgress.js   # Progreso local + sincronización nube
│   │   └── useTheme.js      # Tema oscuro/claro con persistencia
│   ├── lib/
│   │   ├── supabase.js      # Cliente Supabase
│   │   ├── progress.js      # Lógica de progreso y sync
│   │   └── utils.js         # Utilidades (cn)
│   ├── routes/
│   │   ├── _index.jsx       # Landing page
│   │   ├── login.jsx        # Inicio de sesión
│   │   ├── registro.jsx     # Registro
│   │   ├── perfil.jsx       # Perfil de usuario
│   │   ├── curso.jsx        # Layout del curso
│   │   ├── curso._index.jsx # Índice de lecciones
│   │   ├── curso.$leccionId.jsx  # Lección individual
│   │   ├── sitemap[.]xml.jsx     # Sitemap dinámico
│   │   └── robots[.]txt.jsx      # Robots.txt
│   ├── styles/
│   │   └── global.css       # Estilos base + modo claro
│   ├── utils/
│   │   └── syntax.js        # Resaltado de sintaxis + parseMarkdown
│   ├── root.jsx             # Root layout
│   └── entry.*.jsx          # Entry points de Remix
├── public/
│   ├── docs/                # Material fuente de las 23 lecciones
│   ├── favicon.svg
│   ├── Privacidad.md
│   └── Terminos.md
├── .opencode/agents/        # Agentes SEO, accesibilidad, responsividad
└── supabase-migration.sql   # Migración de la tabla progreso_usuario
```

## Módulos del curso

| # | Módulo | Lecciones | Temas |
|---|--------|-----------|-------|
| 1 | **Fundamentos** | 7 | Qué es JS, Hola Mundo, Variables, Operadores, Control, Funciones |
| 2 | **Intermedio** | 7 | Objetos, Arrays, Funciones avanzadas, Closures, DOM, Eventos |
| 3 | **Avanzado** | 6 | Prototipos, Callbacks, Promesas, Async/Await, Módulos, Regex |
| 4 | **Especialización** | 3 | Algoritmos, Estructuras de datos, Proyecto práctico |

## Base de datos

Ejecuta el script `supabase-migration.sql` en el SQL Editor de Supabase para crear la tabla `progreso_usuario` con Row Level Security.

## Contribuir

1. Haz fork del repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Haz commit de tus cambios (`git commit -m 'feat: add new feature'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Autor

**Marcos Calabrés Ibáñez** — [marcoscalabresibaniez@gmail.com](mailto:marcoscalabresibaniez@gmail.com)

## Licencia

Este proyecto está bajo la licencia MIT. Consulta el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">

Hecho con ❤️ para la comunidad de aprendizaje de JavaScript

</div>
