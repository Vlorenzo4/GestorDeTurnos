import { AppDataSource } from "../config/data-source";
import { Appointment } from "../entities/Appointmet.entity";
import { Status } from "../interfaces/Appointmets.interface";

export const AppointmentModel = AppDataSource.getRepository(Appointment).extend(
  {
    validateAllowAppointment: function (date: Date, time: string): void {
      const [hours, minutes] = time.split(":").map(Number);

      const appointmentDate = new Date(date);
      appointmentDate.setHours(hours, minutes, 0);

      const appointmentDateArg = new Date(
        appointmentDate.getTime() - 3 * 60 * 60 * 1000
      );

      const nowArg = new Date(new Date().getTime() - 3 * 60 * 60 * 1000);

      const dayOfWeek = appointmentDateArg.getUTCDay();

      if (appointmentDateArg < nowArg)
        throw new Error("No se pueden agendar citas para fechas pasadas");

      if (dayOfWeek === 0 || dayOfWeek === 6)
        throw new Error("No es posible agendar citas los fines de semana");

      if (hours < 8 || hours > 17)
        throw new Error(
          "Solo se pueden agendar citas entre las 8 am y las 6 pm"
        );
    },

    validateExistApp: async function (
      userId: number,
      date: Date,
      time: string
    ): Promise<void> {
      const appFound = await this.findOne({
        where: {
          user: {
            id: userId,
          },
          date: new Date(date),
          time: time,
          status: Status.active,
        },
      });
      if (appFound)
        throw Error(
          `La cita para el usuario con id ${userId}, fecha ${date} y hora ${time} ya existe`
        );
    },
  }
);
