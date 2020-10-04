import * as bcrypt from 'bcrypt';

class PasswordUtil {
  static hashPassword(password: string): string{
    return bcrypt.hashSync(password, 10);
  }

  static isValidPassword(password: string, hashedPassword: string): boolean {
    return bcrypt.compareSync(password, hashedPassword);
  }
}

export default PasswordUtil;