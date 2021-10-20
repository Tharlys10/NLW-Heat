import { Request, Response } from "express";
import { ProfileUserService } from "../services/ProfileUserService";

class ProfileUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const user_id = request.user_id;

    const profileUserService = new ProfileUserService()

    try {
      const result = await profileUserService.execute(user_id)

      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { ProfileUserController }