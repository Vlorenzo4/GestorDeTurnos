import { ScheduleAppDTO } from "../DTO/Appointmets.DTO";
import { Status } from "../interfaces/Appointmets.interface";
import { getUserByIdService } from "./User.service";
import { Appointment } from "../entities/Appointmet.entity";
import { AppointmentModel } from "../repositories/Appointmet.repository";
import { User } from "../entities/User.entity";

export const getAppointmenService = async () => {
  const appointmetsFound = await AppointmentModel.find();
  if (appointmetsFound.length === 0)
    throw new Error(" no hay citas disponibles");
  return appointmetsFound;
};

export const getAppointmentByIdService = async (
  id: number
): Promise<Appointment> => {
  const appFound: Appointment | null = await AppointmentModel.findOne({
    where: {
      id: id,
    },
  });
  if (!appFound) throw new Error(`La cita con id ${id} no fue encontrada`);
  return appFound;
};

export const registerAppointmentService = async (
  app: ScheduleAppDTO
): Promise<Appointment> => {
  AppointmentModel.validateAllowAppointment(app.date, app.time);
  await AppointmentModel.validateExistApp(app.userId, app.date, app.time);
  const userFound: User = await getUserByIdService(app.userId);

  const newAppointment: Appointment = await AppointmentModel.create({
    date: new Date(app.date),
    time: app.time,
    user: userFound,
  });

  return await AppointmentModel.save(newAppointment);
};

export const cancelAppointmentService = async (
  id: number
): Promise<Appointment> => {
  const appFound: Appointment = await getAppointmentByIdService(id);
  appFound.status = Status.cancelled;

  return await AppointmentModel.save(appFound);
};
