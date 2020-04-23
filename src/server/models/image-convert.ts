import { IsEnum } from 'class-validator';

import { ImageType } from './image-type';

export class ImageConvert {
  @IsEnum(ImageType, { groups: ['convertImage'] })
  target!: ImageType;
}
