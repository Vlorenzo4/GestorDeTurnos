import { Request, Response } from "express";
import { ScheduleAppDTO } from "../DTO/Appointmets.DTO";
import {
  cancelAppointmentService,
  getAppointmenService,
  getAppointmentByIdService,
  registerAppointmentService,
} from "../services/Appointmets.service";

export const getAppointmentsController = async (
  req: Request,
  res: Response
) => {
  try {
    res.status(200).json({
      data: await getAppointmenService(),
      msg: "Obetener el listado de todos los turnos de todos los usuarios",
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const getAppointmentsByIdController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    res.status(200).json({
      data: await getAppointmentByIdService(+req.params.id),
      msg: " Obtener el detalle de un turno especifico",
    });
  } catch (error) {
    res.status(404).json({
      msg:
        error instanceof Error
          ? error.message
          : "ocurrio un error al obtener el usuario",
    });
  }
};

export const scheduleAppointmentsController = async (
  req: Request<unknown, unknown, ScheduleAppDTO>,
  res: Response
) => {
  try {
    res.status(201).json({
      data: await registerAppointmentService(req.body),
      msg: " Agendar un nuevo turno",
    });
  } catch (error) {
    res.status(400).json({
      msg: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};

export const cancelAppointmentsController = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    res.status(200).json({
      data: await cancelAppointmentService(+req.params.id),
      msg: " Cambiar el status de un turno a cancelled",
    });
  } catch (error) {
    res.status(404).json({
      msg: error instanceof Error ? error.message : "Error desconocido",
    });
  }
};
