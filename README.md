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
