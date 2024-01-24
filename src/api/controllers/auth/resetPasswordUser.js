import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import errorController from '../errorController.js'
import { User } from '../../models/index.js'



export default async (req, res) => {
    console.log("Peticion recibida", req.body)
    const { email, password } = req.body

    try {
        if (!email && !password)
            throw {
                message: "Email and password not present",
                status: 400,
                path: `Email ${email},Password ${password}`
            }

        const user = await User.findOne({
            where: {
                email: email
            }
        })

        console.log(user);

        if (user.length < 0 || !user) {
            throw {
                message: "Email does no exists",
                status: 400,
                path: `Email ${email}`
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const created = await User.update({
            password: hashedPassword
        }, {
            where: {
                id: user.dataValues.id
            }
        })

        return res.status(200).json({
            success: true,
            message: "User Modified succesfully",
            data: {
                email: user.dataValues.id
            }
        })

    } catch (error) {
        console.log("______________________________", error);
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}
