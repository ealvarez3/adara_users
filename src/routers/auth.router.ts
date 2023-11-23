import express, { Router } from "express";
import { 
    loginUser 
} from "../controllers/auth.controller";

const router: Router = express.Router();

router.post("/login", loginUser);

export {
    router as authRouter
}