import express from "express";
import authRoutes from "./auth.routes";
import contactRoutes from "./contact.routes";

const router = express.Router();

/**
 * API Routes.
 * @function
 * @param {*}  req
 */
router.use(authRoutes);
router.use(contactRoutes);

export default router;
