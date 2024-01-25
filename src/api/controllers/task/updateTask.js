import { User, Task, Category } from '../../models/index.js'
import bcrypt from 'bcrypt'
import errorController from '../errorController.js'

export default async (req, res) => {
    console.log("=-=-=--=-=-=-=-=Peticion recibida para modificar task", req.body)

    let idRequired = req.params?.idTask

    let { name, description, type, state, priority, expireDate, idRequester } = req.body


    let attrModify = {}

    if (name)
        attrModify['name'] = name

    if (description)
        attrModify['description'] = description

    if (type)
        attrModify['type'] = type

    if (state)
        attrModify['state'] = state

    if (priority)
        attrModify['priority'] = priority

    if (expireDate)
        attrModify['expireDate'] = expireDate

    console.log(attrModify, idRequester, idRequired);
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

        console.log(taskRequired?.dataValues?.userToDo);

        if (!taskRequired)
            throw {
                message: "Requested Task to delete does not exists",
                status: 400,
                path: `IdTaskRequested ${idRequired}`
            }

        if (taskRequired?.dataValues?.userToDo?.dataValues?.id !== idRequester)
            throw {
                message: "Only users with the task ownership can delete it",
                status: 400,
                path: `idUserRequester ${idRequester}`
            }


        console.log(attrModify);
        await Task.update({ ...attrModify }, {
            where: {
                id: idRequired
            }
        })
        return res.status(200).json({
            success: true,
            message: "User modified succesfully",
            data: {
                ...attrModify
            }
        })

    } catch (error) {
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}