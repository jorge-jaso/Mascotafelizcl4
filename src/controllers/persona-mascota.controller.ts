import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Persona,
  Mascota,
} from '../models';
import {PersonaRepository} from '../repositories';

export class PersonaMascotaController {
  constructor(
    @repository(PersonaRepository)
    public personaRepository: PersonaRepository,
  ) { }

  @get('/personas/{id}/mascota', {
    responses: {
      '200': {
        description: 'Mascota belonging to Persona',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Mascota)},
          },
        },
      },
    },
  })
  async getMascota(
    @param.path.string('id') id: typeof Persona.prototype.id,
  ): Promise<Mascota> {
    return this.personaRepository.mascota(id);
  }
}
