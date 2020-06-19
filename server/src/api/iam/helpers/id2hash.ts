import * as crypto from 'crypto';

export default (id1: string, id2: string) =>
  crypto
    .createHash('sha256')
    .update(id1 + id2)
    .digest('hex');
