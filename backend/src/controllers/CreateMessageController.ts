import { Request, Response } from "express";
import { CreateMessageService } from "../services/CreateMessageService";

class CreateMessageController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { message } = request.body;
    const user_id = request.user_id || ""

    const createMessageService = new CreateMessageService()

    try {
      const result = await createMessageService.execute(message, user_id)

      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { CreateMessageController }