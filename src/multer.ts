import fs from 'fs';
import multer from 'multer';
import { promisify } from 'util';

import { logger } from './server/utils/logger';

// const unlinkAsync = promisify(fs.unlink);
const renameAsync = promisify(fs.rename);

// SET STORAGE
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.fieldname + '-' + Date.now());
  },
});
export const upload = multer({ storage });

export const deleteFile = async (filePath: string): Promise<void> => {
  // Put a logic here that deletes the file at a certian time or whent he file is sent
  logger.info('Deleting the file to free space', { filePath });
  // await unlinkAsync(filePath);
};

export const renameFile = async (
  filePath: string,
  updatedFilePath: string
): Promise<void> => {
  await renameAsync(filePath, updatedFilePath);
};
