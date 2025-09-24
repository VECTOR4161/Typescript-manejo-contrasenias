import { App } from "./app";

async function main(): Promise<void> {
  try {
    const app = new App();
    await app.iniciar();
  } catch (error) {
    console.error('Error fatal en la aplicación:', error);
    process.exit(1);
  }
}

process.on('SIGINT', () => {
  console.log('\n\n🔄 Cerrando aplicación...');
  console.log('¡Gracias por usar nuestra aplicación!');
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('\n\n🔄 Aplicación terminada');
  process.exit(0);
});

main();