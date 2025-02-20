import express from "express";
import userRoutes from "./user/user.route";
import dummyDataRoutes from "./json-data/dummy.route";

// routes
const router = express.Router();

router.use("/users", userRoutes);
router.use("/getData", dummyDataRoutes);

export default router;
