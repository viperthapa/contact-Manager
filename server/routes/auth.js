import express from "express";
import * as users from "../controllers/auth";
const router = express.Router();

router.post("/register", users.register);
router.get("/user", users.all);
router.post("/login", users.login);
router.post("/refreshtoken", users.refreshToken);

export default router;
