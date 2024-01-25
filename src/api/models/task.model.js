import { DataTypes, Model, Sequelize } from "sequelize";
import { commonModel, commonOptions } from './common.model.js';


export default (sequelize) => {
    class Task extends Model { }

    Task.init(
        {
            ...commonModel,
            name: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,  
                notIn: [['', ' ']],
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,  
                notIn: [['', ' ']],
            },
            state: {
                type: DataTypes.ENUM(['Pending', 'OnProgress', 'Completed']),
                validate: {
                    correctDiscount(value) {
                        if (!['Pending', 'OnProgress', 'Completed'].includes(value)) {
                            throw new Error(`State for task should be one of following ${['Pending', 'OnProgress', 'Completed'].toString()}`);
                        }
                    }
                }
            },
            expireDate: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            priority: {
                type: DataTypes.STRING,
                allowNull: false,
                notEmpty: true,
            }
        },
        { ...commonOptions, modelName: 'task', sequelize }
    );
    Task.beforeSync(() => { });
    Task.afterSync(() => { });

    return Task;
}