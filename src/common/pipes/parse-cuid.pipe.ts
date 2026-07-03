import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

const CUID_REGEX = /^[a-z0-9]{25}$/;

@Injectable()
export class ParseCuidPipe implements PipeTransform<string> {
  transform(value: string): string {
    if (!CUID_REGEX.test(value)) {
      throw new BadRequestException(`Invalid ID format: ${value}`);
    }
    return value;
  }
}
