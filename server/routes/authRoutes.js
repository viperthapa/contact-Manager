import { Router } from "express";
import * as users from "../controllers/auth.controller";

const router = Router();
/**
 * POST /api/register
 */
router.post("/register", users.register);

/**
 * GET /api/user
 */
router.get("/user", users.all);

/**
 * POST /api/login
 */
router.post("/login", users.login);

/**
 * POST /api/refreshtoken
 */
router.post("/refreshtoken", users.refreshToken);

export default router;
