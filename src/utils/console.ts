import * as readline from 'readline';

export const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

export function pregunta(query: string): Promise<string> {
  return new Promise((resolve) => {
    rl.question(query, resolve);
  });
}

export function limpiarConsola(): void {
  console.clear();
}

export async function pausar(): Promise<void> {
  await pregunta('\nPresiona Enter para continuar...');
}

export function cerrarApp(): void {
  console.log('¡Gracias por usar la aplicación!');
  rl.close();
  process.exit(0);
}