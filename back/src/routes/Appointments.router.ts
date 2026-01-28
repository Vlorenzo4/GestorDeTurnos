import { Router, Request, Response } from "express";
import {
  cancelAppointmentsController,
  getAppointmentsByIdController,
  getAppointmentsController,
  scheduleAppointmentsController,
} from "../controllers/Appointments.controller";
import { ScheduleAppDTO } from "../DTO/Appointmets.DTO";

const appointmentsRouter: Router = Router();

appointmentsRouter.get("/", (req: Request, res: Response) =>
  getAppointmentsController(req, res)
);

appointmentsRouter.get("/:id", (req: Request<{ id: string }>, res: Response) =>
  getAppointmentsByIdController(req, res)
);

appointmentsRouter.post(
  "/schedule",
  (req: Request<unknown, unknown, ScheduleAppDTO>, res: Response) =>
    scheduleAppointmentsController(req, res)
);

appointmentsRouter.put(
  "/cancel/:id",
  (req: Request<{ id: string }>, res: Response) =>
    cancelAppointmentsController(req, res)
);

export default appointmentsRouter;
