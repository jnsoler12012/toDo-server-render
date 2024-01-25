import { Category, User } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("_____CREAERMOS CATEGORY", req.body)
    const { name, color, idRequester } = req.body

    try {
        const userRequester = await User.findOne({
            where: {
                id: [idRequester]
            },
        })

        if (!userRequester)
            throw {
                message: "Requester User does not exists",
                status: 400,
                path: `IdUserRequester ${idRequester}`
            }

        let category

        category = await Category.create({
            name, color, userId: idRequester
        })

        return res.status(200).json({
            success: true,
            message: "Category Created successfully",
            data: category
        })

    } catch (errorDefault) {
        console.log(errorDefault);
        console.log(errorDefault?.original?.detail, errorDefault?.original);

        let error
        if (errorDefault?.original) {
            error = { message: errorDefault?.original?.detail, status: errorDefault['status'], path: errorDefault?.original?.constraint };
        } else {
            error = errorDefault
        }
        if (!errorDefault?.status)
            errorDefault['status'] = 405

        if (!error?.status)
            error['status'] = 405

        return errorController(error, res)
    }
}