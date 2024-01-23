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

        const userEmail = await User.findAll({
            where: {
                email: email
            }
        })

        if (userEmail.length > 0) {
            throw {
                message: "Email already taken by another user",
                status: 400,
                path: `Email ${email}`
            }
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const created = await User.create({
            email,
            password: hashedPassword
        })

        return res.status(200).json({
            success: true,
            message: "User Created successfully",
            data: created
        })

    } catch (error) {
        console.log("______________________________", error);
        if (!error.status)
            error['status'] = 405

        return errorController(error, res)
    }
}
