import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';

interface SubscriptionAttributes {
  id: number;
  name: string;
  email: string;
  plan: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface SubscriptionCreationAttributes extends Optional<SubscriptionAttributes, 'id'> {}

class Subscription extends Model<SubscriptionAttributes, SubscriptionCreationAttributes> {
  public id!: number;
  public name!: string;
  public email!: string;
  public plan!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Subscription.init(
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
    plan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Subscription',
  }
);

export default Subscription;