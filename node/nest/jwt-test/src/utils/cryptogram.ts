import * as crypto from 'crypto';

/**
 * Make salt
 */
export function makeSalt(): string {
  return crypto.randomBytes(5).toString('base64');
}

/**
 * 加密密码
 * @param password 密码
 * @param salt 密码盐
 */
export function encryptPassword(password: string, salt: string): string {
  if (!password || !salt) {
    return '';
  }
  const tempSalt = Buffer.from(salt, 'base64');
  return (
    // 12000 代表迭代次数 24代表长度
    crypto.pbkdf2Sync(password, tempSalt, 12000, 24, 'sha1').toString('base64')
  );
}
