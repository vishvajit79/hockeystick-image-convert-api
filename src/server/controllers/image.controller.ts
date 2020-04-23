import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';

import { deleteFile, renameFile } from '../../multer';
import { InterfaceErrorHandlerPlugin } from '../../plugins/error-handler.interface';
import { ImageConvert } from '../models/image-convert';
import { ImageType } from '../models/image-type';
import { RequestWithParams } from '../models/request-validation';

// eslint-disable-next-line @typescript-eslint/no-var-requires
// let imgConvert = require('image-convert');

@injectable()
export class ImageController {
  private _error: InterfaceErrorHandlerPlugin;
  constructor(
    @inject(nameof<InterfaceErrorHandlerPlugin>())
    errorFactory: (name: string) => InterfaceErrorHandlerPlugin
  ) {
    this._error = errorFactory(nameof<ImageController>());
  }
  async convert(req: Request, res: Response): Promise<void> {
    const request = req as RequestWithParams<ImageConvert>;
    const file = req.file;
    let updatedFilePath = file.path;
    let fileConverted = false;
    try {
      // Check for file
      if (!file) {
        throw this._error.getFormattedError({
          source: 'int',
          status: 400,
          message: 'Please upload a image file',
        });
      }

      // Check for valid fileType
      const fileType = file.mimetype
        .replace('image/', '')
        .toUpperCase() as ImageType;
      if (!Object.values(ImageType).includes(fileType)) {
        throw this._error.getFormattedError({
          source: 'int',
          status: 400,
          message: 'Please upload a valid image file',
          errorData: {
            fileType,
          },
        });
      }

      updatedFilePath = `${
        file.path
      }.${request.validatedParams.target.toLowerCase()}`;

      // Convert the image logic goes here
      // I didn't wanted to use any external library to convert image so i am just renaming them
      await renameFile(file.path, updatedFilePath);
      fileConverted = true;

      // Return the converted file
      res.setHeader(
        'Content-Type',
        `img/${request.validatedParams.target.toLowerCase()}`
      );
      res.sendFile(updatedFilePath, { root: '.' });
    } catch (error) {
      if (error.requestId) {
        throw error;
      }
      throw this._error.getFormattedError({
        source: 'int',
        status: 400,
        message: 'Error while converting the file',
        errorData: {
          error,
          errorMessage: error.message,
        },
      });
    } finally {
      // Delete the file uploaded to clear storage
      if (fileConverted && updatedFilePath) {
        await deleteFile(updatedFilePath);
      } else {
        await deleteFile(file.path);
      }
    }

    // next();
  }
}
