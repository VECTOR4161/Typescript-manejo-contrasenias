import * as crypto from 'crypto';
import { envs } from './envs';


export class CryptoAdapter {
  private static readonly SALT = Buffer.from('mi-sal-fija');
  private static readonly ALGORITHM = 'aes-256-gcm';

  private async getKey(): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      crypto.scrypt(envs.SECRET_KEY, CryptoAdapter.SALT, 32, (err, key) => {
        if (err) reject(err);
        else resolve(key);
      });
    });
  }

  async encrypt(data: string): Promise<string> {
    const key = await this.getKey();
    const iv = crypto.randomBytes(12);
    const cipher = crypto.createCipheriv(CryptoAdapter.ALGORITHM, key, iv);
    const encrypted = Buffer.concat([cipher.update(data, 'utf8'), cipher.final()]);
    const tag = cipher.getAuthTag();

    return Buffer.concat([iv, tag, encrypted]).toString('base64');
  }

  async decrypt(payload: string): Promise<string> {
    const data = Buffer.from(payload, 'base64');
    const iv = data.slice(0, 12);
    const tag = data.slice(12, 28);
    const encrypted = data.slice(28);

    const key = await this.getKey();
    const decipher = crypto.createDecipheriv(CryptoAdapter.ALGORITHM, key, iv);
    decipher.setAuthTag(tag);

    const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
    return decrypted.toString('utf8');
  }
}
