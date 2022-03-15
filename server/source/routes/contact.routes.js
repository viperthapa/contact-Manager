import express from "express";
import * as contactsController from "../controllers/contact.controller";
import auth from "../middleware/user";
const router = express.Router();

router.get("/contacts", auth, contactsController.all);
router.get("/contacts/:id", auth, contactsController.show);
router.post("/contacts", auth, contactsController.create);
router.put("/contacts/:id", auth, contactsController.update);
router.delete("/contacts/:id", auth, contactsController.remove);

export default router;
