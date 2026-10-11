# MediTurnos — Panel de usuario para reservas médicas

Front-end en React (Vite) con Context API y React Router, que consume la API REST pública de demostración JSONPlaceholder.

## Ejecutar
1. `npm install`
2. `npm run dev`
3. Abrir la dirección que muestra la terminal (normalmente http://localhost:5173). Se necesita conexión a internet.

Credenciales de prueba: usuario@mediturnos.com / 123456

## Arquitectura (separación de capas)
- `pages/` y `components/`: presentación
- `context/`: estado global (Context API)
- `services/`: peticiones HTTP con fetch (appointmentService.js)
- `utils/`: validaciones

## Endpoints (https://jsonplaceholder.typicode.com)
| Método | Ruta | Uso |
|---|---|---|
| GET | /posts?_limit=3 | Obtener las citas |
| DELETE | /posts/:id | Cancelar una cita |
| PATCH | /posts/:id | Reagendar una cita |

Nota: JSONPlaceholder es una API de demostración; responde correctamente pero no guarda los cambios de forma permanente. El inicio de sesión es simulado.


## Pruebas manuales recomendadas
1. Inicia sesión con `usuario@mediturnos.com` y `123456`.
2. Prueba un correo inválido y una contraseña incorrecta; deben mostrarse mensajes de validación.
3. Verifica que el panel cargue las tres citas de demostración.
4. Abre **Reagendar**, intenta guardar sin fecha/hora y selecciona una fecha pasada; la aplicación debe impedirlo.
5. Guarda una fecha futura y una hora entre 07:00 y 18:00; la tarjeta debe actualizarse a **Reagendada**.
6. Pulsa **Cancelar** y confirma; la tarjeta debe cambiar a **Cancelada** y los contadores deben actualizarse.
7. Cierra sesión y verifica que se regrese al inicio de sesión. Intenta abrir `/dashboard` directamente: debe redirigir al login.
8. Desconecta temporalmente internet y recarga para revisar el mensaje de error y el botón de reintento.

## Limitaciones conocidas
- El login es simulado y las credenciales están en el código: no usar como autenticación real ni con datos médicos reales.
- JSONPlaceholder es una API ficticia para prácticas; los cambios enviados por `PATCH` y `DELETE` no persisten al volver a consultar.
- Las citas, médicos, especialidades y fechas se generan localmente a partir de las primeras tres publicaciones de la API. No representan información clínica real.
