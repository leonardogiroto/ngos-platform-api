import { AddNgoHandler } from './add-ngo.command';
import { DeleteNgoHandler } from './delete-ngo.command';
import { UpdateNgoHandler } from './update-ngo.command';

export const CommandHandlers = [
  AddNgoHandler,
  UpdateNgoHandler,
  DeleteNgoHandler
];
