import { getMongoRepository, MongoRepository, ObjectID } from 'typeorm';

import ICreateUserDTO from './types/dtos/ICreateUserDTO';
import IUsersRepository from './types/IUsersRepository';

import User from '../models/schemas/User';

class UsersRepository implements IUsersRepository {
  private ormRepository: MongoRepository<User>;

  constructor() {
    this.ormRepository = getMongoRepository(User, 'mongo');
  }

  public async findById(id: number): Promise<User | undefined> {
    try {
      const findUser = await this.ormRepository.findOne(id);

      return findUser;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async findByLogin(login: string): Promise<User | undefined> {
    try {
      const findUser = await this.ormRepository.findOne({
        where: { login },
      });

      return findUser;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    try {
      const user = this.ormRepository.create(userData);

      await this.ormRepository.save(user);

      return user;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async save(user: User): Promise<User> {
    try {
      return this.ormRepository.save(user);
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async list(contract_id: number): Promise<User[]> {
    try {
      return this.ormRepository.find({
        where: { contract_id },
      });
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async update(id: number, user: User): Promise<boolean> {
    try {
      const userUpdated = await this.ormRepository.update(
        {
          id,
        },
        {
          ...user,
        },
      );
      if (!userUpdated) {
        throw new Error('Não foi possível realizar o update');
      }
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  public async delete(id: number): Promise<boolean> {
    try {
      await this.ormRepository.delete({
        id,
      });
      return true;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}

export default UsersRepository;
