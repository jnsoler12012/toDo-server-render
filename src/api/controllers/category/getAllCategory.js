import { User, Category } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====_____GET ALL CATEGORY", req.body)
    try {
        const category = await Category.findAll({})

        if (!category)
            throw {
                message: "There are no category/s",
                status: 400,
                path: `Products`
            }

        return res.status(200).json({
            success: true,
            message: "List Of all current category/s",
            data: category
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}