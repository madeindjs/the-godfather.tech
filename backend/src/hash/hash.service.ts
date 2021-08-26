import { Injectable } from '@nestjs/common';
import { createHash } from 'crypto';

@Injectable()
export class HashService {
  public hashString(password: string) {
    if (password === undefined) {
      throw Error('Password must be defined');
    }
    const hash = createHash('sha256');
    hash.update(password);
    return hash.digest('base64');
  }
}
