# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh



Configuración y Ejecución del Frontend
Sigue estos pasos para configurar y ejecutar el frontend:

Paso 1: Instalar Dependencias
Clona el repositorio o descarga el proyecto.
Navega al directorio del backend en tu terminal.
Ejecuta el siguiente comando para instalar las dependencias necesarias:
npm install
Paso 2: Ejecutar el Frontend
Una vez que las dependencias estén instaladas, ejecuta el siguiente comando para iniciar el servidor de desarrollo:

npm run dev
Esto debería iniciar el servidor de desarrollo y podrás acceder a la aplicación en el navegador en http://localhost:3000 (o el puerto que hayas configurado).

Estructura de Carpetas
La estructura de carpetas del frontend está organizada de la siguiente manera:

/frontend
│
├── /assets                 # Archivos estáticos como imágenes, iconos, fuentes, etc.
│
├── /components             # Componentes reutilizables de la interfaz de usuario (UI)
│   ├── /dashboard          # Componentes relacionados con el panel de control
│   ├── /Landing            # Componentes de la página de inicio
│   ├── /navbar             # Componente de la barra de navegación
│   └── /notFound           # Componente para manejar páginas no encontradas
│
├── /services               # Servicios que interactúan con el backend
│   ├── /Registros          # Servicio relacionado con la gestión de registros de contactos
│   └── /Usuarios           # Servicio para la gestión de usuarios 
│
├── /views                  # Vistas principales de la aplicación
│   ├── /Registros          # Vistas para gestionar registros de contactos
│   │   ├── /crear          # Vista para crear un nuevo registro de contacto
│   │   └── /listar         # Vista para listar los contactos existentes
│   └── /Usuario            # Vistas relacionadas con la gestión de usuarios 
│       ├── /Listar         # Vista para listar usuarios
│       └── /Registrar      # Vista para registrar un nuevo usuario
│
├── package.json            # Archivo de configuración de npm con dependencias del frontend
└── README.md               # Este archivo
Descripción de los Archivos/Directorios:
/assets: Contiene archivos estáticos que se utilizan en la interfaz de usuario, como imágenes, fuentes y otros recursos multimedia.

/components: Componentes reutilizables de la interfaz de usuario.

/dashboard: Contiene los componentes relacionados con el panel de control de la aplicación.
/Landing: Contiene los componentes de la página principal de la aplicación.
/navbar: Componente de la barra de navegación.
/notFound: Componente que maneja la visualización de páginas no encontradas (404).
/services: Contiene servicios que interactúan con el backend para realizar operaciones como CRUD (crear, leer, actualizar, eliminar) de contactos o usuarios.

/Registros: Servicio que maneja las operaciones relacionadas con los registros de contactos.
/Usuarios: Servicio que maneja las operaciones relacionadas con la gestión de usuarios .
/views: Las vistas de la aplicación, que definen las páginas principales.

/Registros: Vistas para crear y listar registros de contactos.
/crear: Vista para crear un nuevo registro de contacto.
/listar: Vista para listar los contactos existentes.
/Usuario: Vistas para gestionar usuarios.
/Listar: Vista para listar usuarios.
/Registrar: Vista para registrar un nuevo usuario.
package.json: Archivo que contiene las dependencias y scripts de npm para el frontend de la aplicación.


