import { Response, Request } from "express";
import { AuthenticateUserService } from "../services/AuthenticateUserService";

class AuthenticateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { code } = request.body;

    const authenticateUserService = new AuthenticateUserService();

    try {
      const result = await authenticateUserService.execute(code)

      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { AuthenticateUserController }