import { Router } from "express";
import * as dummyDataController from "./dummy.controller";

const router = Router();

router.get("/", dummyDataController.getData);

export default router;
