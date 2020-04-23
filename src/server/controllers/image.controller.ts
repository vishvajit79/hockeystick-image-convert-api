import { NextFunction, Request, Response } from 'express';
import { injectable } from 'inversify';

@injectable()
export class ImageController {
  async convert(
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> {
    const data = req;
    res.json(data);
    next();
  }
}
