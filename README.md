# Frontend (simple)

Este directorio contiene un frontend mínimo y un proxy para consumir la API de `movies-api` alojada detrás del load balancer.

Cómo usar (Windows cmd.exe):

1. Abrir cmd y situarse en la carpeta `frontend` del repo:

   cd /d C:\Users\vvalen\Desktop\6hd\Utec\2025-2\cloud\tareaParcial\all-cloud-back-apis\frontend

2. Instalar dependencias:

   npm install

3. Arrancar el servidor (sirve la página y reenvía `/api/*` al load balancer):

   npm start

4. Abrir en el navegador: http://localhost:5173

Notas:
- El proxy evita problemas CORS redirigiendo las llamadas `/api` al LB (http://lb-prod-proy-134029330.us-east-1.elb.amazonaws.com:3001).
- Si prefieres habilitar CORS directamente en la API, puedo darte el patch correspondiente.

Despliegue en AWS Amplify
-------------------------

1) Ya subiste el repositorio a GitHub (u otro provider) y lo conectaste a Amplify Console.

2) Amplify usará `amplify.yml` en `frontend` para publicar archivos estáticos. El archivo ya está incluido y publica `frontend/public`.

3) Rewrites / Redirects (para proxear `/api/*` hacia el LB):
    - En Amplify Console > App settings > Rewrites and redirects, añadir una regla para redirigir rutas API al load balancer:

       Source address: /api/<*> 
       Target address: http://3.95.150.33:3001/<*> 
       Type: 200 (Rewrite)
       Condition: (Leave blank)

    - Esta regla hace que las peticiones del navegador a `https://<amplify-domain>/api/...` sean reescritas internamente hacia tu LB, evitando CORS.

4) Opcional: Si prefieres no usar Rewrite (por limitaciones), habilita CORS en el backend (añadiendo header Access-Control-Allow-Origin: *) y redeploy del `movies-api`.

Notas de seguridad: exponer el LB directamente desde un sitio público está bien para pruebas, pero en producción considera usar autenticación y HTTPS configurado en el LB.
