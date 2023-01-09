import { EntityRepository } from 'typeorm';
import { Users } from '../models';
import { RepositoryService } from './repository';

@EntityRepository(Users)
export class UsersRepository extends RepositoryService<Users> {}
