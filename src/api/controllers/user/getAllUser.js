import { User, Category, Task } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====_____GET ALL USERS", req.body)
    try {
        const user = await User.findAll({
            include: [
                { model: Task, attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ],
        })

        if (!user)
            throw {
                message: "There are no user/s",
                status: 400,
                path: `Products`
            }

        return res.status(200).json({
            success: true,
            message: "List Of all current user/s",
            data: user
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}