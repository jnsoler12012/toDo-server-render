import { Category, Task, User } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=====____ELIMINAREMOS CATEGORY", req.body)

    const { idUserRequester } = req.body

    let idRequired = req.params?.idTask

    try {
        const taskRequired = await Task.findOne({
            where: {
                id: idRequired
            },
            include: [
                { model: User, attributes: { exclude: ['createdAt', 'updatedAt'] } },
                { model: Category, attributes: { exclude: ['createdAt', 'updatedAt'] } }
            ],
        })

        console.log(taskRequired, typeof idUserRequester);

        if (!taskRequired)
            throw {
                message: "Requested Task to delete does not exists",
                status: 400,
                path: `IdTaskRequested ${idRequired}`
            }

        if (taskRequired?.dataValues?.userToDo?.dataValues?.id !== parseInt(idUserRequester))
            throw {
                message: "Only users with the task ownership can delete it",
                status: 400,
                path: `idUserRequester ${idUserRequester}`
            }


        await Task.destroy({
            where: { id: idRequired }
        })

        return res.status(200).json({
            success: true,
            message: "Task deleted succesfully"
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}