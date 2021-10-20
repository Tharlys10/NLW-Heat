import { Request, Response } from "express";
import { GetLast3MessagesService } from "../services/GetLast3MessagesService";

class GetLast3MessagesController {
  async handle(request: Request, response: Response): Promise<Response> {

    const getLast3MessagesService = new GetLast3MessagesService()

    try {
      const result = await getLast3MessagesService.execute()

      return response.json(result)
    } catch (error) {
      return response.json({ error: error.message });
    }
  }
}

export { GetLast3MessagesController }