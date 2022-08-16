import { Request, Response } from 'express';
import { container } from 'tsyringe';
import ResponseSuccess from '../libs/responseSuccess';
import AppError from '../errors/AppError';

import AuthenticateUserService from '../services/users/AuthenticateUserService';

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { login, password, contract_id } = request.body;

      const authenticateUser = container.resolve(AuthenticateUserService);

      const { user, token } = await authenticateUser.execute({
        login,
        password,
        contract_id,
      });

      const userWithoutPassword = {
        id: user.id,
        name: user.name,
        login: user.login,
        contract_id: user.contract_id,
        created_at: user.created_at,
        updated_at: user.updated_at,
        spawn_module: user.spawn_module,
        loading_module: user.loading_module,
        inventory_module: user.inventory_module,
        painel_adm: user.painel_adm,
        concierge: user.concierge,
        checker: user.checker,
        supervisor: user.supervisor,
      };

      return response.json(
        new ResponseSuccess({ user: userWithoutPassword, token }),
      );
    } catch (error) {
      return response.json(
        new AppError(
          'Falha ao tentar criar uma sessão',
          (error as Error).message,
        ),
      );
    }
  }
}
