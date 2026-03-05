# Visor 360 VR (TypeScript + Three.js)

Proyecto para visualizar una imagen 360 equirectangular (4000x2000) en desktop y en visores VR (Meta Quest 3) usando WebXR.

## Requisitos

- Node.js 18+
- Imagen 360 en formato equirectangular (2:1), en este caso: `PuenteSalleVR.png`

## Ejecutar en local

```bash
npm install
npm run dev
```

Vite mostrara una URL local (ejemplo `http://localhost:5173`) y una URL de red (`http://TU_IP:5173`).

## Ver en Meta Quest 3

WebXR (`immersive-vr`) requiere contexto seguro.

- En desktop, `localhost` suele funcionar para pruebas.
- En Quest, abre la app desde una URL HTTPS (por ejemplo, Netlify, Vercel, GitHub Pages con HTTPS) para que aparezca `Enter VR`.

Flujo recomendado:

1. Sube el proyecto a un hosting HTTPS.
2. Abre esa URL desde el navegador del Quest.
3. Pulsa `Enter VR`.
4. El movimiento de cabeza se rastrea automaticamente por WebXR.

## Build de produccion

```bash
npm run build
npm run preview
```

## Despliegue automatico con GitHub Actions

El proyecto ya incluye el workflow: `.github/workflows/deploy-pages.yml`.

Se activa en cada push a `main` y publica automaticamente en GitHub Pages.

### Activar en GitHub

1. Sube este proyecto a un repositorio en GitHub.
2. En GitHub entra a `Settings > Pages`.
3. En `Build and deployment`, selecciona `Source: GitHub Actions`.
4. Haz push a la rama `main`.
5. Espera a que termine el workflow `Deploy to GitHub Pages` en la pestaña `Actions`.

Al finalizar, la URL publicada aparecera en la configuracion de Pages y esa URL HTTPS sirve para abrir `Enter VR` desde Quest.

### Nota sobre rutas

`vite.config.ts` ajusta automaticamente `base` para GitHub Pages:

- Repositorio tipo `usuario.github.io`: publica en `/`
- Repositorio normal: publica en `/<nombre-repo>/`

## Archivos clave

- `src/main.ts`: escena, camara, renderer, carga de panorama, WebXR.
- `src/style.css`: estilos basicos.
- `PuenteSalleVR.png`: textura panoramica 360.
