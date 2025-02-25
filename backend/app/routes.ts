import express from "express";
import userRoutes from "./user/user.route";
import modelRoutes from "./ai-model/model.routes";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/models", modelRoutes);

export default router;
