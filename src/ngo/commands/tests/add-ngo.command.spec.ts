import { AddNgoHandler } from '../add-ngo.command';
import { Repository } from 'typeorm';
import { Ngo } from '../../entities/ngo.entity';
import { BadRequestException } from '@nestjs/common';

describe('AddNgoHandler', () => {

  let addNgoHandler: AddNgoHandler;
  let ngoRepository: Repository<Ngo>;

  beforeEach(() => {
    ngoRepository = new Repository<Ngo>();
    addNgoHandler = new AddNgoHandler(ngoRepository);
  });

  describe('execute', () => {
    it('should fail when trying to add an ngo without name', async () => {
      const saveSpy = jest.spyOn(ngoRepository, 'save');

      const handler = addNgoHandler.execute({
        'name': '',
        'description': 'Description'
      });

      expect(saveSpy).not.toHaveBeenCalled();
      handler.catch(exception =>
        expect(exception).toBeInstanceOf(BadRequestException)
      );
    });

    it('should fail when trying to add an ngo without description', async () => {
      const saveSpy = jest.spyOn(ngoRepository, 'save');

      const handler = addNgoHandler.execute({
        'name': 'Name',
        'description': ''
      });

      expect(saveSpy).not.toHaveBeenCalled();
      handler.catch(exception =>
        expect(exception).toBeInstanceOf(BadRequestException)
      );
    });

    it('should successfully add an ngo', async () => {
      const saveSpy = jest.spyOn(ngoRepository, 'save');

      addNgoHandler.execute({
        'name': 'Name',
        'description': 'Description'
      });

      expect(saveSpy).toHaveBeenCalled();
    });
  });
});
