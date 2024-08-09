# CarXpress

Este proyecto presenta una API que simula una plataforma básica para la gestión de coches, usuarios y reseñas, diseñada principalmente para administradores y usuarios registrados. Su objetivo es facilitar la administración de un inventario de coches, junto con la posibilidad de que los usuarios interactúen mediante reseñas y votaciones. 


## Requisitos
Es necesario tener Node.js, npm, PostMan para hacer las pruebas con la API y MySQL instalado en tu entorno de desarrollo. Si prefieres una interfaz gráfica para interactuar con la base de datos, también puedes instalar MySQL Workbench (opcional).



## Instalación

      1. Clona el repositorio

             *******************************************

      2. Instala las dependencias

            `npm install`

      3. Inicia el servidor:

            `npm run dev`




## Configuración

Para configurar correctamente tu entorno de desarrollo, necesitas crear un archivo `.env` en la raíz del proyecto. Puedes utilizar el archivo `template.env` proporcionado como base.

### Variables de entorno

A continuación se describen todas las variables de entorno que debes configurar:

- `PORT`: El puerto en el que el servidor de la API estará escuchando .
  
- **Base de Datos:**
  - `DATASE_HOST`: La dirección del servidor MySQL.
  - `DATASE_PORT`: El puerto del servidor MySQL .
  - `DATABASE_NAME`: El nombre de la base de datos que utilizará la aplicación.
  - `DATABASE_USER`: El nombre de usuario de tu base de datos MySQL.
  - `DATABASE_PASSWORD`: La contraseña para tu usuario de MySQL.

- **JWT:**
  - `JWT_SECRET`: Una cadena secreta utilizada para firmar los tokens JWT.

- **Backend HTTP:**
  - `HTTP_BACKEND`: La URL del backend que se usará para conectar servicios o microservicios

- **SMTP (Email):**
  - `SMTP_HOST`: La dirección del servidor SMTP que se usará para enviar correos electrónicos.
  - `SMTP_PORT`: El puerto del servidor SMTP (ej. `587` para TLS).
  - `SMTP_USER`: El usuario del servidor SMTP, generalmente una dirección de correo electrónico.
  - `SMTP_PASS`: La contraseña para el servidor SMTP.
  - `SMTP_FROM`: La dirección de correo electrónico que aparecerá como remitente en los correos enviados.



## Funcionalidades principales

### 1. Gestión de usuarios

* **Registro y Login**:
      Permite a los nuevos usuarios registrarse y acceder a la plataforma.

* **Verificación de cuenta**:
      Tras el registro, se envía un correo electrónico al usuario con un enlace de  
       verificación. El usuario debe confirmar su cuenta antes de poder acceder 
      a la plataforma.

* **Activar usuario**:
      Funcionalidad destinada a activar la cuenta de un usuario registrado, una 
       vez que este ha verificado su cuenta.

* **Obtener información del perfil del usuario registrado**:
      Los usuarios pueden consultar y gestionar la información de su propio perfil.

* **Actualizar perfil de usuario**:
      Permite a los usuarios actualizar su información de perfil.

* **Actualizar imagen de perfil de usuario**:
      Los usuarios pueden cambiar su imagen de perfil.

* **Obenter las reseñas hechas por un usuario**:
      El administrador puede consultar todas las reseñas realizadas por un usuario específico.

* **Obtener todos los usuarios**:
      El administrador puede visualizar la lista completa de usuarios registrados en la plataforma.

* **Borrar usuario por su ID**:
      Exclusivo para adminitrador, permite eliminar la cuenta de un usuario



### 2. Gestion de coches

* **Obetner todas las marcas de los coches**: 
      Permite a cualquier usuario consultar un listado completo de todas las marcas de coches disponibles    en la plataforma.

* **Crear coche**:
      Solo el administrador tienen permiso para añadir un nuevo coche al inventario.

* **Obtener un coche por su ID**: 
      Cualquier usuario puede consultar la información detallada de un coche específico utilizando su ID.

* **Obtener todas las imágenes del coche por su ID**:
      Permite a los usuarios visualizar todas las imágenes asociadas a un coche específico.

* **Cargar imagen de un coche por su ID**:
      Solo el administrador pueden subir imágenes individuales a un coche específico

* **Cargar múltiples imágenes por su ID**:
      Permite al administrador subir varias imágenes al coche seleccionado.

* **Actualizar un coche por su ID**: 
      El administrador puede modificar la información de un coche específico.

* **Borrar un coche por su ID**:
      Exclusivo para administrador permite eliminar un coche del inventario.

* **Borrar la imagen de un coche por su ID de imagen**:
      Posibilidad de eliminar una imagen específica asociada a un coche.


### 3. Gestión de reseñas

* **Crear una reseña por el ID del coche**:
      Los usuarios registrados pueden escribir una reseña sobre un coche específico.

* **Obtener todas las reseñas por el ID del coche**:
      Permite visualizar todas las reseñas asociadas a un coche.

* **Obtener la media de votaciones por su ID**:
      Los usuarios pueden consultar la calificación promedio de un coche basado en las votaciones de las reseñas.

* **Borrar una reseña por su ID**:
      El administrador tiene la capacidad de eliminar una reseña específica.


## Acceso y roles

* **Administrador**:
      Tiene acceso completo a todas las funcionalidades de la aplicación, incluyendo la gestión de coches, usuarios y 
      reseñas.

* **Usuario registrado**:
      Puede consultar coches, crear reseñas, gestionar su perfil y realizar votaciones.


## Autenticación
En este proyecto se utiliza JWT para gestionar la autenticación. JWT es un estándar que permite transmitir información de manera segura en forma de un objeto JSON.

### Funcionamiento básico
1. **Generación del Token**: Cuando un usuario inicia sesión con éxito, el servidor genera un JWT que contiene información sobre el usuario.
2. **Envío del Token**: El JWT se envía al cliente como respuesta y se almacena para futuras solicitudes.
3. **Verificación del Token**: En solicitudes posteriores, el cliente envía el token en la cabecera de autorización. El servidor verifica la validez del token antes de conceder acceso a recursos protegidos.

Esto asegura que solo los usuarios autenticados puedan acceder a ciertas partes de la API.



## Conclusión
CarXpress es una API diseñada para simplificar la gestión de coches, usuarios y reseñas en una plataforma que puede ser utilizada tanto por administradores como por usuarios registrados. Gracias a su arquitectura flexible y las funcionalidades proporcionadas, tiene un control eficiente del inventario de vehículos y la interacción del usuario a través de reseñas.



## Agradecimientos
Este proyecto ha sido desarrollado como parte del Bootcampo de programación web full stack JavaScript , bajo la supervisión de profesorado y tutores. La colaboración y orientación de los docentes han sido fundamentales para el éxito del proyecto. Agradeciendo su apoyo y orientación durante el desarrollo de esta API.


