import { Router } from "express";
import userRouter from "./User.router";
import appointmentsRouter from "./Appointments.router";

const router: Router = Router();

router.use("/users", userRouter);
router.use("/appointments", appointmentsRouter);

export default router;
