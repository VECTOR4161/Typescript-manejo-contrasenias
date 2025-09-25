# Sistema de gestión de contraseñas

El sistema esta enteramente construido con Typescript por lo que la base para la instalación es node.
Tiene la capacidad de almacenar contraseñas de una forma segura ya que cuenta con un cifrado AES-256-GCM

## Instalación

Los pasos para instalar la aplicación son:

```
npm install
npx prisma migrate dev --name init   
npx prisma generate
```

## Para poder utilizar el sistema el único comando que es necesario para empezar a correr el sistema es:

```
npm run dev
```
## La lista de dependencias del sistema son:
```
-prisma orm (conexión a la base de datos)
-dotenv (manejo de variables de entorno)
```
