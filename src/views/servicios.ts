import { CrearServicio, CrearServicioDto } from '../domain';
import { ServicioDatasourcePrismaImpl, ServicioRepositoryImpl } from '../infrastructure';
import { pregunta, pausar } from '../utils/console';
import { VistaBase } from './vistaBase';

export class Servicios extends VistaBase {
  constructor(
    private readonly servicioDatasourceImpl = new ServicioDatasourcePrismaImpl(),
    private readonly servicioRepositoryImpl = new ServicioRepositoryImpl(servicioDatasourceImpl)
  ) {
    super('Servicios');
  }

  async mostrar(): Promise<string> {
    const opciones = [
      '1. Guardar Nueva Contraseña',
      '2. Listar Contraseñas',
      '3. Eliminar Contraseñas'
    ];

    this.mostrarEncabezado('GESTIÓN DE CONTRASEÑAS', opciones);
    console.log('\n0. Salir de la aplicacion');

    const opcion = await pregunta('\nSelecciona una opción (0-3): ');

    switch (opcion) {
      case '1':
        await this.crearContrasenia();
        return 'servicios';
      case '2':
        await this.listarContrasenias();
        return 'servicios';
      case '3':
        await this.eliminarContrasenia();
        return 'servicios';
      case '0':
        return 'salir';
      default:
        await this.opcionInvalida();
        return 'servicios';
    }
  }

  private async crearContrasenia(): Promise<void> {
    try {
      console.log('\n🔷 CREAR NUEVA CONTRASEÑA');
      const servicio = await pregunta('Ingresa el nombre del usuario: ');
      const usuario = await pregunta('Ingresa el email del usuario: ');
      const contrasenia = await pregunta('Ingresa el email del usuario: ');

      const [error, crearServicioDto] = CrearServicioDto.create({ servicio, usuario, contrasenia })
      if (error) console.log(error)

      new CrearServicio(this.servicioRepositoryImpl)
        .execute(crearServicioDto!)
        .then(data => console.log(`\n✅ Servicio "${servicio}" creado exitosamente.`))
        .catch(error => console.log(error))

      await pausar();
    } catch (error) {
      console.log('Error al crear la contraseña')
      await pausar();
    }
  }

  private async listarContrasenias(): Promise<void> {
    console.log('\n🔷 LISTA DE CONTRASEÑAS');
    console.log('1. Juan Pérez - juan@email.com');
    console.log('2. María García - maria@email.com');
    console.log('3. Carlos López - carlos@email.com');
    console.log('4. Ana Martínez - ana@email.com');
    console.log('5. Pedro Rodríguez - pedro@email.com');
    await pausar();
  }

  private async eliminarContrasenia(): Promise<void> {
    console.log('\n🔷 ELIMINAR CONTRASEÑA');
    const usuario = await pregunta('Ingresa el nombre del usuario a eliminar: ');
    const confirmacion = await pregunta(`¿Estás seguro de eliminar a "${usuario}"? (s/n): `);

    if (confirmacion.toLowerCase() === 's' || confirmacion.toLowerCase() === 'si') {
      console.log(`\n✅ Usuario "${usuario}" eliminado exitosamente.`);
    } else {
      console.log('\n❌ Operación cancelada.');
    }
    await pausar();
  }
}