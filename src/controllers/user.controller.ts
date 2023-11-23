import { Request, Response } from "express";
import AdaraUser from "../models/User.model";
import { hashPassword, comparePassword } from "../utils/main.utils";


const availableFilters: string[] = [
  "uuid",
  "firstName",  
  "lastName",
  "secondLastName",
  "email",
  "username",
  "active",
];

const applicationName: string = "Usuarios";

const retriveUsers = async (req: Request, res: Response): Promise<Response> => 
{
  const filters: string[] = Object.keys(req.query);

  const invalidFilters: string[] = filters.filter(
    (filter) => !availableFilters.includes(filter)
  );

  if (invalidFilters.length > 0) {
    return res.status(400).json({
      application: applicationName,
      message: "Invalid filters",
      code: 400,
      data: invalidFilters,
    });
  }

  try {
    const users: AdaraUser[] = await AdaraUser.findAll({
      where: filters.length > 0 ? req.query : undefined,
      attributes: ["uuid", "firstName", "lastName", "secondLastName", "active"],
      order: [["createdAt", "DESC"]],
    });

    if (users.length === 0) {
      return res.status(404).json({
        application: applicationName,
        message: "Users not found",
        code: 404,
        data: [],
      });
    }

    return res.status(200).json({
      application: applicationName,
      message: "Users retrieved successfully",
      code: 200,
      data: users,
    });
  } catch (error) {
    return res.status(500).json({
      application: applicationName,
      message: "Internal server error",
      code: 500,
      data: error,
    });
  }
};

const retriveUserByUuid = async (req: Request, res: Response): Promise<Response> =>
{
    const { uuid } = req.params;

    if (!uuid) {
        return res.status(400).json({
        application: applicationName,
        message: "You must provide a valid uuid",
        code: 400,
        data: [],
        });
    }
    
    try {
        const user: AdaraUser | null = await AdaraUser.findByPk(uuid);
    
        if (!user) {
        return res.status(404).json({
            application: applicationName,
            message: "User not found",
            code: 404,
            data: [],
        });
        }
    
        return res.status(200).json({
        application: applicationName,
        message: "User retrieved successfully",
        code: 200,
        data: user,
        });
    } catch (error) {
        return res.status(500).json({
        application: applicationName,
        message: "Internal server error",
        code: 500,
        data: error,
        });
    }
};

const createUser = async (req: Request, res: Response): Promise<Response> =>
{
    const { firstName, lastName, secondLastName, email, username, password } = req.body;

    if (!firstName || !lastName || !secondLastName || !email || !username || !password) {
        return res.status(400).json({
        application: applicationName,
        message: "You must provide a valid data, all fields are required",
        code: 400,
        data: [],
        });
    }
    
    try {
        const user: AdaraUser = await AdaraUser.create({
            firstName,
            lastName,
            secondLastName,
            email,
            username,
            password: await hashPassword(password)
        });
    
        return res.status(201).json({
        application: applicationName,
        message: "User created successfully",
        code: 201,
        data: user,
        });
    } catch (error: any) {

        if (error.name === "SequelizeUniqueConstraintError") {
            return res.status(400).json({
                application: applicationName,
                message: "User email/username already exists",
                code: 400,
                data: [],
            });
        }

        return res.status(500).json({
        application: applicationName,
        message: "Internal server error",
        code: 500,
        data: error,
        });
    }
};

const updateUser = async (req: Request, res: Response): Promise<Response> =>
{
    const { uuid } = req.params;
    const { firstName, lastName, secondLastName, email, username, password } = req.body;

    if (!uuid) {
        return res.status(400).json({
        application: applicationName,
        message: "You must provide a valid uuid",
        code: 400,
        data: [],
        });
    }

    if (!firstName || !lastName || !secondLastName || !email || !username || !password) {
        return res.status(400).json({
        application: applicationName,
        message: "You must provide a valid data, all fields are required",
        code: 400,
        data: [],
        });
    }
    
    try 
    {
        const user: AdaraUser | null = await AdaraUser.findByPk(uuid);
    
        if (!user) {
        return res.status(404).json({
            application: applicationName,
            message: "User not found",
            code: 404,
            data: [],
        });
        }

        user.firstName = firstName;
        user.lastName = lastName;
        user.secondLastName = secondLastName;
        user.email = email;
        user.username = username;
        user.password = await hashPassword(password);
        await user.save();
    
        return res.status(200).json({
        application: applicationName,
        message: "User updated successfully",
        code: 200,
        data: user,
        });
    } catch (error) {
        return res.status(500).json({
        application: applicationName,
        message: "Internal server error",
        code: 500,
        data: error,
        });
    }
}

const draftUser = async (req: Request, res: Response): Promise<Response> =>
{
    const { uuid } = req.params;

    if (!uuid) {
        return res.status(400).json({
        application: applicationName,
        message: "You must provide a valid uuid",
        code: 400,
        data: [],
        });
    }
    
    try {
        const user: AdaraUser | null = await AdaraUser.findByPk(uuid);
    
        if (!user) {
        return res.status(404).json({
            application: applicationName,
            message: "User not found",
            code: 404,
            data: [],
        });
        }

        user.active = !user.active;
        await user.save();
    
        return res.status(200).json({
        application: applicationName,
        message: "User toggle drafted successfully",
        code: 200,
        data: user,
        });
    } catch (error) {
        return res.status(500).json({
        application: applicationName,
        message: "Internal server error",
        code: 500,
        data: error,
        });
    }
}

export { 
    retriveUsers,
    retriveUserByUuid,
    createUser,
    updateUser,
    draftUser,
 };
