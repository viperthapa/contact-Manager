import { Router } from "express";
import * as contactsController from "../controllers/contact.controller";
import auth from "../middleware/user";

const router = Router();

/**
 * GET /api/contacts
 */
router.get("/contacts", auth, contactsController.all);
/**
 * GET /api/contacts/:id
 */
router.get("/contacts/:id", auth, contactsController.show);

/**
 * POST /api/contacts
 */
router.post("/contacts", auth, contactsController.create);

/**
 * PUT /api/contacts/:id
 */
router.put("/contacts/:id", auth, contactsController.update);

/**
 * DELETE /api/contacts/:id
 */
router.delete("/contacts/:id", auth, contactsController.remove);

export default router;
