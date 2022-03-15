import express from "express";
import authRoutes from "./auth";
import contactRoutes from "./contact";

const router = express.Router();

/**
 * API Routes.
 * @function
 * @param {*}  req
 */
router.use(authRoutes);
router.use(contactRoutes);

export default router;
