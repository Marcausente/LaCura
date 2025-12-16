# La Cura

**La Cura** es un proyecto transformador que ofrece un curso de psicología aplicada, diseñado tanto para empresarios como para personas que buscan un cambio real en sus vidas. Este programa es un viaje de autodescubrimiento y autenticidad, enfocado en ayudarte a:

- **Superarte a ti mismo:** Romper las barreras mentales que limitan tu crecimiento.
- **Entenderte profundamente:** Conectar con tu verdadera esencia y valores.
- **Llevar a cabo tus retos:** Adquirir la valentía y las herramientas necesarias para alcanzar tus objetivos personales y profesionales.

Es más que un curso; es una invitación a los "intrépidos" a desafiar el status quo y vivir con "loca valentía".

## Sobre el Proyecto

Este proyecto web sirve como la plataforma principal de **La Cura**. Originalmente concebido como un sitio estático, ha evolucionado hacia una **Aplicación de Página Única (SPA)** moderna, dinámica y escalable. La plataforma guía al usuario a través de la metodología del curso, presenta los beneficios, muestra testimonios reales y facilita el acceso al programa mediante pasarelas de pago y contenido exclusivo (Blog).

La interfaz ha sido cuidadosamente diseñada para reflejar la identidad visual de la marca: vibrante, moderna y humana, utilizando efectos visuales como _scroll reveal_ y _parallax_ para crear una experiencia de usuario inmersiva.

## Tecnologías Aplicadas

El proyecto ha sido refactorizado desde una base de código HTML/JS nativo a un ecosistema moderno basado en complementes de última generación:

- **[React](https://react.dev/):** Biblioteca principal para la construcción de la interfaz de usuario, permitiendo una arquitectura basada en componentes reutilizables (Hero, Beneficios, CTA, etc.) y una gestión eficiente del estado.
- **[Vite](https://vitejs.dev/):** Herramienta de construcción (bundler) de próxima generación, elegida por su velocidad extrema en el desarrollo y su optimización para producción.
- **React Router:** Implementado para gestionar la navegación fluida entre las diferentes secciones (Inicio, Blog, Pago) sin recargar la página, manteniendo la experiencia de una SPA.
- **CSS Moderno:** Estilos personalizados que aprovechan variables CSS, Flexbox y Grid para asegurar un diseño totalmente responsivo y fiel a la estética original.
- **Netlify (Despliegue):** Configurado para integración continua (CI/CD), con reglas de redirección específicas (`_redirects` / `netlify.toml`) para soportar el enrutamiento del lado del cliente.

## Instalación y Uso

Para ejecutar este proyecto localmente:

1.  **Clonar el repositorio:**

    ```bash
    git clone https://github.com/Marcausente/LaCura.git
    cd LaCura
    ```

2.  **Instalar dependencias:**

    ```bash
    npm install
    ```

3.  **Iniciar servidor de desarrollo:**

    ```bash
    npm run dev
    ```

4.  **Construir para producción:**
    ```bash
    npm run build
    ```
