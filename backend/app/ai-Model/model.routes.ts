import { Router } from "express";
import * as modelController from "./model.controller";

const router = Router();

router.post("/predict", modelController.verifyUrl);

export default router;
