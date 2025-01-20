import User from "../models/user.model";
import bcrypt from "bcryptjs";

export class AuthService {
  async register(userDetails: any): Promise<User> {
    const { username, password, departmentId } = userDetails;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      throw new Error("Username already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      username,
      password: hashedPassword,
      departmentId,
    });

    return newUser;
  }

  async login(
    username: string,
    password: string
  ): Promise<{ token: string; user: User }> {
    const user = await User.findOne({ where: { username } });

    console.log(user);
    if (!user) {
      throw new Error("Auth failed, username not found");
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      throw new Error("Password doesn't match");
    }

    const token = user.generateToken();

    await user.update({ token });
    console.log(token);

    return { token, user };
  }

  async logout(user: User, token: string): Promise<void> {
    await user.update({ token: "" });
  }

  async getProfile(user: User): Promise<any> {
    return {
      id: user.id,
      username: user.username,
      departmentId: user.departmentId,
    };
  }
}
