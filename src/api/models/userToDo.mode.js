import { DataTypes, Model, Sequelize } from "sequelize";
import { commonModel, commonOptions } from './common.model.js';


export default (sequelize) => {
    class User extends Model { }

    User.init(
        {
            ...commonModel,
            email: {
                type: DataTypes.STRING,
                unique: true,
                allowNull: false,
                validate: {
                    isEmail: true
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            },
        },
        { ...commonOptions, modelName: 'userToDo', sequelize }
    );
    User.beforeSync(() => { });
    User.afterSync(() => { });

    return User;
}