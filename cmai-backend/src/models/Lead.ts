import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface LeadAttributes {
  id: number;
  name: string;
  email: string;
  url?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface LeadCreationAttributes extends Optional<LeadAttributes, 'id'> {}

class Lead extends Model<LeadAttributes, LeadCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public url!: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Lead.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: 'Lead',
  }
);

export default Lead;