import { Column, DataType, Model, PrimaryKey, Table } from "sequelize-typescript";

@Table
export class User extends Model{
  @PrimaryKey
  @Column(DataType.INTEGER)
  declare id: number;
  @Column(DataType.STRING)
  name: string;
  @Column
  email: string;
  @Column
  password: string;
}