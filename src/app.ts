import { cerrarApp, pausar } from './utils/console'
import { Servicios } from './views/servicios';

export class App {
  private vistaActual: string = 'servicios';
  private vistas: Map<string, any>;

  constructor() {
    // Inicializar todas las vistas
    this.vistas = new Map([
      //['principal', new VistaPrincipal()],
      ['servicios', new Servicios()],
      //['productos', new VistaProductos()],
      //['reportes', new VistaReportes()]
    ]);
  }

  async iniciar(): Promise<void> {
    console.log('=== Bienvenido a la Aplicación de Consola ===\n');
    console.log('Sistema de Gestión de Contraseñas');
    
    await pausar();

    // Bucle principal de la aplicación
    while (true) {
      try {
        // Manejar caso especial de salir
        if (this.vistaActual === 'salir') {
          cerrarApp();
          return;
        }

        // Obtener la vista actual y mostrarla
        const vista = this.vistas.get(this.vistaActual);
        
        if (!vista) {
          console.log(`Error: Vista '${this.vistaActual}' no encontrada.`);
          this.vistaActual = 'servicios';
          continue;
        }

        // Mostrar la vista y obtener la siguiente vista
        const siguienteVista = await vista.mostrar();
        this.vistaActual = siguienteVista;

      } catch (error) {
        console.log('\n❌ Ha ocurrido un error inesperado:', error);
        console.log('Regresando al menú servicios...');
        this.vistaActual = 'servicios';
        await pausar();
      }
    }
  }

  // Método para obtener la vista actual (útil para debugging)
  public getVistaActual(): string {
    return this.vistaActual;
  }

  // Método para cambiar de vista programáticamente
  public cambiarVista(nombreVista: string): void {
    if (this.vistas.has(nombreVista) || nombreVista === 'salir') {
      this.vistaActual = nombreVista;
    } else {
      console.log(`Advertencia: Vista '${nombreVista}' no existe.`);
    }
  }
}






