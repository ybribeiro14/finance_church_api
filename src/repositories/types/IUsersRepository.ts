import User from '../../models/schemas/User';
import ICreateUserDTO from './dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: number): Promise<User | undefined>;
  findByLogin(login: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  list(contract_id: number): Promise<User[]>;
  delete(id: number): Promise<boolean>;
  update(id: number, user: User): Promise<boolean>;
}
