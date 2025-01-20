import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

console.log(process.env.JWT_SECRET_KEY);

interface Payload {
  userId: number;
  username: string;
  departmentId: number;
}

class Authentication {
  public static passwordHash(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  public static async passwordCompare(
    text: string,
    encryptedText: string
  ): Promise<boolean> {
    return await bcrypt.compare(text, encryptedText);
  }

  public static generateToken(
    id: number,
    username: string,
    departmentId: number
  ): string {
    const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
    const payload: Payload = {
      userId: id,
      username,
      departmentId,
    };
    const option = { expiresIn: process.env.JWT_EXPIRES_IN || "1h" };
    const token = jwt.sign(payload, secretKey, option);
    console.log(token);
    return token;
  }

  public static validateToken(token: string): Payload | null {
    try {
      const secretKey: string = process.env.JWT_SECRET_KEY || "my-secret";
      return jwt.verify(token, secretKey) as Payload;
    } catch (err) {
      return null;
    }
  }
}

export default Authentication;
