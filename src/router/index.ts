import express from "express";

import { loginValidation, registerValidation } from "@/utils/validations";
import userController from "@/controllers/user.controller";
import { checkAuth } from "@/utils/checkAuth";

const router = express.Router();

router.post("/auth/registration", registerValidation, userController.registration);
router.post("/auth/login", loginValidation, userController.login);
router.get("/auth/logout", userController.logout);
router.get("/auth/me", checkAuth, userController.me);
// router.get("/activate/:link", userController.activate);
router.get("/auth/refresh", userController.refresh);

// router.get("/users", checkAuth, userController.getAll);

export default router;
