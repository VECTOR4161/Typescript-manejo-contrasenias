import { limpiarConsola, pregunta, pausar } from '../utils/console';

export abstract class VistaBase {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  // Método abstracto que cada vista debe implementar
  abstract mostrar(): Promise<string>;

  // Método helper para mostrar opciones inválidas
  protected async opcionInvalida(): Promise<void> {
    console.log('\n❌ Opción inválida. Por favor selecciona una opción válida.');
    await pausar();
  }

  // Método helper para mostrar el encabezado de cada vista
  protected mostrarEncabezado(titulo: string, opciones: string[]): void {
    limpiarConsola();
    const ancho = Math.max(titulo.length + 4, ...opciones.map(op => op.length + 4));
    const lineaSuperior = '╔' + '═'.repeat(ancho) + '╗';
    const lineaMedia = '╠' + '═'.repeat(ancho) + '╣';
    const lineaInferior = '╚' + '═'.repeat(ancho) + '╝';
    
    console.log(lineaSuperior);
    console.log(`║${titulo.padStart((ancho + titulo.length) / 2).padEnd(ancho)}║`);
    console.log(lineaMedia);
    
    opciones.forEach(opcion => {
      console.log(`║  ${opcion.padEnd(ancho - 4)}  ║`);
    });
    
    console.log(lineaInferior);
  }
}