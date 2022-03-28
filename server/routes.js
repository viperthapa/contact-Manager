import { Router } from "express";
import authRoutes from "./routes/authRoutes";
import contactRoutes from "./routes/contactRoutes";

const router = Router();

router.use(authRoutes);
router.use(contactRoutes);

export default router;
