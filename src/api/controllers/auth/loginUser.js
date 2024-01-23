import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import errorController from '../errorController.js'
import { User } from '../../models/index.js'



export default async (req, res) => {
    const BAN_TIME = parseInt(process.env.BAN_TIME)

    console.log("Peticion recibida", req.body)
    const { email, password } = req.body

    try {
        if (!email && !password)
            throw {
                message: "Email and password not present",
                status: 400,
                path: `Email ${email},Password ${password}`
            }

        const login = await User.findOne({
            where: {
                email
            },
        })

        if (!login)
            throw {
                message: "User Email does not exists",
                status: 400,
                path: `Email ${email}`
            }


        bcrypt.compare(password, login?.dataValues?.password)
            .then(async (verification) => {
                if (!verification) {
                    throw {
                        message: `Invalid - Incorrect password`,
                        status: 401,
                        path: `Password`
                    }
                }
                console.log(login?.dataValues?.state, login?.dataValues?.retriesPassword);
                const token = jwt.sign(
                    {
                        userId: login.dataValues.id,
                        useremail: login.dataValues.email
                    },
                    'ToDo',
                    { expiresIn: "2d" }
                )

                return res.status(200).json({
                    success: true,
                    message: "Login Succeess",
                    token: token,
                    data: {
                        user: login.dataValues
                    }
                })
            })
            .catch((error) => {
                if (!error.status)
                    error['status'] = 405

                return errorController(error, res)
            })

    } catch (error) {
        console.log("______________________________", error);
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}
