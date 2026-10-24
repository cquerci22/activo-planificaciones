// ACTIVO PWA: sin cachear rutinas ni datos personales.
// La aplicación siempre consulta la red para mantener las planificaciones actualizadas.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => event.waitUntil(self.clients.claim()));
