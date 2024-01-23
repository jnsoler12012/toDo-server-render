import jwt from "jsonwebtoken"


export default async (request, response, next) => {
    console.log("_____________");
    try {
        const token = await request.headers.authorization.split(" ")[1];
        const decodedToken = await jwt.verify(token, 'ToDo');
        console.log(decodedToken);
        const user = await decodedToken;
        request.user = user;

        next();

    } catch (error) {
        return response.status(401).json({
            auth: false,
            message: "ERROR - Petition over non authenticated user",
        });
    }
}
