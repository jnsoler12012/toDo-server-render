import { Op } from 'sequelize'
import { User, Category, Task } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====_____GET ALL TASK BY USER", req.body)
    const { categories, state, idRequester } = req.body

    let attrGet = []

    try {
        if (categories.length > 0) {

            const categorieObj = await Category.findAll(
                {
                    where: {
                        name: {
                            [Op.in]: categories
                        }
                    }
                }
            )

            const categorieObjId = categorieObj.reduce((prev, next) => {
                prev.push(next?.dataValues?.id)
                return prev
            }, [])

            console.log(categorieObj, categorieObjId);

            if (categorieObjId.length <= 0) {
                throw {
                    message: "There are no category/s",
                    status: 400,
                    path: `Categories ${categories.toString()}`
                }
            }
            attrGet['categoryId'] = {
                [Op.in]: categorieObjId
            }
        }

        attrGet['userToDoId'] = idRequester
        attrGet['state'] = state !== 'All' ? state : {
            [Op.in]: ['Pending', 'OnProgress', 'Completed']
        }


        const category = await Task.findAll({
            attributes: { exclude: ['updatedAt'] },
            where: {
                ...attrGet
            },
            include: [
                { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ],
        })

        if (!category)
            throw {
                message: "There are no task/s",
                status: 400,
                path: `Products`
            }

        return res.status(200).json({
            success: true,
            message: "List Of all current task/s",
            data: category
        })

    } catch (error) {
        console.log(error);
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}