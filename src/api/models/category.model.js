import { DataTypes, Model, Sequelize } from "sequelize";
import { commonModel, commonOptions } from './common.model.js';


export default (sequelize) => {
    class Category extends Model { }

    Category.init(
        {
            ...commonModel,
            name: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
            },
            color: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { ...commonOptions, modelName: 'category', sequelize }
    );
    Category.beforeSync(() => { });
    Category.afterSync(() => { });

    return Category;
}