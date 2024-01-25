import { Category } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====____ELIMINAREMOS CATEGORY", req.body)

    let idRequired = req.params?.idCategory

    try {
        const categoryRequired = await Category.findOne({
            where: {
                id: idRequired
            }
        })

        if (!categoryRequired)
            throw {
                message: "Requested Category to delete does not exists",
                status: 400,
                path: `IdCategoryRequested ${idRequired}`
            }


        await Category.destroy({
            where: { id: idRequired }
        })

        return res.status(200).json({
            success: true,
            message: "Category deleted succesfully"
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}