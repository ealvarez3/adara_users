import express, { Router } from "express";
// Controllers
import { 
    retriveUsers,
    retriveUserByUuid,
    createUser,
    updateUser,
    draftUser,
} from "../controllers/user.controller";


const router: Router = express.Router();

router.get("/retrieve", retriveUsers);

router.get("/retrieve/:uuid", retriveUserByUuid);

router.post("/create", createUser);

router.put("/update/:uuid", updateUser);

router.patch("/draft/:uuid", draftUser);


export {
    router as userRouter
};