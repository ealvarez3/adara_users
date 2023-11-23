import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import AdaraUser from '../models/User.model';
import dotenv from "dotenv";


const env: dotenv.DotenvConfigOutput = dotenv.config();

export const hashPassword = async (password: string): Promise<string> => 
{
    const salt: string = await bcrypt.genSalt(10);
    const hashedPassword: string = await bcrypt.hash(password, salt);
    return hashedPassword;
}

export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> =>
{
    return await bcrypt.compare(password, hashedPassword);
}

export const returnOffSet = (page: number, limit: number): number =>
{
    if(!page || !limit)
    {
        return 0;
    }
    
    return (page - 1) * limit;
}

export const generateToken = async (user: AdaraUser): Promise<string> => 
{
    const payload = await 
    {
        uuid: user.uuid,
        firstName: user.firstName,
        lastName: user.lastName,
        secondLastName: user.secondLastName,
        email: user.email,
        username: user.username,
        active: user.active,
    };

    return jwt.sign(payload, process.env.SYSTEM_JWT_SECRET || "secret", { expiresIn: "8h" });
};

export const verifyToken = async (token: string): Promise<any> =>
{
    return await jwt.verify(token, process.env.SYSTEM_JWT_SECRET!);
}