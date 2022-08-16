import { injectable, inject } from 'tsyringe';

import User from '../../models/schemas/User';
import IUsersRepository from '../../repositories/types/IUsersRepository';
import IHashProvider from '../../container/providers/HashProvider/models/IHashProvider';

interface IRequest {
  login: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ login, password }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByLogin(login);

    if (checkUserExists) {
      throw new Error('Login informado já possui cadastro.');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      login,
      password: hashedPassword,
    });

    return user;
  }
}

export default CreateUserService;
