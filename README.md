# IngSoft1 - Practica de Backend

Backend

## Tecnologías

- Node.js y Express 5
- MongoDB con Mongoose
- JWT (`jsonwebtoken`) para autenticación
- `bcrypt` para el hash de contraseñas
- `dotenv` para variables de entorno

## Requisitos previos

- [Node.js](https://nodejs.org/) 20 o superior
- Una base de datos MongoDB: local o en [MongoDB Atlas](https://www.mongodb.com/atlas)
- [Postman](https://www.postman.com/) (opcional, para probar los endpoints)

## Instalación

1. Clona el repositorio e ingresa a la carpeta:

   ```bash
   git clone https://github.com/Gekokeso/IngSoft1.git
   cd IngSoft1
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Crea tu archivo de variables de entorno a partir del ejemplo. Debe quedar en la raíz del proyecto, junto a `package.json`:

   ```bash
   # macOS / Linux
   cp .env.example .env

   # Windows (PowerShell)
   Copy-Item .env.example .env
   ```

4. Abre `.env` y reemplaza los valores de ejemplo por los tuyos

5. Inicia el servidor:

   ```bash
   # Modo desarrollo (se reinicia al guardar cambios, usa nodemon)
   npm run server

   # Modo normal
   npm start
   ```

   Si todo sale bien, verás en la consola:

   ```
   servidor iniciado en el puerto http://localhost:5000
   Mongo DB Connected: <host>
   ```

> Si `npm run server` no reconoce `nodemon`, instálalo con `npm install -g nodemon` o usa `npm start`.

## Autenticación

Las rutas protegidas requieren el token que devuelve el login en el header `Authorization`:

```
Authorization: Bearer <token>
```

Los tokens expiran a los 30 días. Cada login genera un token nuevo, y los anteriores siguen siendo válidos hasta que expiren.

## Endpoints

URL base: `http://localhost:5000`

### Usuarios

| Método | Ruta | Auth | Descripción |
|---|---|---|---|
| POST | `/api/users/register` | No | Registra un usuario nuevo |
| POST | `/api/users/login` | No | Inicia sesión y devuelve un token |
| GET | `/api/users/datos` | Sí | Devuelve los datos del usuario del token |

**POST `/api/users/register`**

```json
{
  "nombre": "Pedro",
  "email": "pedro@test.com",
  "password": "123456"
}
```

Respuestas: `201 Created` si se registra, `400 Bad Request` si faltan datos o el email ya existe.

**POST `/api/users/login`**

```json
{
  "email": "pedro@test.com",
  "password": "123456"
}
```

Respuesta `200 OK`:

```json
{
  "_id": "6ae6a3071b27fc20a4eecb9e",
  "nombre": "Pedro",
  "email": "pedro@test.com",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

Con credenciales incorrectas responde `403 Forbidden`.

**GET `/api/users/datos`**

Requiere Bearer Token. Responde `200 OK` con los datos del usuario (sin contraseña) o `401 Unauthorized` si el token falta o es inválido.

### Tareas

Todas las rutas de tareas requieren Bearer Token. Sin token, o con un token alterado, responden `401 Unauthorized`.

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/tareas` | Lista las tareas del usuario autenticado |
| POST | `/api/tareas` | Crea una tarea |
| PUT | `/api/tareas/:id` | Modifica una tarea propia |
| DELETE | `/api/tareas/:id` | Elimina una tarea propia |

**POST `/api/tareas`**

```json
{
  "descripcion": "Estudiar para el examen"
}
```

Respuestas: `201 Created` con la tarea creada, o `400 Bad Request` si falta la descripción.

**PUT `/api/tareas/:id`**

```json
{
  "descripcion": "Descripción actualizada"
}
```

Respuestas: `200 OK` con la tarea actualizada, `404 Not Found` si la tarea no existe, o `401 Unauthorized` si la tarea pertenece a otro usuario.

**DELETE `/api/tareas/:id`**

Respuestas: `200 OK` con `{ "id": "<id eliminado>" }`, `404 Not Found` si no existe, o `401 Unauthorized` si la tarea pertenece a otro usuario.

## Probar con Postman

1. Crea un Environment con las variables `baseUrl` (`http://localhost:5000`), `tokenPedro`, `tokenJuan` y `tareaId`.
2. En los requests con body, usa **Body → raw → JSON**.
3. En los requests protegidos, ve a **Authorization**, elige **Bearer Token** y escribe `{{tokenPedro}}` (solo el token, sin la palabra `Bearer`).
4. Para guardar el token automáticamente, pega esto en **Scripts → Post-response** del request de login:

   ```javascript
   pm.environment.set("tokenPedro", pm.response.json().token);
   ```

## Estructura del proyecto

```
backend/
├── config/db.js                  # Conexión a MongoDB
├── controllers/
│   ├── tareasController.js       # Lógica de tareas
│   └── usersController.js        # Registro, login y datos de usuario
├── middleware/
│   ├── authMiddleware.js         # Validación del Bearer Token 
│   └── errorMiddleware.js        # Manejo de errores
├── models/
│   ├── tareasModel.js            # Modelo de tareas para los Endpoints
│   └── usersModel.js             # Modelo de usuario para los Endpoints
├── routes/
│   ├── tareasRoutes.js
│   └── usersRoutes.js
└── server.js                     # Punto de entrada
```

## Scripts

| Comando | Descripción |
|---|---|
| `npm start` | Inicia el servidor con Node |
| `npm run server` | Inicia el servidor con nodemon (recarga automática) |

## Autor

Carlos A
