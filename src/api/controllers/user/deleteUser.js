import { User } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====____ELIMINAREMOS CATEGORY", req.body)

    let idRequired = req.params?.idUser

    try {
        const userRequired = await User.findOne({
            where: {
                id: idRequired
            }
        })

        if (!userRequired)
            throw {
                message: "Requested User to delete does not exists",
                status: 400,
                path: `IdUserRequested ${idRequired}`
            }


        await User.destroy({
            where: { id: idRequired }
        })

        return res.status(200).json({
            success: true,
            message: "User deleted succesfully"
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}