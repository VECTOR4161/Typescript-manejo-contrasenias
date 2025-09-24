import { PaginacionDto } from '../common';
import { ActualizarServicio, ActualizarServicioDto, CrearServicio, CrearServicioDto, CustomError, EliminarServicio, ObtenerServicio, ObtenerServicios } from '../domain';
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
      '3. Eliminar Contraseñas',
      '4. Actualizar Contraseñas',
      '5. Buscar Contraseña'
    ];

    this.mostrarEncabezado('GESTIÓN DE CONTRASEÑAS', opciones);
    console.log('\n0. Salir de la aplicacion');

    const opcion = await pregunta('\nSelecciona una opción (0-5): ');

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
      case '4':
        await this.actualizarContrasenia();
        return 'servicios';
      case '5':
        await this.obtenerContrasenia();
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
      const servicio = await pregunta('Ingresa el nombre del servicio: ');
      const usuario = await pregunta('Ingresa el email del usuario: ');
      const contrasenia = await pregunta('Ingresa la contraseña: ');

      const [error, crearServicioDto] = CrearServicioDto.create({ servicio, usuario, contrasenia, borrado: false })
      if (error) console.log(error)

      new CrearServicio(this.servicioRepositoryImpl)
        .execute(crearServicioDto!)
        .then(data => console.log(`\n✅ Servicio "${servicio}" creado exitosamente.`))
        .catch(error => console.log('Error al crear la contraseña'))

      await pausar();
    } catch (error) {
      console.log('Error al crear la contraseña')
      await pausar();
    }
  }

  private async listarContrasenias(): Promise<void> {
    let serviciosArray: string[] = [] 
    const [, paginacionDto] = PaginacionDto.create({})
    const serviciosRaw = await new ObtenerServicios(this.servicioRepositoryImpl).execute(paginacionDto!)
    serviciosRaw.forEach(servicio => serviciosArray.push(`ID:  ${servicio.id}     Servicio:    ${servicio.servicio}            Correo: ${servicio.usuario}        Contraseña:     ${servicio.contrasenia}`))
    this.mostrarEncabezado("Contraseñas Guardadas", serviciosArray)
    await pausar();
  }

  private async eliminarContrasenia(): Promise<void> {
    console.log('\n🔷 ELIMINAR CONTRASEÑA');
    const identificador = await pregunta('Ingresa el identificador de la contraseña a eliminar: ');
    const confirmacion = await pregunta(`¿Estás seguro de eliminar la contraseña con el identificador "${identificador}"? (s/n): `);

    if (confirmacion.toLowerCase() === 's' || confirmacion.toLowerCase() === 'si') {
      const bandera = await new EliminarServicio(this.servicioRepositoryImpl).execute(Number(identificador))
      if(bandera)
      console.log(`\nContraseña "${identificador}" eliminado exitosamente.`);
      else
      console.log(`\nError al eliminar al contraseña`);
    } else {
      console.log('\nOperación cancelada.');
    }
    await pausar();
  }

  private async actualizarContrasenia(): Promise<void> {
    try {
      console.log('\n🔷 ACTUALIZAR CONTRASEÑA');
      const identificador = await pregunta('Ingresa el identificador de la contraseña a modificar: ');
      const servicio = await pregunta('Ingresa el nombre del servicio: ');
      const usuario = await pregunta('Ingresa el email del usuario: ');
      const contrasenia = await pregunta('Ingresa la contraseña: ');

      const [error, crearServicioDto] = ActualizarServicioDto.create({ servicio, usuario, contrasenia, borrado: false })
      if (error) console.log(error)

      new ActualizarServicio(this.servicioRepositoryImpl)
        .execute(Number(identificador) ,crearServicioDto!)
        .then(data => console.log(`\n✅ Servicio "${servicio}" actualizado exitosamente.`))
        .catch(error => console.log('Error al actualizar la contraseña'))

      await pausar();
    } catch (error) {
      console.log('Error al actualizar la contraseña')
      await pausar();
    }
  }

  private async obtenerContrasenia(): Promise<void> {
    try {
      console.log('\n🔷 OBTENER CONTRASEÑA');
      const identificador = await pregunta('Ingresa el identificador de la contraseña a buscar: ');

      new ObtenerServicio(this.servicioRepositoryImpl)
        .execute(Number(identificador))
        .then(data => this.mostrarEncabezado('Contraseña', [`ID:  ${data.id}     Servicio:    ${data.servicio}            Correo: ${data.usuario}        Contraseña:     ${data.contrasenia}`]))
        .catch(error => console.log('Error al obtener la contraseña'))

      await pausar();
    } catch (error) {
      console.log('Error al actualizar la contraseña')
      await pausar();
    }
  }
}