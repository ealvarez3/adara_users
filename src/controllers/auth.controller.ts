import { Request, Response } from "express";
import { comparePassword, generateToken } from "../utils/main.utils";
import AdaraUser from "../models/User.model";


const applicationName: string = "Users - Auth";

const loginUser = async (req: Request, res: Response): Promise<Response> =>
{
    const { email, password } = req.body;

    if(!email || !password)
    {
        return res.status(400).json({ message: "El email y la contraseña son requeridos." });
    }

    const user = await AdaraUser.findOne({ where: { email } });

    if(!user)
    {
        return res.status(404).json({ message: "Usuario no encontrado." });
    }

    if(!user.active)
    {
        return res.status(404).json({ message: "El usuario no se encuentra activo." });
    }

    const matchPassword = await comparePassword(password, user.password);

    if(!matchPassword)
    {
        return res.status(404).json({ message: "La contraseña no coincide" });
    }

    const token = await generateToken(user);

    return res.status(200).json({ 
        application: applicationName,
        message: "Usuario logueado correctamente.",
        code: 200,
        data: {
            user: user.email,
            token 
        }
     });
}

export {
    loginUser
}
