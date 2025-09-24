import { limpiarConsola, pregunta, pausar } from '../utils/console';

export abstract class VistaBase {
  protected nombre: string;

  constructor(nombre: string) {
    this.nombre = nombre;
  }

  abstract mostrar(): Promise<string>;

  protected async opcionInvalida(): Promise<void> {
    console.log('\n❌ Opción inválida. Por favor selecciona una opción válida.');
    await pausar();
  }

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