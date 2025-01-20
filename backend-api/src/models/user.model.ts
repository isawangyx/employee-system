import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
  CreatedAt,
  UpdatedAt,
  BeforeSave,
} from "sequelize-typescript";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Department from "./department.model";

const SECRET_KEY = "your_secret_key"; // Replace with your actual secret key

interface UserAttributes {
  id: number;
  username: string;
  password: string;
  departmentId: number;
  token?: string;
}

interface UserCreationAttributes extends Partial<UserAttributes> {}

@Table({
  timestamps: true,
  tableName: "users",
  modelName: "User",
})
export default class User extends Model<
  UserAttributes,
  UserCreationAttributes
> {
  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  declare id: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
    unique: true,
  })
  declare username: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  declare password: string;

  @ForeignKey(() => Department)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  declare departmentId: number;

  @BelongsTo(() => Department)
  department!: Department;

  @CreatedAt
  declare created_at: Date;

  @UpdatedAt
  declare updated_at: Date;

  // Compare password for login
  async comparePassword(inputPassword: string): Promise<boolean> {
    return await bcrypt.compare(inputPassword, this.password);
  }

  // Generate JWT token
  generateToken(): string {
    const payload = { id: this.id, departmentId: this.departmentId };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });
  }

  // Verify JWT token and find user
  static async findByToken(
    token: string,
    cb: (err: any, user: User | null) => void
  ) {
    const user = this;

    jwt.verify(token, SECRET_KEY, (err, decoded) => {
      if (err) return cb(err, null);

      // Find user by ID
      user
        .findOne({ where: { id: (decoded as jwt.JwtPayload).id } })
        .then((foundUser) => cb(null, foundUser))
        .catch((findErr) => cb(findErr, null));
    });
  }
}
