import { AddNgoHandler } from '../add-ngo.command';
import { Repository } from 'typeorm';
import { Ngo } from '../../entities/ngo.entity';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { UpdateNgoHandler } from '../update-ngo.command';

describe('UpdateNgoHandler', () => {

  let updateNgoHandler: UpdateNgoHandler;
  let ngoRepository: Repository<Ngo>;

  beforeEach(() => {
    ngoRepository = new Repository<Ngo>();
    updateNgoHandler = new UpdateNgoHandler(ngoRepository);
  });

  describe('execute', () => {
    it('should fail when trying to update an unexisting ngo', async () => {
      const getSpy = jest.spyOn(ngoRepository, 'findOne').mockImplementation(
        async () => undefined
      );
      const saveSpy = jest.spyOn(ngoRepository, 'save').mockImplementation(
        async () => Promise.resolve( null )
      );

      try {
        await updateNgoHandler.execute({
          'id': -1,
          'name': '',
          'description': 'Description'
        });
      } catch (exception) {
        expect(getSpy).toHaveBeenCalledWith(-1);
        expect(saveSpy).not.toHaveBeenCalled();
      }
    });

    it('should successfully update an ngo', async () => {
      const ngo = new Ngo('name', 'description');
      const getSpy = jest.spyOn(ngoRepository, 'findOne').mockImplementation(
        async () => ngo
      );
      const saveSpy = jest.spyOn(ngoRepository, 'save').mockImplementation(
        async () => Promise.resolve( ngo )
      );

      await updateNgoHandler.execute({
        'id': 1,
        'name': 'Name',
        'description': 'Description'
      });

      expect(getSpy).toHaveBeenCalledWith(1);
      expect(saveSpy).toHaveBeenCalled();
    });
  });
});
