import { Category, Task, User } from '../../models/index.js'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("_____CREAERMOS TASKER", req.body)
    const { name, description, state, expireDate, priority, type, idRequester } = req.body

    try {
        if (
            name == '' || name == ' ' &&
            description == '' || description == ' '
        ) {
            throw {
                message: "Name or description can not be empty",
                status: 400,
                path: `name ${name} description ${description}`
            }
        }

        console.log('ANTES DE HACER LA PETICION');
        const userRequester = await User.findOne({
            where: {
                id: idRequester
            },
        })

        if (!userRequester)
            throw {
                message: "Requester User does not exists",
                status: 400,
                path: `IdUserRequester ${idRequester}`
            }
        console.log('ANTES DE HACER LA PETICION');
        const categoryRequested = await Category.findOne({
            where: {
                name: type
            },
        })

        if (!categoryRequested)
            throw {
                message: "Requested category does not exists",
                status: 400,
                path: `CategoryName ${type}`
            }

        let task

        task = await Task.create({
            name, description, state, userToDoId: idRequester, categoryId: categoryRequested?.dataValues.id, expireDate, priority
        })


        return res.status(200).json({
            success: true,
            message: "Task Created successfully",
            data: task
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