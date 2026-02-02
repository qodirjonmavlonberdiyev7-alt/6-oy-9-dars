import { DataTypes, Model } from "sequelize";
import sequelize from "../config/config.js";


export class Student extends Model {
    full_name!: string;
    phone_number!: string;
    profession!: string;
    parent_name!: string;
    parent_number!: string;
    image_url!: string;
}

Student.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
     full_name: {
        type: DataTypes.STRING,
        allowNull: false
    },
     phone_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     profession: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     parent_name: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     parent_number: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
     image_url: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
{
    tableName: "students",
    timestamps: true,
    sequelize
})