import { User, Category, Task } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====_____GET ALL TASK", req.body)
    try {
        const task = await Task.findAll({
            include: [
                { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ],
        })

        if (!task)
            throw {
                message: "There are no task/s",
                status: 400,
                path: `Tasks`
            }

        return res.status(200).json({
            success: true,
            message: "List Of all current task/s",
            data: task
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}