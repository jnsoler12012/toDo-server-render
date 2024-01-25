
import bcrypt from 'bcrypt'
import errorController from '../errorController.js'
import { User } from '../../models/index.js'

export default async (req, res) => {
    console.log("=-=-=--=-=-=-=-=Peticion recibida para modificar usuario", req.body)

    let idRequired = req.params?.idUser

    let { email, password, name, imageRef, idRequester } = req.body


    let attrModify = {}

    if (name)
        attrModify['name'] = name

    if (email)
        attrModify['email'] = email

    if (password)
        attrModify['password'] = await bcrypt.hash((password) ? password : "", 10);

    if (imageRef)
        attrModify['imageRef'] = imageRef

    console.log( idRequester, idRequired);
    try {
        const userRequired = await User.findOne({
            where: {
                id: [idRequired]
            },
        })

        console.log("_+_+_+_+_", userRequired, userRequired?.dataValues?.role?.dataValues)

        if (!userRequired)
            throw {
                message: "userRequired User does not exists",
                status: 400,
                path: `IdUserRequired ${idRequired}`
            }

        if (userRequired?.dataValues?.id !== idRequester)
            throw {
                message: "Only users with the task ownership can delete it",
                status: 400,
                path: `idUserRequester ${idRequester}`
            }


        console.log(attrModify);
        await User.update({ ...attrModify }, {
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