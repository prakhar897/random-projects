import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '../db';
import Lead from './Lead';

interface CampaignAttributes {
  id: number;
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
}

interface CampaignCreationAttributes extends Optional<CampaignAttributes, 'id'> {}

class Campaign extends Model<CampaignAttributes, CampaignCreationAttributes> {
  public id!: number;
  public title!: string;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

Campaign.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Campaign',
  }
);

Campaign.belongsToMany(Lead, { through: 'CampaignLeads' });
Lead.belongsToMany(Campaign, { through: 'CampaignLeads' });

export default Campaign;